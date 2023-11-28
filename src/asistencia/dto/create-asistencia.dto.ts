import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAsistenciaDto {
    
    @IsString()
    @IsNotEmpty()
    tiempo_retraso: string;
    @IsString()
    @IsNotEmpty()
    hora_entrada: string;
    @IsString()
    @IsNotEmpty()
    hora_salida: string;

    @IsString()
    @IsNotEmpty()
    fecha: string;

    @IsString()
    docente_id : string;

}
