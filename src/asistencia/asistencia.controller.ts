import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Post()
  create(@Body() createAsistenciaDto: CreateAsistenciaDto) {
    return this.asistenciaService.create(createAsistenciaDto);
  }

  @Get()
  findAll() {
    return this.asistenciaService.findAll();
  }

  @Get('/by-mes')
  asistenciasByMes() : Promise<{ mes: number; total: number }[]> {
    return this.asistenciaService.asistenciasByMes();
  }

  @Get('/docente-mas-asistencias')
  getAsisteciasMenosRetrasosByMes(): Promise<any> {
    return this.asistenciaService.getAsisteciasMenosRetrasosByMes();
  }

  @Get('/distribucion-general')
  distribucionGeneral(): Promise<any> {
    return this.asistenciaService.distribucionGeneral();
  }
  @Get('/comparativa-asistencias')
  getAsistenciasComparativaByMes(): Promise<any> {
    return this.asistenciaService.getAsistenciasComparativaByMes();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asistenciaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsistenciaDto: UpdateAsistenciaDto) {
    return this.asistenciaService.update(+id, updateAsistenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asistenciaService.remove(+id);
  }
}
