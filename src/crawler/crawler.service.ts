import { Injectable } from '@nestjs/common';
import { spawnSync } from 'child_process';
import { CrawlSingleUrlDto } from '@/crawler/crawler.dto';

@Injectable()
export class CrawlerService {
  async crawlUrl(data: CrawlSingleUrlDto) {
    const { url } = data;
    const crawlerProcess = await spawnSync('python3', ['module/crawler/main.py', url]);
    let response: string;

    if (crawlerProcess.stderr && crawlerProcess.stderr.length !== 0) {
      response = crawlerProcess.stderr.toString();
    } else {
      response = crawlerProcess.stdout.toString();
    }

    console.log("crawl response: ", response)
    return response;
  }

  
  async crawlUrlList(urlList: string[]) {
    const crawlerProcess = await spawnSync('python3', ['module/crawler/main.py', ...urlList]);
  
    let response: string[] = [];

    if (crawlerProcess.stderr && crawlerProcess.stderr.length !== 0) {
      console.log(crawlerProcess.stderr.toString());
    } else {
      response.push(crawlerProcess.stdout.toString());
      console.log(crawlerProcess.stdout.toString());
    }
    
    return response;
  }
}

