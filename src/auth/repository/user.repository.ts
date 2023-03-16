import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterDto } from '../utils/dto/register.dto';


@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createUser(regData: RegisterDto): Promise<User> {
    const user = this.userRepository.create(regData)
    return await this.userRepository.save(user);
  }

  public async findUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ 
      username: username, 
    });
  }

  public async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }
}
