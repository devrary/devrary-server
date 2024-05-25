import * as mongoose from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

export type CommentDocument = Comment & mongoose.Document;

@Schema({ timestamps: true, versionKey: '_v' })
export class Comment {
  @Prop({ type: String })
  _id: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  postId: string;

  @Prop()
  userName: string;

  @Prop()
  bookName: string;

  @Prop()
  userId: string;

  @Prop()
  referenceId: string;

  @Prop()
  upvote: number;

  @Prop()
  downvote: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
