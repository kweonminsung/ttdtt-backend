import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CommonResponseDto } from 'src/common/dtos/common-reponse.dto';
import { Page } from 'src/common/dtos/pagination.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { HistoryQuery } from '../users/dtos/history-query.dto';
import { UserResponseDto } from '../users/dtos/user-response.dto';
import { RankResponseDto } from './dtos/rank-response.dto';
import { RankDto } from './dtos/rank.dto';

interface RawRank {
  language_no: number;
  grammar_no: number;
  created_at: Date;
  id: number;
  email: string;
  username: string;
  image_no: number;
  highest_record: number;
  ranking: bigint;
}

@Injectable()
export class RanksService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(
    query: HistoryQuery,
  ): Promise<CommonResponseDto<RankResponseDto>> {
    let where: Prisma.Sql = Prisma.sql``;
    if (query.languageNo) {
      if (query.grammarNo)
        where = Prisma.sql`WHERE language_no=${query.languageNo} AND grammar_no=${query.grammarNo}`;
      else where = Prisma.sql`WHERE language_no=${query.languageNo}`;
    }

    const raw_ranks: RawRank[] = await this.prismaService.$queryRaw`
      SELECT language_no, grammar_no, created_at, User.id, User.email, User.username, User.image_no, MAX(record) AS highest_record, RANK() OVER (ORDER BY MAX(record) DESC) AS ranking
      FROM History
      LEFT JOIN User ON User.id = History.user_id
      ${where}
      GROUP BY user_id, language_no, grammar_no, created_at, User.id, User.email, User.username, User.image_no
      LIMIT ${query.pageSize}
      OFFSET ${(query.pageNumber - 1) * query.pageSize};
    `;

    // if there are multiple records with the same email, only the one with the highest record is returned
    const processedRanks = raw_ranks.reduce((acc, cur) => {
      const existingRank = acc.find((rank) => rank.user.id === cur.id);
      if (existingRank) {
        if (existingRank.highestRecord < cur.highest_record) {
          existingRank.highestRecord = cur.highest_record;
          existingRank.ranking = cur.ranking;
        }
      } else {
        acc.push(
          new RankDto(
            new UserResponseDto(cur.id, cur.username, cur.email, cur.image_no),
            cur.language_no,
            cur.grammar_no,
            cur.highest_record,
            cur.ranking,
            cur.created_at,
          ),
        );
      }
      return acc;
    }, []);

    // const ranks: RankDto[] = [];
    // for (const rank of raw_ranks) {
    //   ranks.push(
    //     new RankDto(
    //       new UserResponseDto(
    //         rank.id,
    //         rank.username,
    //         rank.email,
    //         rank.image_no,
    //       ),
    //       rank.language_no,
    //       rank.grammar_no,
    //       rank.highest_record,
    //       rank.ranking,
    //       rank.created_at,
    //     ),
    //   );
    // }

    const totalCount = Number(
      (
        await this.prismaService.$queryRaw`
          SELECT COUNT(DISTINCT user_id) AS total_count
          FROM History
          ${where};
        `
      )[0].total_count,
    );
    return new CommonResponseDto<RankResponseDto>('success', {
      ranks: processedRanks,
      ranks_meta: new Page(query.pageNumber, query.pageSize, totalCount),
    });
  }
}
