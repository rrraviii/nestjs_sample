import { CategoryInfoDTO } from 'src/category/dto/category-info.dto';

export class BrandRequestDTO {
  brandId: string;

  name: string;

  // 카테고리
  categoryInfo: CategoryInfoDTO;

  color: string;
}
