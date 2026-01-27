import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  ForbiddenException,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtGuard } from 'src/common/jwtguard.guard';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('orders')
 // 🔥 Protect ALL routes by default
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // ✅ Order Summary (from DB cart)
  @Get('summary')
  @UseGuards(JwtGuard)
  getSummary(@Req() req) {
    return this.orderService.getOrderSummary(req.user.id);
  }

  // ✅ Place order (NO BODY CART)
  @Post('place')
  @UseGuards(JwtGuard)
  async placeOrder(@Req() req) {
    return this.orderService.placeOrder(req.user.id);
  }

  // ✅ Get logged-in user's orders ONLY
  @Get('my')
  @UseGuards(JwtGuard)
  getMyOrders(@Req() req) {
    return this.orderService.getOrdersByUserId(req.user.id);
  }

  // ❌ ADMIN ONLY (example)
  @Get('user/:email')
  @UseGuards(JwtAuthGuard)
  async getOrdersByEmail( @Param('email') email: string) {
    // Only admin can access this

    return this.orderService.getOrdersByEmail(email);
  }

 
  @Patch(':orderId/status')
   @UseGuards(JwtAuthGuard)
  updateOrderStatus(
    @Req() req,
    @Param('orderId') orderId: string,
    @Body() body: { status: 'PENDING' | 'DELIVERED' }
  ) {
    if (!req.user.isAdmin) {
      throw new ForbiddenException('Admins only');
    }
    return this.orderService.updateOrderStatus(
      Number(orderId),
      body.status
    );
  }

  // ❌ ADMIN ONLY
  @Delete(':orderId')
   @UseGuards(JwtAuthGuard)
  deleteOrder(@Req() req, @Param('orderId',ParseIntPipe) orderId: string) {
    if (!req.user.isAdmin) {
      throw new ForbiddenException('Admins only');
    }
    return this.orderService.deleteOrder(Number(orderId));
  }
}