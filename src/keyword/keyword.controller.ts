import { Controller, Get, HttpCode } from '@nestjs/common';
import { ResponseKeywordDTO } from './dto/keyword-response.dto';
import { KeywordService } from './keyword.service';

@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordSerivce: KeywordService) {}

  /**
   * 키워드 리스트 조회
   * @returns
   */
  @Get('fetchKeywordList')
  @HttpCode(200)
  async fetchKeywordList(): Promise<ResponseKeywordDTO[]> {
    const keywordListEntity = await this.keywordSerivce.fetchKeywordList();
    const responseData = this.keywordSerivce.parseKeywordResponseDTO(keywordListEntity);

    // parseKeywordMappingBrandList(keywordListEntity);

    return [];
  }
}
