import { Controller, Get, Post, Render, Req } from '@nestjs/common';

@Controller('brandView')
export class BrandViewController {
  @Get()
  @Render('index.hbs')
  root() {
    return { message: 'Hello world' };
  }
}
