import { 
  Column, 
  Entity, 
  CreateDateColumn, 
  UpdateDateColumn, 
  PrimaryGeneratedColumn, 
  OneToMany 
} from 'typeorm';
import { Task } from 'src/task/entities/task.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user, { onDelete: 'SET NULL' })
  tasks: Task[]

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date

  @Column({ default: false, type: 'boolean', name: 'is_deleted' })
  isDeleted: boolean;
}