import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from 'src/swagger/swagger.tags';
import { ApiAppHealthResponse } from 'src/swagger/decorators/app.decorators';

@ApiTags(SwaggerTags.APP)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiAppHealthResponse()
  @Public()
  @Get('health')
  getHello(): { message: string } {
    return this.appService.getHello();
  }
}
