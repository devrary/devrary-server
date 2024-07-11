import { AuthType } from '@/types/auth';
import { SavedContent } from '@/types/content';
import { TagType } from '@/types/tag';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UsersDocument = User & mongoose.Document;

@Schema({ timestamps: true, versionKey: '_v' })
export class User {
  @Prop({ type: String })
  _id: string;

  @Prop()
  username: string;

  @Prop()
  bio: string;

  @Prop()
  favorite: TagType[];

  @Prop()
  interestTag: string[];

  @Prop()
  interestContent: SavedContent[];

  @Prop()
  markedContent: SavedContent[];

  @Prop()
  markedPost: string[];

  @Prop()
  likedPost: string[];

  @Prop()
  authType: AuthType;

  @Prop()
  postCount: number;

  @Prop()
  bookCount: number;

  @Prop()
  thesisCount: number;

  @Prop()
  codeCount: number;

  @Prop()
  follower: number;

  @Prop()
  following: number;

  @Prop()
  rate: number;

  @Prop()
  profileUrl: string;

  @Prop()
  refreshToken: string;

  @Prop()
  links: string[];
}

export const UsersSchema = SchemaFactory.createForClass(User);
