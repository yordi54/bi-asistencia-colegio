import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DocenteModule } from './docente/docente.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { HorarioDiasModule } from './horario_dias/horario_dias.module';
import { HorarioLaboralModule } from './horario_laboral/horario_laboral.module';
import { FaltaModule } from './falta/falta.module';
import { LicenciaModule } from './licencia/licencia.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'colegio-yordice75.mysql.database.azure.com',
    port: 3306,
    username: 'yordice75',
    password: 'Sincontra1234',
    database: 'bi_microservicio',
    autoLoadEntities: true,
    synchronize: true,
    ssl: {
      rejectUnauthorized: true,
    },
  }),
    DocenteModule,
    AsistenciaModule,
    HorarioDiasModule,
    HorarioLaboralModule,
    FaltaModule,
    LicenciaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
