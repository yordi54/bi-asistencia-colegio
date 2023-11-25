import { HorarioLaboral } from "src/horario_laboral/entities/horario_laboral.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity('horario_dias')
export class HorarioDia {
    @PrimaryColumn()
    id: number;

    @Column({type: 'time' ,nullable: false })
    hora_inicio: string;

    @Column({type: 'time' ,nullable: false })
    hora_fin: string;

    @Column({type: 'varchar' ,nullable: false })
    dia: string;

    @OneToMany(() => HorarioLaboral, (horarioLaboral) => horarioLaboral.docente)
    horarioLaboral: HorarioLaboral[]
}
