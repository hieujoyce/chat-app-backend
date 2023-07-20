import { Controller, Get, Inject } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { UsersService } from './users.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller(Routes.USERS)
export class UsersController {
  constructor(
    @Inject(Services.USERS) private readonly userService: UsersService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Get()
  testEmit() {
    this.eventEmitter.emit('order.created', { data: 'Hello Hieu Joyce' });
    return { msg: 'Success' };
  }
}
