import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { In, Repository } from 'typeorm';
import { Falta } from 'src/falta/entities/falta.entity';
import { Licencia } from 'src/licencia/entities/licencia.entity';
import { FaltaService } from 'src/falta/falta.service';
import { LicenciaService } from 'src/licencia/licencia.service';
import { HorarioLaboralService } from 'src/horario_laboral/horario_laboral.service';

@Injectable()
export class AsistenciaService {
  
  constructor(@InjectRepository(Asistencia) private readonly asistenciaRepository: Repository<Asistencia>,
              private readonly faltaService : FaltaService,
              private readonly licenciaService : LicenciaService,
              private readonly horarioLaboralService: HorarioLaboralService
              ) {}
  
  
  async asistenciasByMes():Promise<{ mes: number; total: number }[]>{
    // devuelve las asistencias totales por mes desde enero hasta diciembre del año actual
    const year = new Date().getFullYear();
    const results = await this.asistenciaRepository
      .createQueryBuilder('asistencia')
      .select('MONTH(asistencia.fecha) as mes')
      .addSelect('COUNT(asistencia.id) as total')
      .where('YEAR(asistencia.fecha) = :year', { year })
      .groupBy('MONTH(asistencia.fecha)')
      .getRawMany();

    return results.map((result) => ({
      mes: result.mes,
      total: parseInt(result.total, 10), // Asegúrate de convertir el total a número
    }));
  }

  async getAsisteciasMenosRetrasosByMes(): Promise<any> {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1; // Sumamos 1 porque los meses en JavaScript van de 0 a 11

    const result = await this.asistenciaRepository
      .createQueryBuilder('asistencia')
      .select([
        'CONCAT(docentes.nombres," ", docentes.apellidos) AS nombreCompleto',
        'SUM(CASE WHEN CAST(asistencia.tiempo_retraso AS SIGNED) > 0 THEN 1 ELSE 0 END) as asistenciasConRetraso',
        'SUM(CASE WHEN CAST(asistencia.tiempo_retraso AS SIGNED) = 0 THEN 1 ELSE 0 END) as asistenciasSinRetraso',
      ])
      .innerJoin('asistencia.horarioLaboral', 'horariolaboral')
      .innerJoin('horariolaboral.docente', 'docentes')
      .where('MONTH(asistencia.fecha) = :mes', { mes: mesActual })
      .groupBy('nombreCompleto')
      .orderBy('asistenciasSinRetraso', 'DESC') // Ordenar por el menor tiempo total de retraso primero
      .getRawOne();

    return result || [];
  }

  async distribucionGeneral(): Promise<any>{
    const asistencia = await this.asistenciasByMes();
    const falta = await this.faltaService.faltasByMes();
    const licencia = await this.licenciaService.licenciaByMes();
    //quiero  la suma de asistencia + falta + licencia  y sacar su porcentaje
    const totalAsistencia = asistencia.reduce((total, a) => total + a.total, 0);

    const totalFalta = falta.reduce((total, a) => total + a.total, 0);
    const totalLicencia = licencia.reduce((total, a) => total + a.total, 0);
    const total =  totalFalta + totalLicencia + totalAsistencia;
    const porcentajeAsistencia = (totalAsistencia * 100) / total;
    const porcentajeFalta = (totalFalta * 100) / total;
    const porcentajeLicencia = (totalLicencia * 100) / total;
    return {
      porcentajeAsistencia: porcentajeAsistencia,
      porcentajeFalta: porcentajeFalta,
      porcentajeLicencia: porcentajeLicencia,
    }
  }

  async getAsistenciasComparativaByMes(): Promise<any> {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1; // Sumamos 1 porque los meses en JavaScript van de 0 a 11

    const results = await this.asistenciaRepository
      .createQueryBuilder('asistencia')
      .select([
        'MONTH(asistencia.fecha) as mes',
        'SUM(CASE WHEN CAST(asistencia.tiempo_retraso AS SIGNED) > 0 THEN 1 ELSE 0 END) as asistenciasConRetraso',
        'SUM(CASE WHEN CAST(asistencia.tiempo_retraso AS SIGNED) = 0 THEN 1 ELSE 0 END) as asistenciasSinRetraso',
      ])
      .innerJoin('asistencia.horarioLaboral', 'horariolaboral')
      .innerJoin('horariolaboral.docente', 'docentes')
      .where('MONTH(asistencia.fecha) <= :mes', { mes: mesActual })
      .groupBy('mes')
      .orderBy('mes', 'ASC') // Ordenar por mes de forma ascendente
      .getRawMany();

    return results || [];
  }

  async create(createAsistenciaDto: CreateAsistenciaDto) {
    //guardar 
    const {fecha, docente_id, hora_entrada } = createAsistenciaDto;
    //convertir el string fecha a dia de la semana
    const fechaDate = new Date(fecha);
    // obtener el dia de la semana si es lunes o martes, etc
    const diaSemana = fechaDate.getDay();
    const hora_fija = '07:30:00';
    const horaEntrada = new Date(`1970-01-01T${hora_entrada}`).getMinutes();
    const horaMeta = new Date(`1970-01-01T${hora_fija}`).getMinutes();
    const minutosEntrada = this.convertirASoloMinutos(hora_entrada);
    const minutosMeta = this.convertirASoloMinutos(hora_fija); 
    const tiempoRetraso = minutosEntrada - minutosMeta; 
    let tiempo = '';
    if(tiempoRetraso < 0){
      tiempo = '0';
    }else{
      tiempo = tiempoRetraso.toString();
    }
    //obtener el id del horario laboral
    const horarioLaboral = await this.horarioLaboralService.getHorarioLaboralByDia(diaSemana, +docente_id);
    if(!horarioLaboral){
      throw new BadRequestException('No existe un horario laboral para el dia seleccionado');
    }
    const asistencia = this.asistenciaRepository.create({...createAsistenciaDto, horarioLaboral: horarioLaboral});
    return this.asistenciaRepository.save(asistencia);
    //return asistencia;
  }

  findAll() {
    return 'This action returns all asistencia';
  }

  findOne(id: number) {
    return `This action returns a #${id} asistencia`;
  }

  update(id: number, updateAsistenciaDto: UpdateAsistenciaDto) {
    return `This action updates a #${id} asistencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} asistencia`;
  }

  convertirASoloMinutos(horaString) {
    const [horas, minutos] = horaString.split(':').map(Number);
    return horas * 60 + minutos;
  }

}
