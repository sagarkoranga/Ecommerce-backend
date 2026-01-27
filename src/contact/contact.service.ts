import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  /* ================= PUBLIC ================= */

  // Footer → Only active contacts
  async findActive() {
    return this.prisma.contact.findMany({
      where: { status: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Contact Us page → All contacts
  async findAll() {
    return this.prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  /* ================= ADMIN ================= */

  async create(data: {
    phone: string;
    email: string;
    address: string;
    latitude: number;
    longitude: number;
    status?: boolean;
  }) {
    return this.prisma.contact.create({
      data: {
        phone: data.phone,
        email: data.email,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        status: data.status ?? true,
      },
    });
  }

  async update(
    id: number,
    data: {
      phone?: string;
      email?: string;
      address?: string;
      latitude?: number;
      longitude?: number;
      status?: boolean;
    },
  ) {
    const exists = await this.prisma.contact.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Contact not found');

    return this.prisma.contact.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    const exists = await this.prisma.contact.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Contact not found');

    return this.prisma.contact.delete({
      where: { id },
    });
  }

  async toggleStatus(id: number, status: boolean) {
    const exists = await this.prisma.contact.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Contact not found');

    return this.prisma.contact.update({
      where: { id },
      data: { status },
    });
  }
}