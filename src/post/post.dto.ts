import { ICategory } from '@/interface/category';
import { ITag } from '@/interface/tag';
import { Reference } from '@/types/reference';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/swagger'

export class CreatePostDto {
  
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(32)
  title: string;

  @IsOptional()
  subTitle: string;

  @IsOptional()
  tags: ITag[];
  
  @IsNotEmpty()
  category: ICategory;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  thumbnail: string;

  @IsOptional()
  reference: Reference[];
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}

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

  @IsString()
  tagId: string;
}
