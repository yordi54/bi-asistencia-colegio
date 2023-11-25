import { HorarioLaboral } from "src/horario_laboral/entities/horario_laboral.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('faltas')
export class Falta {
    @PrimaryColumn()
    id: number;

    @Column({type:'varchar', nullable: false})
    motivo: string;

    @Column({type:'date', nullable: false})
    fecha: string;

    @ManyToOne(() => HorarioLaboral, (horarioLaboral) => horarioLaboral.falta)
    horarioLaboral: HorarioLaboral;
   
}
