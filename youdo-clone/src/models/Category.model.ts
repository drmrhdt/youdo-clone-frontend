import { Subcategory } from "./Subcategory.model";

export interface Category {
  id: number;
  key: string;
  text: string;
  cities: string;
  hints: {
    description?: string;
  };
  subcategories: Subcategory[];
}
