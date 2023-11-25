import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LicenciaService } from './licencia.service';
import { CreateLicenciaDto } from './dto/create-licencia.dto';
import { UpdateLicenciaDto } from './dto/update-licencia.dto';

@Controller('licencia')
export class LicenciaController {
  constructor(private readonly licenciaService: LicenciaService) {}

  @Post()
  create(@Body() createLicenciaDto: CreateLicenciaDto) {
    return this.licenciaService.create(createLicenciaDto);
  }

  @Get()
  findAll() {
    return this.licenciaService.findAll();
  }

  @Get('/by-mes')
  asistenciasByMes() : Promise<{ mes: number; total: number }[]> {
    return this.licenciaService.licenciaByMes();
  }
  @Get('/docente-mas-licencias')
  getDocenteMasLicenciasByMes(): Promise<any> {
    return this.licenciaService.getDocenteMasLicenciasByMes();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.licenciaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLicenciaDto: UpdateLicenciaDto) {
    return this.licenciaService.update(+id, updateLicenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.licenciaService.remove(+id);
  }
}
