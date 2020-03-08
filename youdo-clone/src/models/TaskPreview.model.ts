import { Category } from "./Category.model";

export interface TaskPreview {
  id: number;
  author: string;
  category: Category;
  price: number;
  paymentType: string;
  additionalCondition: [];
  reviews: {
    positive: number;
    negative: number;
  };
  executionTime: {
    startDate: number;
    startTime: number;
    endDate?: number;
    endTime?: number;
  };
  sdr: boolean;
  business: boolean;
  createDate: number;
}
