import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(
      createMessageDto.userId,
      createMessageDto.content,
    );
  }

  @Get()
  async getMessages() {
    return this.messagesService.findAll();
  }
}
