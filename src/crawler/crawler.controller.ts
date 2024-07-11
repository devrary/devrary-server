import { Body, Controller, Post } from '@nestjs/common';
import { CrawlerService } from '@/crawler/crawler.service';

@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Post('single-url')
  async crawlSignleUrl(@Body() data: string) {
    return await this.crawlerService.crawlUrl(data);
  }
}
