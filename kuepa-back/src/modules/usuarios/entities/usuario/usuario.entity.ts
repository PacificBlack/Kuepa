import { TipoUsuario } from '../tipo-usuario/tipo-usuario.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'usuario' })
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'nombre',
    length: 50,
    nullable: false,
    type: 'varchar',
  })
  nombre: string;

  @Column({
    name: 'apellido',
    length: 50,
    nullable: false,
    type: 'varchar',
  })
  apellido: string;

  @Column({
    name: 'username',
    length: 50,
    nullable: false,
    type: 'varchar',
    unique: true,
  })
  username: string;

  @Column({
    name: 'password',
    length: 200,
    nullable: false,
    type: 'varchar',
    unique: true,
  })
  password: string;

  @ManyToOne((type) => TipoUsuario, (tipo_usuario) => tipo_usuario.id)
  @JoinColumn({ name: 'tipo_usuario_id' })
  tipo_usuario: TipoUsuario;

  @CreateDateColumn({ name: 'creado' })
  creado: Date;

  @UpdateDateColumn({ name: 'actualizado' })
  actualizado: Date;
}
