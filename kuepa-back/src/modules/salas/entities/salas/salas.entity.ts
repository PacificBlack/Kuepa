import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'salas' })
export class Salas {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'nombre',
    length: 50,
    nullable: false,
    type: 'varchar',
    unique: true,
  })
  nombre: string;

  @CreateDateColumn({ name: 'creado' })
  creado: Date;

  @UpdateDateColumn({ name: 'actualizado' })
  actualizado: Date;
}
