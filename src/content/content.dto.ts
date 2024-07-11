import { IsNotEmpty, IsString } from 'class-validator';

export class ContentRequestDto {
  @IsNotEmpty()
  @IsString()
  contentId: string;
}
