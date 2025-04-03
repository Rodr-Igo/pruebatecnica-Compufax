import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('clientes')
export class ClientEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    nombre:string;
    @Column()
    apellido:string;
    @Column()
    edad:string;
    @Column()
    email:string;
    @Column()
    fecha_registro:string;
}
