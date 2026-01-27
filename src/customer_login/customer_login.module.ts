// import { Module } from '@nestjs/common';

// @Module({
//     im
// })
// export class CustomerLoginModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service';
import { CustomerLoginController } from './customer_login.controller';
import { CustomerLoginService } from './customer_login.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [CustomerLoginService, PrismaService,JwtStrategy],
  controllers: [CustomerLoginController],
  exports:[PassportModule,JwtModule]
})
export class CustomerLoginModule {}