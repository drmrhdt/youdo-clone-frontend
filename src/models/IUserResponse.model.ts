import { IUser } from "./IUser.model";
import { IResponseSingle } from "./IResponseSingle.model";

export interface IUserResponse extends IResponseSingle {
  data: {
    currentUser?: IUser;
    findedByIdUser?: IUser;
  };
}
