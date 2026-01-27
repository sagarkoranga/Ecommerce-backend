import { Module } from '@nestjs/common';
import { BannerController } from './banner.controller';
import { PrismaService } from '../prisma/prisma.service';
import { BannerService } from './banner.service';

@Module({
    controllers:[BannerController],
    providers:[PrismaService,BannerService]
})
export class BannerModule {
    
}
