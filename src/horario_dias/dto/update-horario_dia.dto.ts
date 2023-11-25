import { PartialType } from '@nestjs/mapped-types';
import { CreateHorarioDiaDto } from './create-horario_dia.dto';

export class UpdateHorarioDiaDto extends PartialType(CreateHorarioDiaDto) {}
