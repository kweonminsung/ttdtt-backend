import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS, TOTAL_IMAGE_NO } from 'src/common/constants';
import { CommonResponseDto } from 'src/common/dtos/common-reponse.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { UserRequestDto } from './dtos/user-request.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { LoginRequestDto } from './dtos/login-request.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { HistoryRequestDto } from './dtos/history-request.dto';
import { HistoryResponseDto } from './dtos/history-reponse.dto';
import { HistoryQuery } from './dtos/history-query.dto';
import { Page } from 'src/common/dtos/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    dto: UserRequestDto,
  ): Promise<CommonResponseDto<UserResponseDto>> {
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
    return new CommonResponseDto(
      'success',
      new UserResponseDto(user.id, user.username, user.email, user.image_no),
    );
  }

  async login(dto: LoginRequestDto, res: Response) {
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
        new CommonResponseDto(
          'success',
          new UserResponseDto(
            user.id,
            user.username,
            user.email,
            user.image_no,
          ),
        ),
      );
    return;
  }

  async updateMe(user: User, dto: UserRequestDto) {
    const result = await this.prismaService.user.update({
      where: { id: user.id },
      data: dto,
    });
    return new CommonResponseDto(
      'success',
      new UserResponseDto(
        result.id,
        result.username,
        result.email,
        result.image_no,
      ),
    );
  }

  async deleteMe(user: User): Promise<CommonResponseDto> {
    await this.prismaService.user.delete({
      where: {
        id: user.id,
      },
    });
    return new CommonResponseDto('success');
  }

  async readMyHistories(
    user: User,
    query: HistoryQuery,
  ): Promise<CommonResponseDto<HistoryResponseDto>> {
    const where = {
      user_id: user.id,
      language_no: query.languageNo,
      ...(query.grammarNo && { grammar_no: query.grammarNo }),
    };
    const histories = await this.prismaService.history.findMany({
      where,
      select: {
        grammar_no: true,
        language_no: true,
        record: true,
        created_at: true,
      },
      orderBy: {
        created_at: 'desc',
      },
      skip: (query.pageNumber - 1) * query.pageSize,
      take: query.pageSize,
    });
    const totalCount = await this.prismaService.history.count({
      where,
    });
    return new CommonResponseDto<HistoryResponseDto>('success', {
      histories,
      histories_meta: new Page(query.pageNumber, query.pageSize, totalCount),
    });
  }

  async createMyHistory(user: User, dto: HistoryRequestDto) {
    await this.prismaService.history.create({
      data: {
        user_id: user.id,
        grammar_no: dto.grammar_no,
        language_no: dto.language_no,
        record: dto.record,
      },
    });
    return new CommonResponseDto('success');
  }
}
