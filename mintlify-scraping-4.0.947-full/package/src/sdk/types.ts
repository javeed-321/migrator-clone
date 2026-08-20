import type { SdkFormat } from '@mintlify/validation';

export type { SdkFormat };

export type SdkPage = {
  slug: string;
  title: string;
  description?: string;
  tag?: string;
  icon?: string;
  content: string;
};

export type SdkNavGroup = {
  group: string;
  pages: string[];
};

export type SdkReference = {
  pages: SdkPage[];
  groups: SdkNavGroup[];
};

export type SdkConverter = (sourcePath: string) => Promise<SdkReference>;
