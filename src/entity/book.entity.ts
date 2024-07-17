import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn({ name: 'book_id' })
  _id: string;

  @ApiProperty({ description: 'ISBN Code of the book' })
  @Column({ name: 'isbn' })
  isbn: string;

  @ApiProperty({ description: 'Title of the book' })
  @Column({ name: 'title' })
  title: string;

  @ApiProperty({ description: 'Description of the book' })
  @Column({ name: 'description' })
  description: string;

  @ApiProperty({ description: 'Publisher of the book' })
  @Column({ name: 'publisher' })
  publisher: string;

  @ApiProperty({ description: 'Author of the book' })
  @Column({ name: 'author' })
  author: string;

  @ApiProperty({ description: 'Image of the book' })
  @Column({ name: 'image' })
  image: string;

  @ApiProperty({ description: 'Version of the book' })
  @Column({ name: 'version' })
  version: number;

  @ApiProperty({ description: 'Created date of the book' })
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;
}