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
    edad?:string;
    @Column()
    email?:string;
    @Column()
    fecha_registro?:string;

    @OneToOne(() => DireccionEntity, direccion => direccion.cliente)
    direccion: DireccionEntity;
}
