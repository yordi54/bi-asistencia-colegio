import { HorarioLaboral } from "src/horario_laboral/entities/horario_laboral.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity('docentes')
export class Docente {
    @PrimaryColumn({type: 'int'})
    id: number;

    @Column({type:'varchar', nullable: false})
    nombres: string;

    @Column({type:'varchar', nullable: false})
    apellidos: string;

    @Column({type:'varchar', unique: true, nullable: false})
    ci: string;
    
    @OneToMany(() => HorarioLaboral, (horarioLaboral) => horarioLaboral.docente)
    horarioLaboral: HorarioLaboral[]
}
