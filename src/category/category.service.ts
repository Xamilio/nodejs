import { Injectable } from '@nestjs/common';
import { CategoryType } from './type/CategoryType.js';

@Injectable()
export class CategoryService {
  private categories: CategoryType[] = [
    {
      id: 1,
      title: 'Furniture',
      image: 'furniture.png',
      parent_id: null,
    },
    {
      id: 2,
      title: 'Chairs',
      image: 'chairs.png',
      parent_id: 1,
    },
  ];

  getCategories(): CategoryType[] {
    return this.categories;
  }

  getCategoryById(id: number): CategoryType | undefined {
    return this.categories.find((c) => c.id === id);
  }
}
