import { Module } from '@nestjs/common';
import { ResetController } from './reset.controller';
import { ResetService } from './reset.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    providers:[PrismaService,ResetService],
    controllers:[ResetController]
})
export class ResetModule {}
