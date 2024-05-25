import { AuthType } from "@/types/auth";
import { TagType } from "@/types/tag";

export class CreateUserDto {
  userId: string;
  username: string;
  bio: string;
  favorite: TagType[];
  authType: AuthType;
  profileUrl: string;
  links: string[]
}

export class GetUserDto {
  userId: string;
}

export class LoginUserDto {
  userId: string;
}