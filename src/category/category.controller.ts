import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResponseDTO } from './dto/category-response.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categorySerivce: CategoryService) {}
  /**
   * 카데고리 리스트 조회
   * @returns
   */
  @Get('/fetchAllCategoryList')
  async fetchAllCategoryList(): Promise<CategoryResponseDTO[]> {
    const categoryList = await this.categorySerivce.fetchAllCategoryList();

    return categoryList.map((v) => {
      const dto: CategoryResponseDTO = {
        id: v.id,
        name: v.name,
      };
      return dto;
    });
  }
}
