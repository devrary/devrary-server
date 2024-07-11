import { ICategory } from "@/interface/category";
import { ContentType } from "@/types/content";
import { Reference } from "@/types/reference";

export type SavedPost = {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  category: ICategory[];
  type: ContentType;
  reference: Reference[] | null
}