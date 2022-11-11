import { Injectable } from '@nestjs/common';
import { commonResponseDto } from 'src/common/dtos/common-reponse.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  createUser() {
    return new commonResponseDto('Hello', { test: 'Test' });
  }

  readMe() {
    return 'Hello';
  }

  updateMe() {
    return 'Hello';
  }

  deleteMe() {
    return 'Hello';
  }

  readMyHistories() {
    return 'Hello';
  }

  createMyHistory() {
    return 'Hello';
  }
}
