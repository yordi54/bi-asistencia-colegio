import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HorarioLaboralService } from './horario_laboral.service';
import { CreateHorarioLaboralDto } from './dto/create-horario_laboral.dto';
import { UpdateHorarioLaboralDto } from './dto/update-horario_laboral.dto';

@Controller('horario-laboral')
export class HorarioLaboralController {
  constructor(private readonly horarioLaboralService: HorarioLaboralService) {}

  @Post()
  create(@Body() createHorarioLaboralDto: CreateHorarioLaboralDto) {
    return this.horarioLaboralService.create(createHorarioLaboralDto);
  }

  @Get()
  findAll() {
    return this.horarioLaboralService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horarioLaboralService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHorarioLaboralDto: UpdateHorarioLaboralDto) {
    return this.horarioLaboralService.update(+id, updateHorarioLaboralDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horarioLaboralService.remove(+id);
  }
}
