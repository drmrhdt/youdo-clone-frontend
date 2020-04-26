import { IUser } from "./IUser.model";

export interface IAuthSignInResponse {
  status: string;
  token: string;
  data: IUser;
}
