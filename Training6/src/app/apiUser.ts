import { ILogin, IUserRes } from '../util/interface';
import userService from './user_server';

interface IResponseLogin {
  token: string;
}
interface IResponseLogin {
  users: IUserRes[];
}

async function fetchLogin(props: ILogin) {
  const response = await userService.post<IResponseLogin>('/login', {
    ...props,
  });

  return response.data.token;
}

async function fetchGetMe(id: string) {
  const response = await userService.get<IUserRes>(`api/users/${id}`);
  return response.data;
}

async function fetchGetUsers() {
  const response = await userService.get<IResponseLogin>('api/users');
  return response.data.users;
}

export { fetchGetMe, fetchLogin, fetchGetUsers };
