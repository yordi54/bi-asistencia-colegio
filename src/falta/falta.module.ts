import { Module } from '@nestjs/common';
import { FaltaService } from './falta.service';
import { FaltaController } from './falta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Falta } from './entities/falta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Falta
    ]),
  ],
  controllers: [FaltaController],
  providers: [FaltaService],
  exports: [TypeOrmModule, FaltaService]
})
export class FaltaModule {}
