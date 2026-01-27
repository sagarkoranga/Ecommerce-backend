import { Module } from '@nestjs/common';
import { AdminService } from './auth.service';
import { AdminController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
    JwtModule.register({
      secret: 'ADMIN_SECRET_KEY',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService,PrismaService],
  exports:[JwtModule]
})
export class AuthModule {}
