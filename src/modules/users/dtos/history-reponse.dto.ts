import { Page } from 'src/common/dtos/pagination.dto';

export class HistoryResponseDto {
  histories: {
    language_no: number;
    grammar_no: number;
    record: number;
    created_at: Date;
  }[];
  histories_meta: Page;
}
