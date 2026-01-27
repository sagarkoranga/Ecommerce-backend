
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @IsEmail()
  name: string;

  @IsString()
  @IsNotEmpty()
  mobile_no: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}