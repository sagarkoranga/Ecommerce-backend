


import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async createAdmin(dto: CreateAdminDto) {
    const hashed = await bcrypt.hash(dto.password, 10);

    return this.prisma.admin.create({
      data: {
        username: dto.username,
        password: hashed,
      },
    });
  }

  async login(dto: LoginDto) {

    
    const admin = await this.prisma.admin.findUnique({
      where: { username: dto.username },
    });
    
     
    

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

  const match = await bcrypt.compare(dto.password, admin.password);
    console.log('PASSWORD MATCH:', match);
    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwt.sign({
      id: admin.id,
      username: admin.username,
      isAdmin:true,
    });

    return { token };
  }

  findAllAdmins() {
    return this.prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    });
  }

  deleteAdmin(id: number) {
    return this.prisma.admin.delete({
      where: { id },
    });
  }
}