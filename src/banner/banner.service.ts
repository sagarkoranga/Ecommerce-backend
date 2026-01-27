import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class BannerService {
  constructor(private prisma: PrismaService) {}

  create(body: any, file: Express.Multer.File) {
    return this.prisma.banners.create({
      data: {
        title: body.title,
        image: `/uploads/banners/${file.filename}`,
        status: body.status === 'true' || body.status === true,
      },
    });
  }

  findPublic() {
    return this.prisma.banners.findMany({
      where: { status: true },
      orderBy: { id: 'desc' },
    });
  }

  findAllAdmin() {
    return this.prisma.banners.findMany({
      orderBy: { id: 'desc' },
    });
  }

  update(id: number, body: any, file?: Express.Multer.File) {
    return this.prisma.banners.update({
      where: { id },
      data: {
        title: body.title,
        status: body.status === 'true' || body.status === true,
        ...(file && { image: `/uploads/banners/${file.filename}` }),
      },
    });
  }

    toggleStatus(id: number, status: boolean) {
    return this.prisma.banners.update({
      where: { id },
      data: { status },
    });
  }

  remove(id: number) {
    return this.prisma.banners.delete({ where: { id } });
  }
}
