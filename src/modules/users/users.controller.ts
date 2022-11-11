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
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { commonResponseDto } from 'src/common/dtos/common-reponse.dto';
import { historyRequestDto } from './dtos/history-request.dto';
import { loginRequestDto } from './dtos/login-request.dto';
import { userRequestDto } from './dtos/user-request.dto';
import { userResponseDto } from './dtos/user-response.dto';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ type: userRequestDto })
  async create(
    @Body() dto: userRequestDto,
  ): Promise<commonResponseDto<userResponseDto>> {
    return await this.usersService.create(dto);
  }

  @Post('me')
  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: loginRequestDto })
  async login(@Body() dto: loginRequestDto, @Res() res: Response) {
    return await this.usersService.login(dto, res);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '유저 정보 조회 (JWT 검증)' })
  getMe(@Req() req: Request): commonResponseDto<userResponseDto> {
    const user: User = req.user as User;
    return new commonResponseDto(
      'success',
      new userResponseDto(user.id, user.username, user.email, user.image_no),
    );
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '유저 정보 업데이트' })
  @ApiBody({ type: userRequestDto })
  updateMe(
    @Req() req: Request,
    @Body() dto: userRequestDto,
  ): Promise<commonResponseDto<userResponseDto>> {
    return this.usersService.updateMe(req.user as User, dto);
  }

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '회원 탈퇴' })
  async deleteMe(@Req() req: Request) {
    return await this.usersService.deleteMe(req.user as User);
  }

  @Get('me/histories')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '유저 플레이 기록 조회' })
  async getMyHistories(@Req() req: Request) {
    return await this.usersService.readMyHistories(req.user as User);
  }

  @Post('me/histories')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '유저 플레이 기록 추가' })
  @ApiBody({ type: historyRequestDto })
  async createMyHistory(@Req() req: Request) {
    return await this.usersService.createMyHistory(req.user as User);
  }
}
