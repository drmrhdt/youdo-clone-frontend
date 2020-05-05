import { ICategory } from "./ICategory.model";

export interface ICategoriesResponse {
  status: string;
  results: number;
  data: {
    categories: ICategory[];
  };
}
