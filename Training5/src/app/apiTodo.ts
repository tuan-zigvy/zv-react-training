import { IQueryTodo, ITodo, ITodoRes } from '../util/interface';
import todoService from './todo_server';

async function fetchGetTodos(props: IQueryTodo) {
  const response = await todoService.get<ITodoRes[]>('/todos', { params: { ...props } });
  return response.data;
}

async function fetchCreateTodo(name: string) {
  const response = await todoService.post<ITodoRes>('/todos', { name });

  return response.data;
}

async function fetchUpdateTodo(props: ITodoRes) {
  const response = await todoService.put(`/todos/${props.id}`, { ...props });
  return response.data;
}

async function fetchDeleteTodo(id: string) {
  const response = await todoService.delete(`/todos/${id}`);
  return response.data;
}

export { fetchCreateTodo, fetchGetTodos, fetchUpdateTodo, fetchDeleteTodo };
