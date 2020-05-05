import { ISubcategory } from "./ISubcategory.model";
import { IResponseMultiple } from "./IResponseMultiple.model";

export interface ISubcategoriesResponse extends IResponseMultiple {
  data: {
    subcategories: ISubcategory[];
  };
}
