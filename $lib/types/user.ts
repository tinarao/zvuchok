import { SamplePack, Sample } from "./samples";

export type User = {
  id: number;
  username: string;
  slug: string;
  credits: number;
  bio?: string;
  avatarPath?: string;
  createdSamplePacks: SamplePack[];
  createdSamples: Sample[];
  favoriteSamplePacks: SamplePack[];
  favoriteSamples: Sample[];

  createdAt: string;
};
