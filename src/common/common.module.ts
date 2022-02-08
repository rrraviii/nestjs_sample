import { Module } from '@nestjs/common';
import { AxiosService } from './AxiosService';

@Module({
  providers: [AxiosService],
  exports: [AxiosService],
})
export class CommonModule {}
