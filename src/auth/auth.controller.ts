import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { RecoveredDto } from './dto/recovered.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from 'src/swagger/swagger.tags';
import { SwaggerDescriptions } from 'src/swagger/descriptions';
import { ApiAuthLoginResponse } from 'src/swagger/decorators/auth.decortors';

/**
 * Todo
 * Criar endpoint para refresh token
 * Salvar cookie no cookie
 */
@ApiTags(SwaggerTags.AUTH)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation(SwaggerDescriptions.Auth.login)
  @ApiAuthLoginResponse()
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: LoginDto) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @Post('forgot-password')
  async recoverd(@Body() recoveredDto: RecoveredDto): Promise<void> {
    return await this.authService.recoverdEmail(recoveredDto);
  }
}
