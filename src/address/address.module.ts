import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';

@Module({
    providers:[PrismaService,AddressService],
    controllers:[AddressController]
})
export class AddressModule {}
