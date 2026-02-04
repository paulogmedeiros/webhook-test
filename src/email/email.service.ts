import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { RESET_PASSWORD_TEMPLATE } from './templates/reset-password.template';

@Injectable()
export class EmailService {
  constructor(private readonly httpService: HttpService) {}

  async sendResetPasswordEmail(toEmail: string) {
    const resetUrl = 'dawd';
    const html = RESET_PASSWORD_TEMPLATE.replace(
      '{{RESET_PASSWORD_URL}}',
      resetUrl,
    );

    await this.sendEmail(toEmail, 'Recuperação de senha', html);
  }

  async sendEmail(
    toEmail: string,
    subject: string,
    text: string,
  ): Promise<void> {
    const API_URL = 'https://mail.codigocapixaba.com.br/send-email';
    const API_KEY = process.env.EMAIL_API_KEY;

    const body = {
      toEmail,
      subject,
      text,
    };

    const { data } = await firstValueFrom(
      this.httpService.post(API_URL, body, {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
      }),
    );

    console.log('Email API response:', data);
  }
}
