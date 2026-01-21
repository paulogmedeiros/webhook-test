import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { generateId } from 'src/utils/shared/generate.uuidv7';
import { User } from 'generated/prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async insert(data: CreateUserDto): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: generateId(),
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });
  }

  // async selectUser() {
  //   return await this.prisma.user.findMany({
  //     where: {
  //       deletedAt: null,
  //     },
  //   });
  // }

  // async selectUserById(id: string) {
  //   return await this.prisma.user.findUnique({
  //     where: {
  //       id,
  //       deletedAt: null,
  //     },
  //   });
  // }

  //   async updateUser(id: string, data: Partial<CreateUserDto>) {
  //     return await this.prisma.user.update({
  //       where: {
  //         id,
  //         deletedAt: null,
  //       },
  //       data: data as any,
  //     });
  //   }

  // async softDeleteUser(id: string) {
  //   return await this.prisma.user.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       deletedAt: new Date(),
  //     },
  //   });
  // }

  async selectByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
}
