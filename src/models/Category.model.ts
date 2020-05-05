import { Subcategory } from "./Subcategory.model";

export interface Category {
  _id: number;
  key?: string;
  text: string;
  cities: string;
  hints: {
    description?: string;
  };
  subcategories: Subcategory[];
}
