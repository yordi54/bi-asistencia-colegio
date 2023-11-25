import { Asistencia } from "src/asistencia/entities/asistencia.entity";
import { Docente } from "src/docente/entities/docente.entity";
import { Falta } from "src/falta/entities/falta.entity";
import { HorarioDia } from "src/horario_dias/entities/horario_dia.entity";
import { Licencia } from "src/licencia/entities/licencia.entity";
import { Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity('horariolaboral')
export class HorarioLaboral {
    @PrimaryColumn()
    id: number;
    @ManyToOne(() => Docente, (docente) => docente.horarioLaboral)
    docente: Docente;

    @ManyToOne(() => HorarioDia, (horarioDia) => horarioDia.horarioLaboral)
    horarioDia: HorarioDia;

    @OneToMany(() => Falta, (falta) => falta.horarioLaboral)
    falta: Falta[]

    @OneToMany(() => Licencia, (licencia) => licencia.horarioLaboral)
    licencia: Licencia[]

    @OneToMany(() => Asistencia, (asistencia) => asistencia.horarioLaboral)
    asistencia: Asistencia[]
}
