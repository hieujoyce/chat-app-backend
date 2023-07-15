import {
  Body,
  Controller,
  Post,
  Inject,
  UseGuards,
  Res,
  Get,
  Req,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { CreateUserRegisterDto } from './dtos/CreateUserRegisterDto';
import { plainToInstance } from 'class-transformer';
import { UsersService } from 'src/users/users.service';
import { Request, Response } from 'express';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/guards';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(Services.USERS) private userService: UsersService) {}

  @Post('register')
  async register(@Body() body: CreateUserRegisterDto) {
    const paramsUser = plainToInstance(CreateUserRegisterDto, body, {
      excludeExtraneousValues: true,
    });
    return await this.userService.createUser(paramsUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Res() res: Response) {
    return res.json({ msg: 'Đăng nhập thành công' });
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async status(@Res() res: Response, @Req() req: Request) {
    return res.json(req.user);
  }
}
