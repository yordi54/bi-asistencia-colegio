import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HorarioDiasService } from './horario_dias.service';
import { CreateHorarioDiaDto } from './dto/create-horario_dia.dto';
import { UpdateHorarioDiaDto } from './dto/update-horario_dia.dto';

@Controller('horario-dias')
export class HorarioDiasController {
  constructor(private readonly horarioDiasService: HorarioDiasService) {}

  @Post()
  create(@Body() createHorarioDiaDto: CreateHorarioDiaDto) {
    return this.horarioDiasService.create(createHorarioDiaDto);
  }

  @Get()
  findAll() {
    return this.horarioDiasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horarioDiasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHorarioDiaDto: UpdateHorarioDiaDto) {
    return this.horarioDiasService.update(+id, updateHorarioDiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horarioDiasService.remove(+id);
  }
}
