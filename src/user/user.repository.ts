import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'generated/prisma/client';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async insert(data: UserEntity): Promise<void> {
    await this.prisma.user.create({
      data,
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

  async selectByEmail(email: User['email']): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
}
