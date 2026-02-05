import { generateId } from 'src/utils/shared/generate.uuidv7';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../../prisma/generated/prisma/client';

export class UserEntity {
  id: User['id'];
  email: User['email'];
  password: User['password'];
  name: User['name'];

  constructor(user: CreateUserDto) {
    this.id = generateId();
    this.email = user.email;
    this.password = user.password;
    this.name = user.name;
    this.nomalizeName();
  }

  private nomalizeName(): void {
    this.name = this.name.trim();
  }
}
