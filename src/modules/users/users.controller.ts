import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser() {
    return this.usersService.createUser();
  }

  @Get('me')
  getMe() {
    return this.usersService.getMe();
  }

  @Patch('me')
  updateMe() {
    return this.usersService.updateMe();
  }

  @Delete('me')
  deleteMe() {
    return this.usersService.deleteMe();
  }

  @Get('me/histories')
  getMyHistories() {
    return this.usersService.getMyHistories();
  }

  @Post('me/histories')
  createMyHistory() {
    return this.usersService.createMyHistory();
  }
}
