import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardModel } from './model/board.model';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/all')
  getAllBoard(): BoardModel[] {
    return this.boardsService.getAllBoards().filter((v) => v.status);
  }
}
