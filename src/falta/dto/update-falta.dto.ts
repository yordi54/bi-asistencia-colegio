import { PartialType } from '@nestjs/mapped-types';
import { CreateFaltaDto } from './create-falta.dto';

export class UpdateFaltaDto extends PartialType(CreateFaltaDto) {}
