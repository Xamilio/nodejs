import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Body,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service.js';
import type { CategoryCreateType, CategoryType } from './type/CategoryType.js';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories(): CategoryType[] {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string): CategoryType {
    const category: CategoryType | undefined =
      this.categoryService.getCategoryById(+id);
    if (category === undefined) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  @Post()
  createCategory(@Body() category: CategoryCreateType): CategoryType {
    return {
      id: 3,
      title: category.title,
      image: category.image,
      parent_id: null,
    };
  }
}
