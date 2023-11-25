import { Injectable } from '@nestjs/common';
import { CreateLicenciaDto } from './dto/create-licencia.dto';
import { UpdateLicenciaDto } from './dto/update-licencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Licencia } from './entities/licencia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LicenciaService {
  constructor(@InjectRepository(Licencia) private readonly licenciaRepository: Repository<Licencia>){}

  async licenciaByMes():Promise<{ mes: number; total: number }[]>{
    // devuelve las asistencias totales por mes desde enero hasta diciembre del año actual
    const year = new Date().getFullYear();
    const results = await this.licenciaRepository
      .createQueryBuilder('licencias')
      .select('MONTH(licencias.fecha) as mes')
      .addSelect('COUNT(licencias.id) as total')
      .where('YEAR(licencias.fecha) = :year', { year })
      .groupBy('MONTH(licencias.fecha)')
      .getRawMany();

    return results.map((result) => ({
      mes: result.mes,
      total: parseInt(result.total, 10), // Asegúrate de convertir el total a número
    }));
  }

  async getDocenteMasLicenciasByMes(): Promise<any> {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1; // Sumamos 1 porque los meses en JavaScript van de 0 a 11

    const result = await this.licenciaRepository
      .createQueryBuilder('licencias')
      .select(['CONCAT(docentes.nombres," ", docentes.apellidos) AS nombreCompleto', 'COUNT(licencias.id) as totalLicencias'])
      .innerJoin('licencias.horarioLaboral', 'horariolaboral')
      .innerJoin('horariolaboral.docente', 'docentes')
      .where('MONTH(licencias.fecha) = :mes', { mes: mesActual })
      .groupBy('nombreCompleto')
      .orderBy('totalLicencias', 'DESC')
      .limit(1)
      .getRawOne();

    return result || [];
  }


  create(createLicenciaDto: CreateLicenciaDto) {
    return 'This action adds a new licencia';
  }

  findAll() {
    return `This action returns all licencia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} licencia`;
  }

  update(id: number, updateLicenciaDto: UpdateLicenciaDto) {
    return `This action updates a #${id} licencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} licencia`;
  }
}
