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

  // @Get()
  // getAllCategories(): CategoryGetResDto[] {
  //   return this.categoryService.getCategories();
  // }

  // @Get(':id')
  // getCategoryById(@Param('id') id: string): CategoryGetResDto {
  //   const category: CategoryGetResDto | undefined =
  //     this.categoryService.getCategoryById(+id);
  //   if (category === undefined) {
  //     throw new NotFoundException('Category not found');
  //   }
  //   return category;
  // }

  @Post()
  async createCategory(
    @Body() category: CategoryCreateReqDto,
  ): Promise<CategoryGetResDto> {
    const created = await this.categoryService.create(category);
    return created;
  }

  @Get()
  async getAllCategory(): Promise<CategoryGetResDto[]> {
    return await this.categoryService.findAll();
  }

  // @Get(':id')
  // async getCategoryById(@Param('id') id: number): Promise<CategoryGetResDto> {
  //   const category = await this.categoryService.findById();
  // }
}
