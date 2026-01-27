import { IsEmail, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  username: string;

  otpToken: string;

  @MinLength(6)
  newPassword: string;
}