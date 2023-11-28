import { Injectable } from '@nestjs/common';
import { CreateHorarioDiaDto } from './dto/create-horario_dia.dto';
import { UpdateHorarioDiaDto } from './dto/update-horario_dia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HorarioDia } from './entities/horario_dia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HorarioDiasService {
  constructor(@InjectRepository(HorarioDia) private readonly horarioDiaRepository: Repository<HorarioDia>) {}
  create(createHorarioDiaDto: CreateHorarioDiaDto) {
    return 'This action adds a new horarioDia';
  }

  findAll() {
    return `This action returns all horarioDias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} horarioDia`;
  }

  update(id: number, updateHorarioDiaDto: UpdateHorarioDiaDto) {
    return `This action updates a #${id} horarioDia`;
  }

  remove(id: number) {
    return `This action removes a #${id} horarioDia`;
  }

  async getHorarioDia(id: number){
    return await this.horarioDiaRepository.findOne({where: {id}});
  }
}
