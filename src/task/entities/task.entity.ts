import { 
  Column, 
  Entity, 
  CreateDateColumn, 
  UpdateDateColumn, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  JoinColumn,
  DeleteDateColumn
} from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Entity({ name: 'task' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date
}