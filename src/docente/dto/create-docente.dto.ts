import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateDocenteDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
    @IsString()
    @IsNotEmpty()
    nombres: string;
    @IsString()
    @IsNotEmpty()
    apellidos: string;
    @IsString()
    @IsNotEmpty()
    ci: string;
}
