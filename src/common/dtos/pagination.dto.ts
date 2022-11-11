import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class Page {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPage: number;

  constructor(pageNumber: number, pageSize: number, totalCount: number) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.totalPage = Math.ceil(totalCount / pageSize);
  }
}

export class PageQuery {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  pageNumber: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  pageSize: number;
}
