import { Module } from '@nestjs/common';
import { HorarioDiasService } from './horario_dias.service';
import { HorarioDiasController } from './horario_dias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorarioDia } from './entities/horario_dia.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HorarioDia
    ]),
  ],
  controllers: [HorarioDiasController],
  providers: [HorarioDiasService],
  exports: [TypeOrmModule, HorarioDiasService]
})
export class HorarioDiasModule {}
