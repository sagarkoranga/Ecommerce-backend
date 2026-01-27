import { Body, Controller, Post } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-adress.dto';

@Controller('address')
export class AddressController {
    constructor (private readonly addressService:AddressService){}

     @Post()
  create(@Body() dto: CreateAddressDto) {
    return this.addressService.create(dto);
  }
}
