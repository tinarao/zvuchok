import { type User } from "./user";

export type Sample = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  durationMs?: number;
  peaks?: number[];
  sampleFilePath: string;
  updateMetadataToken: string;
  tags: string[];
  genres: string[];
  downloads: number;
  likes: number;
  isFeatured: boolean;
  isOnSale: boolean;
  isFree: boolean;

  samplePack?: SamplePack;
  samplePackId: number;
  author?: User;
  authorId: number;

  createdAt: string;
};

export type SamplePack = {
  id: number;
  name: string;
  slug: string;
  description: string;
  samples: Sample[];
  artworkPath?: string;
  author: User;
  likes: number;
  createdAt: string;
  authorId: number;
};
