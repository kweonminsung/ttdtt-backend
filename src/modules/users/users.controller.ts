import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Res,
  UseGuards,
  Req,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { CommonResponseDto } from 'src/common/dtos/common-reponse.dto';
import { HistoryQuery } from './dtos/history-query.dto';
import { HistoryResponseDto } from './dtos/history-reponse.dto';
import { HistoryRequestDto } from './dtos/history-request.dto';
import { LoginRequestDto } from './dtos/login-request.dto';
import { UserRequestDto } from './dtos/user-request.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ type: UserRequestDto })
  async create(
    @Body() dto: UserRequestDto,
  ): Promise<CommonResponseDto<UserResponseDto>> {
    return await this.usersService.create(dto);
  }

  @Post('me')
  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: LoginRequestDto })
  async login(@Body() dto: LoginRequestDto, @Res() res: Response) {
    return await this.usersService.login(dto, res);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '유저 정보 조회 (JWT 검증)' })
  getMe(@Req() req: Request): CommonResponseDto<UserResponseDto> {
    const user: User = req.user as User;
    return new CommonResponseDto(
      'success',
      new UserResponseDto(user.id, user.username, user.email, user.image_no),
    );
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '유저 정보 업데이트' })
  @ApiBody({ type: UserRequestDto })
  updateMe(
    @Req() req: Request,
    @Body() dto: UserRequestDto,
  ): Promise<CommonResponseDto<UserResponseDto>> {
    return this.usersService.updateMe(req.user as User, dto);
  }

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '회원 탈퇴' })
  async deleteMe(@Req() req: Request): Promise<CommonResponseDto> {
    return await this.usersService.deleteMe(req.user as User);
  }

  @Get('me/histories')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '유저 플레이 기록 조회' })
  async getMyHistories(
    @Req() req: Request,
    @Query() query: HistoryQuery,
  ): Promise<CommonResponseDto<HistoryResponseDto>> {
    return await this.usersService.readMyHistories(req.user as User, query);
  }

  @Post('me/histories')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '유저 플레이 기록 추가' })
  @ApiBody({ type: HistoryRequestDto })
  async createMyHistory(
    @Req() req: Request,
    @Body() dto: HistoryRequestDto,
  ): Promise<CommonResponseDto> {
    return await this.usersService.createMyHistory(req.user as User, dto);
  }
}
