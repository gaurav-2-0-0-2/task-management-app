export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  message: string;
  token: string;
  user: Pick<IUser, 'id' | 'name'>
}

export interface ISignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface ISignupResponse {
  message: string;
  user: IUser;
}
