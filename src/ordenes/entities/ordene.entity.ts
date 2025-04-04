import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ClientEntity } from 'src/client/entities/client.entity';

@Entity('ordenes')
export class OrdenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  producto: string;

  @Column()
  cantidad: number;

  @Column({ type: 'timestamp', nullable: true })
  fecha_pedido: Date;

  @Column()
  folio: string;

  @ManyToOne(() => ClientEntity, { nullable: false })
  @JoinColumn({ name: 'cliente_id' })
  cliente: ClientEntity;
}