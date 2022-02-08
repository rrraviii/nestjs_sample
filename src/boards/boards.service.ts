import { Injectable } from '@nestjs/common';
import { BoardModel } from './model/board.model';

@Injectable()
export class BoardsService {
  private boards: BoardModel[] = [];

  getAllBoards(): BoardModel[] {
    return this.boards;
  }

  getBoardInfo(index: number): BoardModel {
    return this.boards[index];
  }
}
