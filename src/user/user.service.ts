import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from 'generated/prisma/client';
import { hashPassword } from 'src/utils/shared/generate.hashing';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const emailExists = await this.findByEmail(createUserDto.email);
    if (emailExists) {
      throw new BadRequestException('E-mail já cadastrado');
    }
    const userEntity = new UserEntity(createUserDto);
    userEntity.password = await hashPassword(userEntity.password);
    await this.userRepository.insert(userEntity);
  }

  async findByEmail(email: User['email']): Promise<User | null> {
    return await this.userRepository.selectByEmail(email);
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
