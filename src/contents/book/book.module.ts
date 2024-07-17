import { Module } from '@nestjs/common';
import { BookService } from '@/contents/book/book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '@/entity/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookService],
})
export class BookModule {}
