import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;
}
