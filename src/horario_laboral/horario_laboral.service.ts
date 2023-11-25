import { Injectable } from '@nestjs/common';
import { CreateHorarioLaboralDto } from './dto/create-horario_laboral.dto';
import { UpdateHorarioLaboralDto } from './dto/update-horario_laboral.dto';

@Injectable()
export class HorarioLaboralService {
  create(createHorarioLaboralDto: CreateHorarioLaboralDto) {
    return 'This action adds a new horarioLaboral';
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
}
