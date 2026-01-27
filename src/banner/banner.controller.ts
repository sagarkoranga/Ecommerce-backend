import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { BannerService } from './banner.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('banners')
export class BannerController {
  constructor(private bannerService: BannerService) {}

  
  @Get('public')
  getPublicBanners() {
    return this.bannerService.findPublic();
  }

  
  @Get()
  getAllAdmin() {
    return this.bannerService.findAllAdmin();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/banners',
        filename: (req, file, cb) => {
          const name = Date.now() + extname(file.originalname);
          cb(null, name);
        },
      }),
    }),
  )
  create(@Body() body, @UploadedFile() file) {
    return this.bannerService.create(body, file);
  }

@Patch(':id')
@UseInterceptors(
  FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/banners',
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
  return this.bannerService.update(id, body, file);
}

    @Patch(':id/status')
  toggleStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: boolean,
  ) {
    return this.bannerService.toggleStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bannerService.remove(id);
  }
}
