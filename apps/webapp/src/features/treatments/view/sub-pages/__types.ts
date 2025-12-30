// Rating types
export interface Rating {
  id: string;
  rate: number;
  remark: string | null;
  createdAt: Date;
}

export interface RatingSummary {
  totalCount: number;
  averageRating: number;
  distribution: { rate: number; count: number }[];
}

// Review types
export interface ReviewImage {
  id: string;
  url: string;
  name: string;
  thumb: string | null;
}

export interface Review {
  id: string;
  description: string;
  createdAt: Date;
  images: ReviewImage[];
}
