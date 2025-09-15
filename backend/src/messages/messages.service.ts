import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, content: string) {
    return this.prisma.message.create({
      data: { content, userId },
    });
  }

  async findAll() {
    return this.prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    });
  }
}
