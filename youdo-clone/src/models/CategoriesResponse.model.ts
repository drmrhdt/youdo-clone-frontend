import { Category } from "./Category.model";

export interface CategoriesResponse {
  status: string;
  results: number;
  data: {
    categories: Category[];
  };
}
