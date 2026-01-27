import { IsEmail, IsString, Length } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  username: string;

  @Length(6, 6)
  otp: string;
}