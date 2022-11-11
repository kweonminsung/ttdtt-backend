import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class historyRequestDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  language_no: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  grammar_no: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  record: number;
}
