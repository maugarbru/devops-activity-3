import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './services/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
  ) {}

  @Get()
  getHello() {
    return this.userService.findAll();
  }
  @Post()
  createUser(@Body() payload: any) {
    return this.userService.createUser(payload);
  }
}
