import { Category } from "./Category.model";
import { Subcategory } from "./Subcategory.model";

export interface CurrentCategoryAndSubcategoryResponse {
  status: string;
  data: {
    currentCategory: Category;
    currentSubcategory: Subcategory;
  };
}
