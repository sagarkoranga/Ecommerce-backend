import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  // -------------------------------
  // CART → ORDER SUMMARY
  // -------------------------------
  async getOrderSummary(userId: number) {
    const cartItems = await this.prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });

    if (!cartItems.length) {
      throw new BadRequestException('Cart is empty');
    }

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0,
    );

    return {
      items: cartItems.map(item => ({
        productId: item.productId,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        total: item.quantity * item.product.price,
      })),
      totalAmount,
    };
  }

  // -------------------------------
  // PLACE ORDER (FROM DB CART ONLY)
  // -------------------------------
  async placeOrder(userId: number) {
    const cartItems = await this.prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });

    if (!cartItems.length) {
      throw new BadRequestException('Cart is empty');
    }

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0,
    );

    // 🔒 Transaction = SAFE
    const order = await this.prisma.$transaction(async (tx) => {
      // 1️⃣ Create order
      const createdOrder = await tx.order.create({
        data: {
          userId,
          totalAmount,
          items: {
            create: cartItems.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
            })),
          },
        },
        include: {
          items: {
            include: { product: true },
          },
        },
      });

      // 2️⃣ Update sold count
      for (const item of cartItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            soldCount: { increment: item.quantity },
          },
        });
      }

      // 3️⃣ Clear cart
      await tx.cart.deleteMany({
        where: { userId },
      });

      return createdOrder;
    });

    return {
      orderId: order.id,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,
      items: order.items.map(i => ({
        title: i.product.title,
        quantity: i.quantity,
        price: i.price,
      })),
    };
  }

  // -------------------------------
  // GET LOGGED-IN USER ORDERS
  // -------------------------------
  async getOrdersByUserId(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
  }


  





  async updateOrderStatus(orderId: number, status: 'PENDING' | 'DELIVERED') {
    if (!orderId || isNaN(orderId)) {
      throw new BadRequestException('Invalid order ID');
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

async deleteOrder(orderId: number) {
  // check order exists
  const order = await this.prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new NotFoundException('Order not found');
  }

  // delete items first
  await this.prisma.orderItem.deleteMany({
    where: { orderId },
  });

  // delete order
  return this.prisma.order.delete({
    where: { id: orderId },
  });
}

    
  async getOrdersByEmail(email: string) {
    if (!email) throw new BadRequestException('Email is required');

    const user = await this.prisma.customer_login.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const orders = await this.prisma.order.findMany({
      where: { userId: user.id },
      include: {
        items: {
          include: { product: true },
        },
        user: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    // Map to clean response
    return orders.map(order => ({
      orderId: order.id,
      
      username: order.user.email,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      items: order.items.map(item => ({
        title: item.product.title,
        quantity: item.quantity,
        price: item.price,
      })),
    }));
  }

}