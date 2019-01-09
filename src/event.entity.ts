import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'Event' })
export class Event {
  @PrimaryGeneratedColumn('uuid') id: number;
  @Column() type: string;
  @Column('json') payload: JSON;
  @Column() aggregatedId: string;
  @CreateDateColumn() createdAt: string;
}
