import { ContentType } from '@/types/content';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ContentDocument = Content & mongoose.Document;

@Schema({ timestamps: true, versionKey: '_v' })
export class Content {
  @Prop({ type: String })
  _id: string;

  @Prop()
  usedCount: number;

  @Prop()
  upvote: number;

  @Prop()
  downvote: number;

  @Prop()
  type: ContentType;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  isbn: string;

  @Prop()
  publisher: string;

  @Prop()
  author: string;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
