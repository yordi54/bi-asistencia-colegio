import { Module } from '@nestjs/common';
import { LicenciaService } from './licencia.service';
import { LicenciaController } from './licencia.controller';
import { Licencia } from './entities/licencia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Licencia
    ]),
  ],
  controllers: [LicenciaController],
  providers: [LicenciaService], 
  exports: [TypeOrmModule, LicenciaService]
})
export class LicenciaModule {}
