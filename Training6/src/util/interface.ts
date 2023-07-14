import { JwtPayload } from 'jwt-decode';

export interface IUser {
  fullName: string;
  email: string;
  password: string;
}

export interface IUserRes extends IUser {
  id: string;
  role: 'User' | 'Admin';
}

export interface ITask {
  name: string;
  status: boolean;
}
export interface IQueryTask {
  name?: string;
  status?: boolean;
}

export interface ITaskRes extends ITask {
  id: string;
}

export interface ITaskPending {
  name: string;
  status: 'Draft' | 'Ready';
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IResponse<T> {
  data: T;
}

export interface ITaskUpdateError {
  id: string;
  errorMessage: string;
}

export interface JwtPayloadUser extends JwtPayload, IUserRes {}
