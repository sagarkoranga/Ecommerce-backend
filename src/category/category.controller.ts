import { Controller, Post, Get, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}


  @Post()
  create(@Body() body: { name: string; parentId?: string }) {
    return this.categoryService.create(body.name, body.parentId);
  }
  @Get('by-category/:id')
getByCategory(@Param('id') id: string) {
  return this.categoryService.getProductsByCategory(Number(id));
}



  @Put(':id')
  update(
    @Param('id',ParseIntPipe) id: number,
    @Body() body: { name: string ,parentId:number},
  ) {
    return this.categoryService.update(id, body.name, body.parentId );
  }

    @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }

  @Get()
  getAll() {
    return this.categoryService.findAllTree();
  }
}