import { Docente } from 'src/docente/entities/docente.entity';
import { HorarioLaboral } from 'src/horario_laboral/entities/horario_laboral.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('asistencias')
export class Asistencia {
    @PrimaryColumn()
    id: number;

    @Column({type:'varchar' ,nullable: false })
    tiempo_retraso: string;

    @Column({type: 'time',nullable: false })
    hora_entrada: string;

    @Column({type: 'time', nullable: false })
    hora_salida: string;

    @Column({type: 'date', nullable: false })
    fecha: string;

    @ManyToOne(() => HorarioLaboral, (horarioLaboral) => horarioLaboral.asistencia)
    horarioLaboral: HorarioLaboral;

    

}
