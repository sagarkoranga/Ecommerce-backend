import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerLoginModule } from '../customer_login/customer_login.module';
import { JwtGuard } from '../common/jwtguard.guard';

@Module({
  imports:[CustomerLoginModule,JwtGuard],
  providers: [CartService,PrismaService],
  controllers: [CartController]
})
export class CartModule {}
