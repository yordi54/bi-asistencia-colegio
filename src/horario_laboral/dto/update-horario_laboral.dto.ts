import { PartialType } from '@nestjs/mapped-types';
import { CreateHorarioLaboralDto } from './create-horario_laboral.dto';

export class UpdateHorarioLaboralDto extends PartialType(CreateHorarioLaboralDto) {}
