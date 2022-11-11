import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RanksService } from './ranks.service';

@ApiTags('ranks')
@Controller('ranks')
export class RanksController {
  constructor(private readonly ranksService: RanksService) {}

  @Get()
  findAll() {
    return this.ranksService.findAll();
  }
}
