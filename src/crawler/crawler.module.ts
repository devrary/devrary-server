import { Module } from '@nestjs/common';
import { CrawlerService } from '@/crawler/crawler.service';
import { CrawlerController } from '@/crawler/crawler.controller';
import { FirebaseModule } from '@/firebase/firebase.module';

@Module({
  imports: [
    FirebaseModule
  ],
  providers: [CrawlerService, FirebaseModule],
  controllers: [CrawlerController]
})
export class CrawlerModule {}
