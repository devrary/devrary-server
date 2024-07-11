import { PagenationReqDto } from '@/common/dto/request.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreatePostDto, PostsRequestTypeDto, UpdatePostDto } from '@/post/post.dto';
import { User } from '@/common/decorator/user.decorator';
import { IUser } from '@/interface/user';

@Controller('post')
export class PostController {
  @Get('posts')
  getPosts(
    @Query() { page, pageSize }: PagenationReqDto,
    @Query() { postType, contentId, userId }: PostsRequestTypeDto,
    @User() user: IUser,
  ) {
    return 'getPosts';
  }

  @Get(':id')
  getSinglePost(@Param('id') id: string) {
    return `getSinglePost by ${id}`;
  }

  @Post()
  createPost(@Body() data: CreatePostDto) {
    return 'create';
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() data: UpdatePostDto) {
    return `updatePost by ${id}`;
  }

  @Delete(':id')
  removePost(@Param('id') id: string) {
    return `removePost by ${id}`;
  }
}
