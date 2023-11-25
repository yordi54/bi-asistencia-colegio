import { Module } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { FaltaModule } from 'src/falta/falta.module';
import { LicenciaModule } from 'src/licencia/licencia.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Asistencia
    ]),
    FaltaModule,
    LicenciaModule
  ],
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
  exports: [TypeOrmModule]
})
export class AsistenciaModule {}
