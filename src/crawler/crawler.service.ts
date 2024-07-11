import { Injectable } from '@nestjs/common';
import { spawnSync } from 'child_process';

@Injectable()
export class CrawlerService {
  async crawlUrl(url: string) {
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
  }
}

