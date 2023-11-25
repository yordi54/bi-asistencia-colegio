import { Injectable } from '@nestjs/common';
import { CreateFaltaDto } from './dto/create-falta.dto';
import { UpdateFaltaDto } from './dto/update-falta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Falta } from './entities/falta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FaltaService {

  constructor(@InjectRepository(Falta) private readonly faltaRepository: Repository<Falta>){}
  async faltasByMes():Promise<{ mes: number; total: number }[]>{
    // devuelve las asistencias totales por mes desde enero hasta diciembre del año actual
    const year = new Date().getFullYear();
    const results = await this.faltaRepository
      .createQueryBuilder('faltas')
      .select('MONTH(faltas.fecha) as mes')
      .addSelect('COUNT(faltas.id) as total')
      .where('YEAR(faltas.fecha) = :year', { year })
      .groupBy('MONTH(faltas.fecha)')
      .getRawMany();

    return results.map((result) => ({
      mes: result.mes,
      total: parseInt(result.total, 10), // Asegúrate de convertir el total a número
    }));
  }

  async getDocenteMasFaltasByMes(): Promise<any> {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1; // Sumamos 1 porque los meses en JavaScript van de 0 a 11

    const result = await this.faltaRepository
      .createQueryBuilder('faltas')
      .select(['CONCAT(docentes.nombres," ", docentes.apellidos) AS nombreCompleto', 'COUNT(faltas.id) as totalFaltas'])
      .innerJoin('faltas.horarioLaboral', 'horariolaboral')
      .innerJoin('horariolaboral.docente', 'docentes')
      .where('MONTH(faltas.fecha) = :mes', { mes: mesActual })
      .groupBy('nombreCompleto')
      .orderBy('totalFaltas', 'DESC')
      .limit(1)
      .getRawOne();

    return result || [];
  }

  create(createFaltaDto: CreateFaltaDto) {
    return 'This action adds a new falta';
  }

  findAll() {
    return `This action returns all falta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} falta`;
  }

  update(id: number, updateFaltaDto: UpdateFaltaDto) {
    return `This action updates a #${id} falta`;
  }

  remove(id: number) {
    return `This action removes a #${id} falta`;
  }
}
