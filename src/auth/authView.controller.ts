import { Controller, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('authView')
export class AuthViewController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  list(@Res() response: Response) {
    console.log('dirName', __dirname);
    response.type('text/html').send(readFileSync(join(__dirname, 'view/login.html')).toString());
  }
}
