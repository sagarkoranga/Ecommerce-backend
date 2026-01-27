// import {
//   Controller,
//   Post,
//   Get,
//   Put,
//   Delete,
//   Body,
//   Param,
//   UploadedFile,
//   UseInterceptors,
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { ProductService } from './product.service';
// import { extname } from 'path';

// @Controller('products')
// export class ProductController {
//   constructor(private productService: ProductService) {}

//   // CREATE PRODUCT WITH IMAGE
//   @Post()
//   @UseInterceptors(
//     FileInterceptor('image', {
//       storage: diskStorage({
//         destination: './uploads', // folder to store images
//         filename: (req, file, cb) => {
//           const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//           const ext = extname(file.originalname);
//           cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//         },
//       }),
//     }),
//   )
//   create(@UploadedFile() file: Express.Multer.File, @Body() body:any) {
//     const productData = {
//       ...body,
//       price: Number(body.price),
//       categoryId: Number(body.categoryId),
//       images: file?.filename, // store filename in DB
//     };
//     return this.productService.create(productData);
//   }

//   // UPDATE PRODUCT WITH OPTIONAL IMAGE
//   @Put(':id')
//   @UseInterceptors(
//     FileInterceptor('image', {
//       storage: diskStorage({
//         destination: './uploads',
//         filename: (req, file, cb) => {
//           const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//           const ext = extname(file.originalname);
//           cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//         },
//       }),
//     }),
//   )
//   update(@Param('id') id: number, @UploadedFile() file: Express.Multer.File, @Body() body:any) {
//     const updateData: any = {
//       ...body,
//       price: body.price ? Number(body.price) : undefined,
//       categoryId: body.categoryId ? Number(body.categoryId) : undefined,
//     };
//     if (file) {
//       updateData.images = file.filename;
//     }
//     return this.productService.update(Number(id), updateData);
//   }

//   @Get(':id')
// getProduct(@Param('id') id: string) {
//   return this.productService.getProductById(Number(id));
// }

//   @Get()
//   findAll() {
//     return this.productService.findAll();
//   }

//   @Get('category/:id')
//   findByCategory(@Param('id') id: number) {
//     return this.productService.findByCategory(Number(id));
//   }

//   @Get('bestsellers')
//   bestSellers() {
//     return this.productService.bestSellers();
//   }


  

//   @Put(':id')
// updatestatus(
//   @Param('id') id: string,
//   @Body() body: { status?: boolean },
// ) {
//   return this.productService.update(Number(id), body);
// }
// }

// import {
//   Controller,
//   Post,
//   Get,
//   Param,
//   Body,
//   Put,
//   Query,
//   UseInterceptors,
//   UploadedFiles,
// } from '@nestjs/common';
// import { FilesInterceptor } from '@nestjs/platform-express';
// import { ProductService } from './product.service';

// @Controller('products')
// export class ProductController {
//   constructor(private readonly productService: ProductService) {}

//   // ---------- CREATE PRODUCT (WITHOUT FILE UPLOAD) ----------
//   @Post()
//   create(@Body() data: any) {
//     return this.productService.create(data);
//   }

//   // ---------- UPLOAD MULTIPLE IMAGES (OPTIONAL BUT RECOMMENDED) ----------
//   @Post('upload')
//   @UseInterceptors(FilesInterceptor('images', 5))
//   uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
//     return files.map(file => `/uploads/${file.filename}`);
//   }

//   // ---------- GET ALL PRODUCTS ----------
//   @Get()
//   findAll() {
//     return this.productService.findAll();
//   }

//   // ---------- GET PRODUCT BY ID ----------
//   @Get(':id')
//   getProductById(@Param('id') id: string) {
//     return this.productService.getProductById(Number(id));
//   }

//   // ---------- GET PRODUCTS BY CATEGORY ----------
//   @Get('category/:categoryId')
//   findByCategory(@Param('categoryId') categoryId: string) {
//     return this.productService.findByCategory(Number(categoryId));
//   }

//   // ---------- UPDATE PRODUCT ----------
//   @Put(':id')
//   update(@Param('id') id: string, @Body() data: any) {
//     return this.productService.update(Number(id), data);
//   }

//   // ---------- UPDATE STATUS ONLY ----------
//   @Put('status/:id')
//   updateStatus(
//     @Param('id') id: string,
//     @Body() data: { status: boolean },
//   ) {
//     return this.productService.updatestatus(Number(id), data);
//   }

//   // ---------- BEST SELLERS ----------
//   @Get('bestsellers/list')
//   bestSellers() {
//     return this.productService.bestSellers();
//   }
// }


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
  constructor(private productService: ProductService) {}

  // ✅ CREATE PRODUCT WITH MULTIPLE IMAGES
  // @Post()
  // @UseInterceptors(
  //   FilesInterceptor('images', 10, {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, cb) => {
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         const ext = extname(file.originalname);
  //         cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  //       },
  //     }),
  //   }),
  // )
  // create(
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Body() body: any,
  // ) {
  //   const imageFilenames = files?.map(file => `/uploads/${file.filename}`) || [];

  //   const productData = {
  //     ...body,
  //     price: Number(body.price),
  //     categoryId: Number(body.categoryId),
  //     images: imageFilenames,   // ✅ ARRAY OF IMAGES
  //   };

  //   return this.productService.create(productData);
  // }


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
        cb(null, `product-${uniqueSuffix}${ext}`);
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