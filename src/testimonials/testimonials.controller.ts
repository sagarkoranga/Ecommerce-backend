import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TestimonialsService } from './testimonials.service';

@Controller('testimonials')
export class TestimonialsController {
  constructor(private testimonialsService: TestimonialsService) {}

  
  @Get('public')
  getPublicBanners() {
    return this.testimonialsService.findPublic();
  }

  
  @Get()
  getAllAdmin() {
    return this.testimonialsService.findAllAdmin();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/testimonials',
        filename: (req, file, cb) => {
          const name = Date.now() + extname(file.originalname);
          cb(null, name);
        },
      }),
    }),
  )
  create(@Body() body, @UploadedFile() file) {
    return this.testimonialsService.create(body, file);
  }

@Patch(':id')
@UseInterceptors(
  FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/testimonials',
      filename: (req, file, callback) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, unique + extname(file.originalname));
      }
    })
  })
)
async update(
  @Param('id', ParseIntPipe) id: number,
  @UploadedFile() file: Express.Multer.File,
  @Body() body: any,
) {
  return this.testimonialsService.update(id, body, file);
}

    @Patch(':id/status')
  toggleStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: boolean,
  ) {
    return this.testimonialsService.toggleStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.testimonialsService.remove(id);
  }
}
