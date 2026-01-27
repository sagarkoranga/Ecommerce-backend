

import { Injectable } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService,
    private categoryService: CategoryService
  ) { }

  
  create(data: any) {
    return this.prisma.product.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        status: true,
        images: Array.isArray(data.images) ? data.images : [],
      },
    });
  }
  findAll() {
    return this.prisma.product.findMany({
      include: { category: true },
      orderBy: {
        id: 'asc',
      },
    });
  }


  async findByCategory(categoryId: number) {
    if (!categoryId || isNaN(categoryId)) {
      throw new Error("Invalid category ID");
    }
    const childIds = await this.categoryService.getAllChildCategoryIds(categoryId);

    const allCategoryIds = [categoryId, ...childIds];

    return this.prisma.product.findMany({
      where: {
        categoryId: { in: allCategoryIds },
        status: true,
      },
      include: { category: true },
    });
  }

  
  update(id: number, data: any) {
    const updateData: any = { ...data };

    if (data && data.images !== undefined) {
      updateData.images = Array.isArray(data.images)
        ? data.images
        : [data.images];
    }

    return this.prisma.product.update({
      where: { id },
      data: updateData,
    });
  }

  async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
    if (!files || files.length === 0) return [];

    
    return files.map(file => `/uploads/${file.filename}`);
  }
  async getProductById(id: number) {
    if (!id || isNaN(id)) {
      throw new Error("Invalid product id");
    }

    return this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

async searchProducts(query: string) {
  return this.prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } }
      ],
      status: true
    }
  });
}

  updatestatus(id: number, data: { status?: boolean }) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  bestSellers() {
    return this.prisma.product.findMany({
      where: { status: true },
      orderBy: { soldCount: 'desc' },
      take: 7,
      select: {
        id: true,
        title: true,
        price: true,
        images: true,
        soldCount: true,
      },
    });
  }
}