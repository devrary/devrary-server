import { Body, Controller, Delete, Post, Put, Get } from '@nestjs/common';
import { FirebaseService } from '@/firebase/firebase.service';
import { FirebaseCreateUrlDto, FirebaseGetUrlDto, FirebaseRemoveUrlDto, FirebaseUpdateUrlDto } from '@/firebase/firebase.dto';

@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}
  @Post('create-url')
  async createUrl(@Body() data: FirebaseCreateUrlDto) {
    return await this.firebaseService.create(data);
  }

  @Delete('remove-url')
  async removeUrl(@Body() data: FirebaseRemoveUrlDto) {
    return await this.firebaseService.remove(data);
  }

  @Put('update-url')
  async updateUrl(@Body() data: FirebaseUpdateUrlDto) {
    return await this.firebaseService.update(data);
  }

  @Post('get-url')
  async getUrl(@Body() data: FirebaseGetUrlDto) {
    return await this.firebaseService.getUrl(data);
  }

  @Get('get-urls')
  async getUrls() {
    return await this.firebaseService.getUrls();
  }
}