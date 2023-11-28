import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Docente } from './entities/docente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DocenteService {
  constructor(@InjectRepository(Docente) private readonly docenteRepository: Repository<Docente>) {}
  async create(createDocenteDto: CreateDocenteDto)  {
    //crear docente
    try{
      const {ci} = createDocenteDto;
      const existDocente = await this.docenteRepository.findOne({
        where: [{ci}],
      });
      if(existDocente) throw new NotFoundException('El docente ya existe');
      const docente = await  this.docenteRepository.create(createDocenteDto);
      return this.docenteRepository.save(docente);

    }catch(error){
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.docenteRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} docente`;
  }

  update(id: number, updateDocenteDto: UpdateDocenteDto) {
    return `This action updates a #${id} docente`;
  }

  remove(id: number) {
    return `This action removes a #${id} docente`;
  }

  async getDocente(id: number){
    return await this.docenteRepository.findOne({where: {id}});
  }
}
