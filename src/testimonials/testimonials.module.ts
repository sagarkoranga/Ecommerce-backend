import { Module } from '@nestjs/common';
import { TestimonialsController } from './testimonials.controller';
import { PrismaService } from '../prisma/prisma.service';
import { TestimonialsService } from './testimonials.service';

@Module({
    controllers:[TestimonialsController],
        providers:[PrismaService,TestimonialsService]
})
export class TestimonialsModule {}
