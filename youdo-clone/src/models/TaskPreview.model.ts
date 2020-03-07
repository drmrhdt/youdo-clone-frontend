export interface TaskPreview {
  id: number;
  author: string;
  category: {
    title_en: string;
    title_ru: string;
  };
  price: number;
  reviews: {
    positive: number;
    negative: number;
  };
  sdr: boolean;
  business: boolean;
}
