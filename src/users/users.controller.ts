import { Controller, Get, Inject } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { UsersService } from './users.service';

@Controller(Routes.USERS)
export class UsersController {
  constructor(
    @Inject(Services.USERS) private readonly userService: UsersService,
  ) {}
}
