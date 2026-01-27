import { IsEmail, IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';

export class UpdateContactDto {
  
  @IsString()
  phone?: string;

  
  @IsEmail()
  email?: string;

  
  @IsString()
  address?: string;

  
  @IsNumber()
  latitude?: number;

  
  @IsNumber()
  longitude?: number;

  
  @IsBoolean()
  status?: boolean;
}