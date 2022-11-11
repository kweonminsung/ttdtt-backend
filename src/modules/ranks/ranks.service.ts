import { Injectable } from '@nestjs/common';
import { CommonResponseDto } from 'src/common/dtos/common-reponse.dto';
import { Page } from 'src/common/dtos/pagination.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { HistoryQuery } from '../users/dtos/history-query.dto';
import { RankResponseDto } from './dtos/rank-response.dto';

@Injectable()
export class RanksService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(
    query: HistoryQuery,
  ): Promise<CommonResponseDto<RankResponseDto>> {
    const where = {
      language_no: query.languageNo,
      ...(query.grammarNo && { grammar_no: query.grammarNo }),
    };
    const ranks = await this.prismaService.history.findMany({
      where,
      select: {
        language_no: true,
        grammar_no: true,
        record: true,
        created_at: true,
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            image_no: true,
          },
        },
      },
      orderBy: { record: 'desc' },
      skip: (query.pageNumber - 1) * query.pageSize,
      take: query.pageSize,
    });
    const totalCount = await this.prismaService.history.count({
      where,
    });
    return new CommonResponseDto<RankResponseDto>('success', {
      ranks,
      ranks_meta: new Page(query.pageNumber, query.pageSize, totalCount),
    });
  }
}
