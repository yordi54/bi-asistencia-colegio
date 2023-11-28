import { Module } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { DocenteController } from './docente.controller';
import { Docente } from './entities/docente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorarioLaboralModule } from 'src/horario_laboral/horario_laboral.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Docente])
    
  ],
  controllers: [DocenteController],
  providers: [DocenteService],
  exports: [TypeOrmModule, DocenteService]
})
export class DocenteModule {}
