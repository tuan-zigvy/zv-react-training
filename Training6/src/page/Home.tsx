import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { taskAction } from '../reducer/task/taskSlice';
import { shallowEqual } from 'react-redux';
import TaskTemplate from '../components/TaskTemplate';
import Search from '../components/Search';
import TaskList from '../components/Task';

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  rowGap: 12,
};

function HomePage() {
  const [valueCreateTask, setValueCreateTask] = React.useState<string>('');

  const { tasks, tasksPending } = useAppSelector((state) => state.task, shallowEqual);
  const statusNetWork = useAppSelector(
    (state) => state.network.statusNetWork,
    shallowEqual
  );

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    statusNetWork && dispatch(taskAction.getTasksPending());
  }, [statusNetWork]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tasksName = tasksPending.map((e) => e.name);
    if (valueCreateTask && !tasksName.includes(valueCreateTask))
      dispatch(taskAction.createTemplateTaskDraft(valueCreateTask));
    setValueCreateTask('');
  };

  const handleChangeValueCreate = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValueCreateTask(e.target.value);

  React.useEffect(() => {
    if (statusNetWork) {
      const taskReady = tasksPending.filter((task) => task.status === 'Ready');
      if (taskReady.length > 0)
        dispatch(taskAction.createTasksPending(taskReady.map((task) => task.name)));
    }

    if (!statusNetWork) {
      dispatch(taskAction.deleteTasksIsOffline());
    }
  }, [statusNetWork]);

  return (
    <div style={style}>
      <Search statusNetWork={statusNetWork} />
      <TaskTemplate />
      <TaskList tasks={tasks} />

      <form onSubmit={handleSubmit}>
        <input
          placeholder='input task'
          value={valueCreateTask}
          onChange={handleChangeValueCreate}
        />
      </form>
    </div>
  );
}

export default HomePage;
