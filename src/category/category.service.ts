import { Injectable } from '@nestjs/common';
import { CategoryGetResDto } from './dtos/category_get.res.dto.js';

@Injectable()
export class CategoryService {
  private categories: CategoryGetResDto[] = [
    {
      id: 1,
      title: 'Furniture',
      slug: 'furniture',
      image: 'furniture.png',
      parent_id: null,
    },
    {
      id: 2,
      title: 'Chairs',
      slug: 'chairs',
      image: 'chairs.png',
      parent_id: 1,
    },
  ];

  getCategories(): CategoryGetResDto[] {
    return this.categories;
  }

  getCategoryById(id: number): CategoryGetResDto | undefined {
    return this.categories.find((c) => c.id === id);
  }
}

// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// import { Category } from './category.entity';
// import { CreateCategoryDto } from './dto/create-category.dto';

// @Injectable()
// export class CategoryService {

//   constructor(
//     @InjectRepository(Category)
//     private readonly categoryRepository: Repository<Category>,
//   ) {}

//   async create(
//     createCategoryDto: CreateCategoryDto,
//   ): Promise<Category> {

//     const category = this.categoryRepository.create(
//       createCategoryDto,
//     );

//     return this.categoryRepository.save(category);
//   }
// }
