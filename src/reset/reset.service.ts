import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ResetService {
  constructor(private prisma: PrismaService) { }

  async forgotPassword(username: string) {
    const admin = await this.prisma.admin.findUnique({ where: { username } });
    if (!admin) throw new Error('Admin not found');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await this.prisma.password.deleteMany({ where: { username } });

    await this.prisma.password.create({
      data: {
        username,
        otp: hashedOtp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 mins
      },
    });


  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Ecommerce Support" <no-reply@yourdomain.com>',
    to: username,
    subject: 'Password Reset OTP',
    html: `
      <h2>Password Reset</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>Valid for 5 minutes</p>
    `,
  }); 

    return { message: 'OTP sent to email' };
  }
  async verifyOtp(username: string, otphash: string) {
    const record = await this.prisma.password.findFirst({
      where: { username },
      orderBy: { createdAt: 'desc' },
    });

    if (!record) throw new Error('OTP not found');
    if (record.expiresAt < new Date()) throw new Error('OTP expired');
    console.log("OTP from frontend:", otphash);
    console.log("OTP as string:", String(otphash));
    console.log("OTP length:", String(otphash).length);
    console.log("DB hash:", record.otp);

    const isValid = await bcrypt.compare(String(otphash), record.otp);
    console.log(">>>>", isValid)
    if (!isValid) throw new Error('Invalid OTP');

    const otpToken = randomUUID();

    await this.prisma.password.update({
      where: { id: record.id },
      data: { otpToken },
    });

    return { otpToken };
  }

  async resetPassword(
    username: string,
    otpToken: string,
    newPassword: string,
  ) {
    const record = await this.prisma.password.findFirst({
      where: {
        username,
        otpToken,
      },
    });

    if (!record) throw new Error('Unauthorized access');

    if (record.expiresAt < new Date())
      throw new Error('Session expired');

    const hashed = await bcrypt.hash(newPassword, 10);

    await this.prisma.admin.update({
      where: { username },
      data: { password: hashed },
    });


    await this.prisma.password.deleteMany({ where: { username } });

    return { message: 'Password reset successful' };
  }
}