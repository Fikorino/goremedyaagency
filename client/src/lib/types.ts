export type Service = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  weight: number;
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
};

export type Logo = {
  id: string;
  name: string;
  imageUrl: string;
  order: number;
  active: boolean;
};

export type Portfolio = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  tags: string[];
  coverUrl: string;
  media: { type: "image" | "video"; url: string }[];
  date: string;
  results?: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverUrl: string;
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
  createdAt: string;
};

export type Lead = {
  id: string;
  name: string;
  company?: string;
  phone: string;
  email: string;
  note?: string;
  summary: string;
  minPrice: number;
  maxPrice: number;
  recommendedPrice: number;
  createdAt: string;
};

export type Settings = {
  id: string;
  siteName: string;
  logoUrl: string;
  faviconUrl: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    facebook?: string;
  };
  googleAnalyticsId?: string;
  enableAnimations: boolean;
  enable3d: boolean;
};
