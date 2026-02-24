import {
  Controller,
  // Get,
  Post,
  Body,
  Get,
  Param,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from 'src/swagger/swagger.tags';

@ApiTags(SwaggerTags.USER)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('cadastro')
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }
}
