import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHorarioLaboralDto } from './dto/create-horario_laboral.dto';
import { UpdateHorarioLaboralDto } from './dto/update-horario_laboral.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HorarioLaboral } from './entities/horario_laboral.entity';
import { Repository } from 'typeorm';
import { DocenteService } from 'src/docente/docente.service';
import { HorarioDiasService } from 'src/horario_dias/horario_dias.service';
@Injectable()
export class HorarioLaboralService {
  constructor(@InjectRepository(HorarioLaboral) private readonly horarioLaboralRepository: Repository<HorarioLaboral>, 
  private readonly docenteService: DocenteService,
  private readonly horarioDiaService: HorarioDiasService
  ) {}

  async create(createHorarioLaboralDto: CreateHorarioLaboralDto) {
    const { docente, horarioDia, id } = createHorarioLaboralDto;

    const docente_data = await this.docenteService.getDocente(docente);
    console.log(docente_data);
    const horario = await this.horarioDiaService.getHorarioDia(horarioDia);
    console.log(horario);
    // Crea una nueva instancia de HorarioLaboral con los datos proporcionados
    const nuevoHorarioLaboral = this.horarioLaboralRepository.create([{
      id,
      docente:  docente_data,
      horarioDia: horario
    }]);  
    return await this.horarioLaboralRepository.save(nuevoHorarioLaboral);
  }

  findAll() {
    return `This action returns all horarioLaboral`;
  }

  findOne(id: number) {
    return `This action returns a #${id} horarioLaboral`;
  }

  update(id: number, updateHorarioLaboralDto: UpdateHorarioLaboralDto) {
    return `This action updates a #${id} horarioLaboral`;
  }

  remove(id: number) {
    return `This action removes a #${id} horarioLaboral`;
  }

  async ultimoId() {
    const ultimo = await this.horarioLaboralRepository
      .createQueryBuilder('horario_laboral')
      .select('MAX(horario_laboral.id)', 'max')
      .getRawOne();
    return ultimo;
  }

  async getHorarioLaboralByDia(id: number, docenteId : number) {
    const docente_id = 5;
    const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'sabado'];
    if(id < 1 || id > 6){
      throw new BadRequestException('El dia no es valido');
    }else{
      const dia = dias[id-1];
      console.log(dia);
      return  await this.horarioLaboralRepository
      .createQueryBuilder('horario_laboral')
      .select(['horario_laboral.id'])
      .innerJoin('horario_laboral.horarioDia', 'horario_dia')
      .innerJoin('horario_laboral.docente', 'docente')
      .where('horario_dia.dia = :dia', {  dia })
      .andWhere('docente.id = :docente_id', { docente_id })
      .getOne();
    }
   
  }

}
