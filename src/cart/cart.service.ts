import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

async add(
  userId: number,
  productId: number,
  quantity: number = 1,
) {
  const product = await this.prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const existing = await this.prisma.cart.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (existing) {
    const newQty = existing.quantity + quantity;

    return this.prisma.cart.update({
      where: { id: existing.id },
      data: {
        quantity: newQty,
        total: newQty * product.price,
      },
    });
  }

  return this.prisma.cart.create({
    data: {
      userId,
      productId,
      quantity,
      total: quantity * product.price,
    },
  });
}



async findByUser(userId: number) {
  return this.prisma.cart.findMany({
    where: { userId },
    include: { product: true },
  });
}

async updateForUser(userId: number, cartId: number, quantity: number) {
  const cartItem = await this.prisma.cart.findFirst({
    where: { id: cartId, userId },
  });

  if (!cartItem) {
    throw new Error('Item not found in your cart');
  }

  const product = await this.prisma.product.findUnique({
    where: { id: cartItem.productId },
  });

  if (!product) {                 // ✅ IMPORTANT FIX
    throw new Error('Product not found');
  }

  return this.prisma.cart.update({
    where: { id: cartId },
    data: {
      quantity,
      total: quantity * product.price, // ✅ Now TypeScript is happy
    },
  });
}

async removeForUser(userId: number, cartId: number) {
  return this.prisma.cart.deleteMany({
    where: { id: cartId, userId },
  });
}
}