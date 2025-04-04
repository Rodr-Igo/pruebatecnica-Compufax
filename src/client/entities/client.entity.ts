import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { DireccionEntity } from 'src/direcciones/entities/direccion.entity';

@Entity('clientes')
export class ClientEntity {
    @PrimaryGeneratedColumn()
    id?:number;
    @Column()
    nombre?:string;
    @Column()
    apellido?:string;
    @Column()
    edad?:number;
    @Column()
    email?:string;
    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    fecha_registro: Date;

    @OneToOne(() => DireccionEntity, direccion => direccion.cliente)
    direccion: DireccionEntity;
}
