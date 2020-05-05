import { IUser } from "./IUser.model";

export interface IUserResponse {
  status: string;
  data: {
    currentUser?: IUser;
    findedByIdUser?: IUser;
  };
}
