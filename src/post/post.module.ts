import { Module } from '@nestjs/common';
import { PostService } from '@/post/post.service';
import { PostController } from '@/post/post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from '@/schema/post.schema';
import { LogSchema } from '@/schema/log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'Log', schema: LogSchema }
    ])
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
