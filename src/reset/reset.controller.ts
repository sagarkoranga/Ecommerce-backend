import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ResetService } from './reset.service';

import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Createotpdto } from './dto/create-otp.dto';

@Controller('reset')
export class ResetController {
  constructor(private readonly resetService: ResetService) {}


  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() dto: Createotpdto) {
    return this.resetService.forgotPassword(dto.username);
  }

  
  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.resetService.verifyOtp(dto.username, dto.otp);
  }


   
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.resetService.resetPassword(
      dto.username,
      dto.otpToken,
      dto.newPassword,
    );
  }
}