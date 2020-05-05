import { ICategory } from "./ICategory.model";
import { ISubcategory } from "./ISubcategory.model";
import { IResponseSingle } from "./IResponseSingle.model";

export interface ICurrentCategoryAndSubcategoryResponse
  extends IResponseSingle {
  data: {
    currentCategory: ICategory;
    currentSubcategory: ISubcategory;
  };
}
