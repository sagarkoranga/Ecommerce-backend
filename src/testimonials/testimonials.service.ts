import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class TestimonialsService {
  constructor(private prisma: PrismaService) {}

  create(body: any, file: Express.Multer.File) {
    return this.prisma.testimonials.create({
      data: {
        name: body.name,
        message: body.message,
        image: `/uploads/testimonials/${file.filename}`,
        status: body.status === 'true' || body.status === true,
      },
    });
  }

  findPublic() {
    return this.prisma.testimonials.findMany({
      where: { status: true },
      orderBy: { id: 'desc' },
    });
  }

  findAllAdmin() {
    return this.prisma.testimonials.findMany({
      orderBy: { id: 'desc' },
    });
  }

  update(id: number, body: any, file?: Express.Multer.File) {
    return this.prisma.testimonials.update({
      where: { id },
      data: {
        name: body.name,
        message:body.message,
        status: body.status === 'true' || body.status === true,
        ...(file && { image: `/uploads/testimonials/${file.filename}` }),
      },
    });
  }

    toggleStatus(id: number, status: boolean) {
    return this.prisma.testimonials.update({
      where: { id },
      data: { status },
    });
  }

  remove(id: number) {
    return this.prisma.testimonials.delete({ where: { id } });
  }
}
