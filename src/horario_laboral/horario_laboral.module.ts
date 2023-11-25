import { Module } from '@nestjs/common';
import { HorarioLaboralService } from './horario_laboral.service';
import { HorarioLaboralController } from './horario_laboral.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorarioLaboral } from './entities/horario_laboral.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ 
      HorarioLaboral
     ]),
  ],
  controllers: [HorarioLaboralController],
  providers: [HorarioLaboralService],
  exports: [TypeOrmModule]
})
export class HorarioLaboralModule {}
