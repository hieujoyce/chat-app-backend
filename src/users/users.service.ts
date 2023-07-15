import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserParams } from 'src/utils/types';
import { hashPassword } from '../utils/helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/utils/typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(params: CreateUserParams) {
    console.log(params);
    const existingUser = await this.userRepository.findOne({
      where: {
        email: params.email,
      },
    });
    if (existingUser)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);

    params.password = await hashPassword(params.password);
    const newUser = this.userRepository.create(params);
    return plainToInstance(User, await this.userRepository.save(newUser));
  }
}
