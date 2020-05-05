import { ICategory } from "./ICategory.model";
import { ISubcategory } from "./ISubcategory.model";

export interface ICurrentCategoryAndSubcategoryResponse {
  status: string;
  data: {
    currentCategory: ICategory;
    currentSubcategory: ISubcategory;
  };
}
