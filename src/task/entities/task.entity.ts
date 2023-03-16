import { 
  Column, 
  Entity, 
  CreateDateColumn, 
  UpdateDateColumn, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  JoinColumn 
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

  @Column({ default: false, type: 'boolean', name: 'is_deleted' })
  isDeleted: boolean;
}