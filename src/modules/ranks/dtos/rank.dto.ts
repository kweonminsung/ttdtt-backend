import { UserResponseDto } from 'src/modules/users/dtos/user-response.dto';

export class RankDto {
  user: UserResponseDto;
  language_no: number;
  grammar_no: number;
  highest_record: number;
  ranking: number;
  created_at: Date;

  constructor(
    user: UserResponseDto,
    language_no: number,
    grammar_no: number,
    highest_record: number,
    ranking: bigint,
    created_at: Date,
  ) {
    this.user = user;
    this.language_no = language_no;
    this.grammar_no = grammar_no;
    this.highest_record = highest_record;
    this.ranking = Number(ranking);
    this.created_at = created_at;
  }
}
