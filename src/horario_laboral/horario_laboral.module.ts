import { Module } from '@nestjs/common';
import { HorarioLaboralService } from './horario_laboral.service';
import { HorarioLaboralController } from './horario_laboral.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorarioLaboral } from './entities/horario_laboral.entity';
import { HorarioDiasModule } from 'src/horario_dias/horario_dias.module';
import { DocenteModule } from 'src/docente/docente.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ 
      HorarioLaboral
     ]),
     
    HorarioDiasModule,
    DocenteModule
  ],
  controllers: [HorarioLaboralController],
  providers: [HorarioLaboralService],
  exports: [TypeOrmModule, HorarioLaboralService]
})
export class HorarioLaboralModule {}
