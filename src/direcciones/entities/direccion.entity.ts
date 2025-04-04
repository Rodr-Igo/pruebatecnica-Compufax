import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ClientEntity } from 'src/client/entities/client.entity';

@Entity('direcciones')
export class DireccionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  calle: string;

  @Column()
  ciudad: string;

  @Column()
  codigo_postal: string;

  @OneToOne(() => ClientEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cliente_id' }) // clave foránea en esta tabla
  cliente: ClientEntity;
}