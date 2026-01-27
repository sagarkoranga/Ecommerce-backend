import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartService } from './cart/cart.service';
import { CartController } from './cart/cart.controller';
import { CartModule } from './cart/cart.module';
import { AddressService } from './address/address.service';
import { AddressController } from './address/address.controller';
import { AddressModule } from './address/address.module';

import { CategoryModule } from './category/category.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { ResetService } from './reset/reset.service';
import { ResetController } from './reset/reset.controller';
import { ResetModule } from './reset/reset.module';
import { ConfigModule } from '@nestjs/config';
import { AdminController } from './auth/auth.controller';
import { AdminService } from './auth/auth.service';

import { BannerService } from './banner/banner.service';
import { BannerController } from './banner/banner.controller';
import { BannerModule } from './banner/banner.module';
import { TestimonialsService } from './testimonials/testimonials.service';
import { TestimonialsController } from './testimonials/testimonials.controller';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { CustomerLoginService } from './customer_login/customer_login.service';
import { CustomerLoginController } from './customer_login/customer_login.controller';
import { CustomerLoginModule } from './customer_login/customer_login.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './customer_login/jwt.strategy';
import { ContactService } from './contact/contact.service';
import { ContactController } from './contact/contact.controller';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [CartModule, ConfigModule.forRoot({isGlobal:true,}),AddressModule, CategoryModule, PrismaModule, ProductModule, OrderModule, AuthModule, ResetModule, BannerModule, TestimonialsModule, CustomerLoginModule, ContactModule],
  controllers: [AppController, CartController, AddressController, ResetController,AdminController, BannerController, TestimonialsController, CustomerLoginController, ContactController],
  providers: [AppService, CartService, AddressService, PrismaService, ResetService,AdminService, BannerService, TestimonialsService, CustomerLoginService, ContactService],
  exports:[]
})
export class AppModule {}
