import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    await this.findEmail(createUserDto.email);
    createUserDto.password = await this.authService.hashPassword(
      createUserDto.password,
    );
    await this.userRepository.insertUser(createUserDto);
  }

  private async findEmail(email: string) {
    const user = await this.userRepository.findUserByEmail(email);
    if (user) {
      throw new BadRequestException('E-mail já cadastrado');
    }
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
