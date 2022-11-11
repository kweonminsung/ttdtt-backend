import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonResponseDto } from 'src/common/dtos/common-reponse.dto';
import { HistoryQuery } from '../users/dtos/history-query.dto';
import { RankResponseDto } from './dtos/rank-response.dto';
import { RanksService } from './ranks.service';

@ApiTags('ranks')
@Controller('ranks')
export class RanksController {
  constructor(private readonly ranksService: RanksService) {}

  @Get()
  @ApiOperation({ summary: '전체 랭킹 리스트 조회' })
  async findAll(
    @Query() query: HistoryQuery,
  ): Promise<CommonResponseDto<RankResponseDto>> {
    return await this.ranksService.findAll(query);
  }
}
