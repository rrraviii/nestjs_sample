import Axios from 'axios';
import { Controller, Get } from '@nestjs/common';

@Controller('coin')
export class CoinController {
  @Get('/callGoApi')
  callGoApi() {
    const result = Axios.get('http://192.168.0.177:4000/blocks').then((v) => {
      console.log('돌아와', v.data);
    });
    console.log('블록 확인', result);
    return 'go';
  }

  @Get('/balance')
  balance() {
    const result = Axios.get('http://192.168.0.177:4000/balance/kth').then((v) => v.data);
    return result;
  }
}
