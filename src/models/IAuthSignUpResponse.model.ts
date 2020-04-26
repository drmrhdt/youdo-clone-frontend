import { IUser } from "./IUser.model";

export interface IAuthSignUpResponse {
  status: String;
  token: String;
  data: IUser;
}
