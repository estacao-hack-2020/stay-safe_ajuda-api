import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Status } from './Status';

@Entity('reminder')
export default class Help {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  latitude: number;

  @Column({ nullable: false })
  longitude: number;

  @Column({ nullable: false })
  mensagem: string;

  @Column({ nullable: false })
  dataCriacao: Date;

  @Column({ nullable: false })
  status: Status;
  
}