export interface Video {
  id: number;
  title: string;
  videoUrl: string;
  thumbnail?: string;
  categoryId: number;
}

export interface VideoCategory {
  id: number;
  name: string;
  description: string;
  image?: string;
}
