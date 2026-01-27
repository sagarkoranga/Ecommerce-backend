import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

export type CategoryNode = {
  id: number;
  name: string;
  parentId: number | null;
  children: CategoryNode[];
};

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

create(name: string, parentId?: string) {
  return this.prisma.category.create({
    data: {
      name,
      parentId: parentId ? Number(parentId) : null, // convert string to int or null
    },
  });
}

async getAllChildCategoryIds(parentId: number): Promise<number[]> {
  const categories = await this.prisma.category.findMany({
    where: { parentId },
    select: { id: true },
  });

  let ids = categories.map(c => c.id);

  for (const cat of categories) {
    const childIds = await this.getAllChildCategoryIds(cat.id);
    ids = [...ids, ...childIds];
  }

  return ids;
}

async findAllTree(): Promise<CategoryNode[]> {
  const categories = await this.prisma.category.findMany();
  return this.buildTree(categories);
}

private buildTree(categories: any[]): CategoryNode[] {
  const map = new Map<number, CategoryNode>();
  const roots: CategoryNode[] = [];

  categories.forEach((cat: any) => {
    map.set(cat.id, { ...cat, children: [] });
  });

  categories.forEach((cat: any) => {
    const node = map.get(cat.id)!;

    if (cat.parentId) {
      map.get(cat.parentId)?.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}
  async getProductsByCategory(categoryId: number) {
  const childCategories = await this.prisma.category.findMany({
    where: { parentId: categoryId },
    select: { id: true },
  });

  const ids = [categoryId, ...childCategories.map(c => c.id)];

  return this.prisma.product.findMany({
    where: {
      categoryId: { in: ids },
      status: true,
    },
  });
}


  update(id: number, name: string,parentId:number,) {
    return this.prisma.category.update({
      where: { id },
      data: { name ,parentId},
    });
  }

  
  async remove(id: number) {
    // const hasChildren = await this.prisma.category.findMany({
    //   where: { parentId: id },
    // });

    // if (hasChildren) {
    //   throw new BadRequestException('Delete subcategories first');
    // }

    return this.prisma.category.delete({ where: { id } });
  }
}