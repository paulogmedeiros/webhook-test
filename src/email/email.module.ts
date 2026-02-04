import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 3,
    }),
  ],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
