
import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';


import { LoginDto } from './dto/login.dto';
import { CustomerLoginService } from './customer_login.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('customer')
export class CustomerLoginController {
  constructor(private customerservice: CustomerLoginService) {}

 @Post('register')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/profile',
        filename: (req, file, cb) => {
          const uniqueName =
            Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async register(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    body: {
      email: string;
      password: string;
      city: string;
      mobile_no: string;
    },
  ) {
    return this.customerservice.register({
      email: body.email,
      password: body.password,
      city: body.city,
      mobile_no: body.mobile_no,
      image: file
  ? `/uploads/profile/${file.filename}`
  : `/uploads/profile/default.png`,
    });
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.customerservice.login(dto);
  }
}