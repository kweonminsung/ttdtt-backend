import { Page } from 'src/common/dtos/pagination.dto';
import { RankDto } from './rank.dto';

export class RankResponseDto {
  ranks: RankDto[];
  ranks_meta: Page;
}
