import { IsNotEmpty } from "class-validator";

export class FirebaseCreateUrlDto {
  @IsNotEmpty()
  url: string;
}

export class FirebaseRemoveUrlDto {
  @IsNotEmpty()
  docId: string;
}

export class FirebaseGetUrlDto {
  @IsNotEmpty()
  docId: string;
}

export class FirebaseUpdateUrlDto {
  @IsNotEmpty()
  docId: string;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  activate: boolean;
}