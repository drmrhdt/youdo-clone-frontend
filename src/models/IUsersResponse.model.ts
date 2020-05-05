import { IUser } from "./IUser.model";

export interface IUsersResponse {
  status: string;
  results: number;
  data: {
    users: IUser[];
  };
}
