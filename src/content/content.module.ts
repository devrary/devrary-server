import { Module } from '@nestjs/common';
import { ContentService } from '@/content/content.service';
import { ContentController } from '@/content/content.controller';

@Module({
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
