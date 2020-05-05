import { IResponseSingle } from "./IResponseSingle.model";
import { IAuthSignInResponse } from "./IAuthSignInResponse.model";

export interface IAuthSignUpResponse
  extends IResponseSingle,
    IAuthSignInResponse {}
