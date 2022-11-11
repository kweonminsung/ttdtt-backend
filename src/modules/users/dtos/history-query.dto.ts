import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { PageQuery } from 'src/common/dtos/pagination.dto';

export class HistoryQuery extends PageQuery {
  @ApiProperty()
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  languageNo: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @IsPositive()
  grammarNo?: number;
}
