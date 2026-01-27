import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerLoginModule } from 'src/customer_login/customer_login.module';
import { JwtGuard } from 'src/common/jwtguard.guard';

@Module({
  imports:[CustomerLoginModule,JwtGuard],
  providers: [CartService,PrismaService],
  controllers: [CartController]
})
export class CartModule {}
