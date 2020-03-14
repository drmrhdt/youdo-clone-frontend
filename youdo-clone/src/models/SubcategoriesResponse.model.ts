import { Subcategory } from "./Subcategory.model";

export interface SubcategoriesResponse {
  status: string;
  results: number;
  data: {
    subcategories: Subcategory[];
  };
}
