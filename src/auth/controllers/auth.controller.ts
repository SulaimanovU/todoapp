import { Controller, Request, Post, Get, Body, UseGuards } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiBearerAuth
} from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../utils/dto/login.dto';
import { RegisterDto } from '../utils/dto/register.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 200, type: RegisterDto })
  @Post('register')
  async registration(@Body() regData: RegisterDto) {
    return await this.authService.register(regData);
  }

  @ApiResponse({ status: 200, type: LoginDto })
  @Post('login')
  async login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}