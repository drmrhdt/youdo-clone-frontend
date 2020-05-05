import { IResponseSingle } from "./IResponseSingle.model";

export interface IResponseMultiple extends IResponseSingle {
  results: number;
}
