import { Usuario } from 'src/modules/usuarios/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'mensajes' })
export class Mensajes {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'contenido',
    length: 500,
    nullable: false,
    type: 'varchar',
  })
  contenido: string;

  @ManyToOne((type) => Usuario, (usuario) => usuario.id)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @CreateDateColumn({ name: 'creado' })
  creado: Date;

  @UpdateDateColumn({ name: 'actualizado' })
  actualizado: Date;
}
