import { ISubcategory } from "./ISubcategory.model";

export interface ISubcategoriesResponse {
  status: string;
  results: number;
  data: {
    subcategories: ISubcategory[];
  };
}
