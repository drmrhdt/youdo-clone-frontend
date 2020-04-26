import { IUser } from "./IUser.model";

export interface IAuthSignInResponse {
  status: String;
  token: String;
  data: IUser;
}
