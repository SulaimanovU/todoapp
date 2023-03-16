import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../utils/dto/login.dto';
import { RegisterDto } from '../utils/dto/register.dto';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async register(regData: RegisterDto) {
    const hash = bcrypt.hashSync(regData.password, 8);
    regData.password = hash;

    return await this.userRepository.createUser(regData);
  }

  async login(loginData: LoginDto) {
    const user = await this.userRepository.findUserByUsername(loginData.username);
    const isUserExist: boolean = await bcrypt.compare(loginData.password, user.password);

    if(!isUserExist) {
      throw new NotFoundException('Not correct password');
    }
    
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}