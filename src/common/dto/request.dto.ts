import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PagenationReqDto {
  @Transform((Param) => Number(Param.value))
  @IsInt()
  page?: number = 1;

  @Transform((Param) => Number(Param.value))
  @IsInt()
  pageSize?: number = 10;
}
