import { ITag } from '@/interface/tag';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UsersDocument = Post & mongoose.Document;

@Schema({ timestamps: true, versionKey: '_v' })
export class Post {
  @Prop({ type: String })
  _id: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  userId: string;

  @Prop()
  userName: string;

  @Prop()
  thumbnail: string;

  @Prop()
  contentId: string;

  @Prop()
  contentName: string;

  @Prop()
  contentImage: string;

  @Prop()
  categoryId: string;

  @Prop()
  categoryName: string;

  @Prop()
  tag: ITag[];

  @Prop()
  liked: number;

  @Prop()
  likedUser: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
