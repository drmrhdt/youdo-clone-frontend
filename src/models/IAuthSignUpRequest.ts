export interface IAuthSignUpRequest {
  personalInfo: {
    firstName: String;
    lastName: String;
  };
  contacts: {
    email: String;
  };
  password: String;
  passwordConfirm: String;
}
