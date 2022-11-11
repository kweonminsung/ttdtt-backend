import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

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
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  pageNumber: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  pageSize: number;

  getOffset(): number {
    return (this.pageNumber - 1) * this.pageSize;
  }

  getLimit(): number {
    return this.pageSize;
  }
}
