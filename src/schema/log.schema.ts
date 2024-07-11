import { ITag } from "@/interface/tag";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

export type LogDocument = Log & mongoose.Document;

@Schema({ timestamps: true, versionKey: '_v' })
export class Log {
  @Prop({ type: String })
  _id: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  subTitle: string;

  @Prop()
  description: string;

  @Prop()
  thumbnail: string;

  @Prop()
  tag: ITag[];

  @Prop()
  categoryId: string;

  @Prop()
  linked: number;

  @Prop()
  linkedUser: string[];

  @Prop()
  updatedAt: Date;

  @Prop()
  createdAt: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);