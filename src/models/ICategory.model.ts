import { ISubcategory } from "./ISubcategory.model";

export interface ICategory {
  _id: number;
  key?: string;
  text: string;
  cities: string;
  hints: {
    description?: string;
  };
  subcategories: ISubcategory[];
}
