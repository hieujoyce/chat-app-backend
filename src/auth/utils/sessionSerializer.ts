import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/utils/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super();
  }
  serializeUser(user: User, done: Function) {
    done(null, user.id);
  }
  async deserializeUser(userId: number, done: Function) {
    const userDb = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    return userDb
      ? done(null, plainToInstance(User, userDb))
      : done(null, null);
  }
}
