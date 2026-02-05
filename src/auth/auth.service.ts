import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { comparePasswords } from 'src/utils/shared/generate.hashing';
import { User } from '../prisma/generated/prisma/client';
import { RecoveredDto } from './dto/recovered.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}
  async signIn(
    email: User['email'],
    pass: User['password'],
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const isMatch = await comparePasswords(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const payload = { sub: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async recoverdEmail(recoveredDto: RecoveredDto): Promise<void> {
    return await this.emailService.sendResetPasswordEmail(recoveredDto.email);
  }
}
