import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TagDocument = Tag & mongoose.Document;

@Schema({ timestamps: true, versionKey: '_v' })
export class Tag {
  @Prop({ type: String })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  count: number;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
