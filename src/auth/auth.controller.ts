import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
import { RecoveredDto } from './dto/recovered.dto';

/**
 * Todo
 * Criar endpoint para refresh token
 * Salvar cookie no cookie
 */

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: LoginDto) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @Post()
  async recoverd(@Body() recoveredDto: RecoveredDto): Promise<void> {
    return await this.authService.recoverdEmail(recoveredDto);
  }
}
