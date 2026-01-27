import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAddressDto } from './dto/create-adress.dto';

@Injectable()
export class AddressService {
    constructor (private Prisma:PrismaService){}

      create(dto: CreateAddressDto) {
    return this.Prisma.address.create({ data: dto });
  }
    
}
