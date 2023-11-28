import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateHorarioLaboralDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsNumber()
    @IsNotEmpty()
    docente: number;
    
    @IsNumber()
    @IsNotEmpty()
    horarioDia: number;

}
