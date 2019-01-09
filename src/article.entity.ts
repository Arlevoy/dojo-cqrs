import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Article' })
export class Article {
  @PrimaryGeneratedColumn('uuid') id: number;
  @Column() name: string;
  @Column() content: string;
}
