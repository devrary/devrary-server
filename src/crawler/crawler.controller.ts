import { Body, Controller, Post } from '@nestjs/common';
import { CrawlerService } from '@/crawler/crawler.service';
import { CrawlSingleUrlDto } from '@/crawler/crawler.dto';
import { FirebaseService } from '@/firebase/firebase.service';

@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService, private readonly firebaseService: FirebaseService) {}

  @Post('single-url')
  async crawlSignleUrl(@Body() data: CrawlSingleUrlDto) {
    return await this.crawlerService.crawlUrl(data);
  }

  @Post('multi-urls')
  async crawlMultiUrl() {
    const crawlList = await this.firebaseService.getUrls().then((urls) => {
      return urls.map((url) => url.data().url);
    })

    this.crawlerService.crawlUrlList(crawlList);
  }
}
