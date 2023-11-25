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
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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
