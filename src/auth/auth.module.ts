import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthViewController } from './authView.controller';

@Module({
  imports: [UserModule, JwtModule.register({ secret: 'PSJ', signOptions: { expiresIn: '300s' } })],
  controllers: [AuthController, AuthViewController],
  providers: [AuthService],
})
export class AuthModule {}
