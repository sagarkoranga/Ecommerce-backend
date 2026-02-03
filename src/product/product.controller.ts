


import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  UploadedFiles,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ProductService } from './product.service';
import { extname } from 'path';
import { Express } from 'express';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) { }




  @Post()
  async create(@Body() body: any) {
    return this.productService.create({
      ...body,
      price: Number(body.price),
      categoryId: Number(body.categoryId),
      images: Array.isArray(body.images) ? body.images : [],
    });
  }

  
  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
  ) {
    const updateData: any = {
      ...body,
      price: body.price ? Number(body.price) : undefined,
      categoryId: body.categoryId ? Number(body.categoryId) : undefined,
    };

    if (files && files.length > 0) {
      updateData.images = files.map(file => `/uploads/${file.filename}`);
    }

    return this.productService.update(Number(id), updateData);
  }

  @Get('bestsellers')
  bestSellers() {
    return this.productService.bestSellers();
  }
  @Get('search')
  search(@Query('q') q: string) {
    if (!q) return [];
    return this.productService.searchProducts(q);
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    const productId = Number(id);

    if (isNaN(productId)) {
      return { error: "Invalid product ID" };
    }

    return this.productService.getProductById(productId);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('category/:id')
  findByCategory(@Param('id') id: string) {
    const categoryId = Number(id);

    if (isNaN(categoryId)) {
      return { error: "Invalid category ID" };
    }

    return this.productService.findByCategory(categoryId);
  }



  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    return this.productService.uploadImages(files);
  }


  @Put('status/:id')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status?: boolean },
  ) {
    return this.productService.updatestatus(Number(id), body);
  }
}