import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  /* ============== PUBLIC ============== */

  // Footer → active contact only
  @Get('active')
  getActiveContacts() {
    return this.contactService.findActive();
  }

  // Contact Us page → all contacts
  @Get()
  getAllContacts() {
    return this.contactService.findAll();
  }

  /* ============== ADMIN (CMS) ============== */

  @Post()
  createContact(
    @Body()
    body: {
      phone: string;
      email: string;
      address: string;
      latitude: number;
      longitude: number;
      status?: boolean;
    },
  ) {
    return this.contactService.create(body);
  }

  @Put(':id')
  updateContact(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      phone?: string;
      email?: string;
      address?: string;
      latitude?: number;
      longitude?: number;
      status?: boolean;
    },
  ) {
    return this.contactService.update(id, body);
  }

  @Patch(':id/status')
  toggleStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: boolean,
  ) {
    return this.contactService.toggleStatus(id, status);
  }

  @Delete(':id')
  deleteContact(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.delete(id);
  }
}