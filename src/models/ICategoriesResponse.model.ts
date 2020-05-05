import { ICategory } from "./ICategory.model";
import { IResponseMultiple } from "./IResponseMultiple.model";

export interface ICategoriesResponse extends IResponseMultiple {
  data: {
    categories: ICategory[];
  };
}
