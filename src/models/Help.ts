import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from './Status';

@Entity('ajuda')
export default class Help {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  telefone: string;

  @Column()
  email: string;

  @Column({ nullable: false })
  idade: number;

  @Column({ type: 'decimal', nullable: false})
  latitude: number;

  @Column({ type: 'decimal', nullable: false })
  longitude: number;

  @Column({ type: 'text', nullable: false })
  mensagem: string;

  @Column({ default: 'now()' })
  dataCriacao: Date;

  @Column({
    enum: ['aguardando','finalizado'],
    nullable: false
  })
  status: string;

}