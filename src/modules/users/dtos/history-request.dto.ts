import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class historyRequestDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  language_no: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  grammar_no: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  record: number;
}
