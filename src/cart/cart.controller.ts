import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/current-user.decorator';

import { JwtGuard } from 'src/common/jwtguard.guard';

@Controller('cart')

export class CartController {
  constructor(private cartService: CartService) {
       console.log("✅ CART CONTROLLER LOADED");
  }

  @Post('add')
@UseGuards(JwtGuard) 
  addToCart(
   @CurrentUser() user: { id: number; email: string },
    @Body() body: { productId: number; quantity?: number }
  ) {console.log("INSIDE ADD TO CART ROUTE"); 
    
const userId=user.id;
  

    return this.cartService.add(
      userId,
      body.productId,
      body.quantity || 1
    );
  }

@Get()
@UseGuards(JwtGuard)
getCart(
  @CurrentUser() user: { id: number; email: string }
) {
  console.log("CURRENT USER:", user); // debug once
  return this.cartService.findByUser(user.id);
}

  @Put(':id')
  @UseGuards(JwtGuard)
  update(@Req() req:any, @Param('id') id: number, @Body() body: { quantity: number }) {
    const userId = req.user.id;
    return this.cartService.updateForUser(userId, +id, body.quantity);
  }

  @Delete(':id')
  @UseGuards(JwtGuard) 
  remove(@Req() req:any, @Param('id') id: number) {
    const userId = req.user.id;
    return this.cartService.removeForUser(userId, +id);
  }
}