import { IUser } from "./IUser.model";
import { IResponseMultiple } from "./IResponseMultiple.model";

export interface IUsersResponse extends IResponseMultiple {
  data: {
    users: IUser[];
  };
}
