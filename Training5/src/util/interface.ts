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

export interface ITodo {
  name: string;
  completed: boolean;
}
export interface IQueryTodo {
  name?: string;
  completed?: boolean;
}

export interface ITodoRes {
  id: string;
  name: string;
  completed: boolean;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IResponse<T> {
  data: T;
}

export interface JwtPayloadUser extends JwtPayload, IUserRes {}
