import { Controller, Get, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('userView')
export class UserViewController {
  constructor(private readonly userSerivce: UserService) {}

  @Get('list')
  list(@Res() response: Response) {
    console.log('dirName', __dirname);
    response.type('text/html').send(readFileSync(join(__dirname, 'view/list.html')).toString());
  }

  @Get('insert')
  insert(@Res() response: Response) {
    console.log('dirName', __dirname);
    response.type('text/html').send(readFileSync(join(__dirname, 'view/insert.html')).toString());
  }
}
