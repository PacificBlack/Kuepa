import { Salas } from '../salas.entity';
import { Mensajes } from '../../../../mensajes/entities/mensajes/mensajes.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'salas_and_mensajes' })
export class SalasAndMensajes {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne((type) => Salas, (salas) => salas.id)
  @JoinColumn({ name: 'salas_id' })
  salas: Salas;

  @ManyToOne((type) => Mensajes, (mensajes) => mensajes.id)
  @JoinColumn({ name: 'mensajes_id' })
  mensajes: Mensajes;

  @CreateDateColumn({ name: 'creado' })
  creado: Date;

  @UpdateDateColumn({ name: 'actualizado' })
  actualizado: Date;
}
