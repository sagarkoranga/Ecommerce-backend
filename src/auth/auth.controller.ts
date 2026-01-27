

import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { AdminService } from "./auth.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { LoginDto } from "./dto/login.dto";




@Controller('admin')
export class AdminController {
  constructor(private service: AdminService) {}

  @Post('create')
  create(@Body() dto: CreateAdminDto) {
    return this.service.createAdmin(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.service.login(dto);
  }

  @Get()
  getAll() {
    return this.service.findAllAdmins();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.deleteAdmin(+id);
  }
}