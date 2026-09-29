import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Body,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service.js';
import { CategoryCreateReqDto } from './dtos/category_create.req.dto.js';
import { CategoryGetResDto } from './dtos/category_get.res.dto.js';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories(): CategoryGetResDto[] {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string): CategoryGetResDto {
    const category: CategoryGetResDto | undefined =
      this.categoryService.getCategoryById(+id);
    if (category === undefined) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  @Post()
  createCategory(@Body() category: CategoryCreateReqDto): CategoryGetResDto {
    return {
      id: 3,
      slug: category.slug,
      title: category.title,
      parent_id: null,
    };
  }
}
