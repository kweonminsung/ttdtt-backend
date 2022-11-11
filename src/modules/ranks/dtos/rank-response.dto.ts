import { Page } from 'src/common/dtos/pagination.dto';
import { UserResponseDto } from 'src/modules/users/dtos/user-response.dto';

export class RankResponseDto {
  ranks: {
    user: UserResponseDto;
    language_no: number;
    grammar_no: number;
    record: number;
    created_at: Date;
  }[];
  ranks_meta: Page;
}
