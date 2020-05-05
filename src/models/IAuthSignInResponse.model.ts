import { IUser } from "./IUser.model";
import { IResponseSingle } from "./IResponseSingle.model";

export interface IAuthSignInResponse extends IResponseSingle {
  token: string;
  data: IUser;
}
