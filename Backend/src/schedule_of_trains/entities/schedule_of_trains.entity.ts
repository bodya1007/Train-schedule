import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Schedule_of_trains_entity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Number_of_train: string;
  
  @Column()
  Type_of_train : string

  @Column()
  Path_of_train: string;

  @Column()
  Arrival_time: string;

  @Column()
  Departure_time: string;
}