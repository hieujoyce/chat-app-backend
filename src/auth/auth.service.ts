import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword } from 'src/utils/helpers';
import { User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    // @Inject(Services.USERS) private userService: UsersService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string) {
    const findUser = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!findUser)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    //console.log(findUser);
    const isPasswordValid = await comparePassword(password, findUser.password);
    return isPasswordValid ? findUser : null;
  }
}
