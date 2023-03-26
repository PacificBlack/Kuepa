import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'tipo_usuario' })
export class TipoUsuario {
  @PrimaryColumn({ name: 'id', type: 'integer' })
  id: number;

  @Column({
    name: 'tipo',
    length: 50,
    nullable: false,
    type: 'varchar',
  })
  tipo: string;

  @CreateDateColumn({ name: 'creado' })
  creado: Date;

  @UpdateDateColumn({ name: 'actualizado' })
  actualizado: Date;
}
