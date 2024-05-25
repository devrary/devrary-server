import { IsNotEmpty, IsString } from 'class-validator';

export class PostRequestDto {
  @IsNotEmpty()
  @IsString()
  postId: string;
}

export class PostsRequestTypeDto {
  @IsString()
  contentId: string;

  @IsString()
  postType: string;

  @IsString()
  userId: string;
}
