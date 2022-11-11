import { Page } from 'src/common/dtos/pagination.dto';
import { userResponseDto } from 'src/modules/users/dtos/user-response.dto';

export class rankResponseDto {
  ranks: {
    user: userResponseDto;
    language_no: number;
    grammar_no: number;
    record: number;
    createdAt: Date;
  }[];
  ranks_meta: Page;
}
