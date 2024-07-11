export type ContentType = 'book' | 'thesis' | 'code';

export type SavedContent = {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  type: ContentType;
}