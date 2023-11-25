import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FaltaService } from './falta.service';
import { CreateFaltaDto } from './dto/create-falta.dto';
import { UpdateFaltaDto } from './dto/update-falta.dto';

@Controller('falta')
export class FaltaController {
  constructor(private readonly faltaService: FaltaService) {}

  @Post()
  create(@Body() createFaltaDto: CreateFaltaDto) {
    return this.faltaService.create(createFaltaDto);
  }

  @Get('/by-mes')
  asistenciasByMes() : Promise<{ mes: number; total: number }[]> {
    return this.faltaService.faltasByMes();
  }
  @Get('/docente-mas-faltas')
  getDocenteMasFaltasByMes(): Promise<any> {
    return this.faltaService.getDocenteMasFaltasByMes();
  }

  @Get()
  findAll() {
    return this.faltaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faltaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFaltaDto: UpdateFaltaDto) {
    return this.faltaService.update(+id, updateFaltaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faltaService.remove(+id);
  }
}
