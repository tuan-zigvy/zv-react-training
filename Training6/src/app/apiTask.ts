import { IQueryTask, ITaskRes } from '../util/interface';
import taskService from './task_server';

async function fetchGetTasks(props: IQueryTask) {
  const response = await taskService.get<ITaskRes[]>('/task', { params: { ...props } });
  return response.data;
}

async function fetchCreateTask(name: string) {
  const response = await taskService.post<ITaskRes>('/task', { name });

  return response.data;
}
async function fetchCreateTasks(names: string[]) {
  const response = await Promise.all([
    ...names.map((name) => taskService.post<ITaskRes>('/task', { name })),
  ]);
  const result = response.map((value) => value.data);
  return result;
}

async function fetchUpdateTask(props: ITaskRes) {
  const response = await taskService.put(`/task/${props.id}`, { ...props });
  return response.data;
}

async function fetchDeleteTask(id: string) {
  const response = await taskService.delete(`/task/${id}`);
  return response.data;
}

export {
  fetchCreateTask,
  fetchGetTasks,
  fetchUpdateTask,
  fetchDeleteTask,
  fetchCreateTasks,
};
