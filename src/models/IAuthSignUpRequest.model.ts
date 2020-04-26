export interface IAuthSignUpRequest {
  personalInfo: {
    firstName: string;
    lastName: string;
  };
  contacts: {
    email: string;
  };
  password: string;
  passwordConfirm: string;
}
