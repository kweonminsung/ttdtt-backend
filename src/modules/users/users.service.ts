import { HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS, TOTAL_IMAGE_NO } from 'src/common/constants';
import { commonResponseDto } from 'src/common/dtos/common-reponse.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { userRequestDto } from './dtos/user-request.dto';
import { userResponseDto } from './dtos/user-response.dto';
import { loginRequestDto } from './dtos/login-request.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    dto: userRequestDto,
  ): Promise<commonResponseDto<userResponseDto>> {
    if (
      await this.prismaService.user.findUnique({
        where: {
          email: dto.email,
        },
      })
    )
      throw new BadRequestException('email already exists');

    const user = await this.prismaService.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: await bcrypt.hash(dto.password, SALT_OR_ROUNDS),
        image_no: Math.floor(Math.random() * TOTAL_IMAGE_NO),
      },
    });
    return new commonResponseDto(
      'success',
      new userResponseDto(user.id, user.username, user.email, user.image_no),
    );
  }

  async login(dto: loginRequestDto, res: Response) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user || !(await bcrypt.compare(dto.password, user.password)))
      throw new UnauthorizedException();

    res
      .cookie(
        'ttdtt_web_token',
        this.jwtService.sign({ id: user.id, email: user.email }),
      )
      .send(
        new commonResponseDto(
          'success',
          new userResponseDto(
            user.id,
            user.username,
            user.email,
            user.image_no,
          ),
        ),
      );
    return;
  }

  async updateMe(user: User, dto: userRequestDto) {
    const result = await this.prismaService.user.update({
      where: { id: user.id },
      data: dto,
    });
    return new commonResponseDto(
      'success',
      new userResponseDto(
        result.id,
        result.username,
        result.email,
        result.image_no,
      ),
    );
  }

  async deleteMe(user: User) {
    await this.prismaService.user.delete({
      where: {
        id: user.id,
      },
    });
    return new commonResponseDto('success');
  }

  async readMyHistories(user: User) {
    return 'Hello';
  }

  async createMyHistory(user: User) {
    return 'Hello';
  }
}
