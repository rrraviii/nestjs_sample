import { Controller, Get, Param, Render, Res } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { BrandService } from './brand.service';

@Controller('brandView')
export class BrandViewController {
  constructor(private readonly brandSerivce: BrandService) {}

  /**
  @Get()
  @Render('index.hbs')
  root() {
    return { message: 'Hello world' };
  }
  @Get()
  @Render('list.hbs')
  listView() {
    return { message: 'Hello world' };
  }
   */

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
  @Get(':id')
  detailBrandInfo(@Param('id') id: string, @Res() response: Response) {
    response.type('text/html').send(readFileSync(join(__dirname, 'view/detail.html')).toString());
  }
}
