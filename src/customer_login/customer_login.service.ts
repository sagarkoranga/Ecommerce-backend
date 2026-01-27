

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { createSecretKey } from 'crypto';
import * as jwt from "jsonwebtoken";

@Injectable()
export class CustomerLoginService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }


  async register(dto: {
    email: string;
    password: string;
    image: string;
    city: string;
    mobile_no: string;
  }) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.customer_login.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        image: dto.image, 
        city: dto.city,
        mobile_no: dto.mobile_no,
      },
    });

    return {
      message: 'User registered successfully',
      userId: user.id,
      image: user.image,
    };
  }

  
  async login(dto: LoginDto) {
    const user = await this.prisma.customer_login.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      return { message: 'User not found' };
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.password,
    );

    if (!isPasswordValid) {
      return { message: 'Invalid credentials' };
    }

const payload = {
  id: user.id,
  email: user.email,
};

const Token = jwt.sign(
  payload,
  "SECRET_KEY",
  { expiresIn: "1d" }
);
    return {
      message: 'Login successful',
      Token,
      user: {
        id: user.id,
        email: user.email,
        city: user.city,
        image: user.image,
      },
    };
  }
}