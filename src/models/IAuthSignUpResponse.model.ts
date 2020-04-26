import { IUser } from "./IUser.model";

export interface IAuthSignUpResponse {
  status: string;
  token: string;
  data: IUser;
}
