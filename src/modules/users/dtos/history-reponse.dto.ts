import { Page } from 'src/common/dtos/pagination.dto';

export class historyResponseDto {
  histories: {
    language_no: number;
    grammar_no: number;
    record: number;
    createdAt: Date;
  }[];
  histories_meta: Page;
}
