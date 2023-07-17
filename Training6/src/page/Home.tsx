import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { taskAction } from '../reducer/task/taskSlice';
import { MdClose } from 'react-icons/md';
import { debounce } from '../util/utils';
import { shallowEqual } from 'react-redux';

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  rowGap: 12,
};

function HomePage() {
  const [valueCreateTask, setValueCreateTask] = React.useState<string>('');
  const [isOnline, setIsOnline] = React.useState<boolean>(Boolean(navigator.onLine));
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const { tasks, tasksPending } = useAppSelector((state) => state.task, shallowEqual);
  const statusNetWork = useAppSelector(
    (state) => state.network.statusNetWork,
    shallowEqual
  );

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    statusNetWork && dispatch(taskAction.getTasksPending());
  }, [statusNetWork]);

  const handelUpdateStatus = (i: number) => {
    dispatch(taskAction.updateTaskPending({ ...tasks[i], status: true }));
  };

  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tasksName = tasksPending.map((e) => e.name);
    if (valueCreateTask && !tasksName.includes(valueCreateTask))
      dispatch(taskAction.createTemplateTaskDraft(valueCreateTask));
    setValueCreateTask('');
  };

  function handelSearchName(e: React.ChangeEvent<HTMLInputElement>) {
    statusNetWork && dispatch(taskAction.getTasksPending({ name: e.target.value }));
  }

  function handelSearchSuccess() {
    setIsSuccess(!isSuccess);
    statusNetWork && dispatch(taskAction.getTasksPending({ status: !isSuccess }));
  }

  const tDebounce = debounce(handelSearchName, 600);

  const handelReady = (index: number | null) => {
    if (typeof index === 'number') {
      dispatch(taskAction.updateTemplateTasksDraft([tasksPending[index]]));
      statusNetWork &&
        dispatch(taskAction.createTasksPending([tasksPending[index].name]));
    } else {
      const taskDraft = tasksPending.filter((task) => task.status === 'Draft');
      dispatch(taskAction.updateTemplateTasksDraft(taskDraft));
      statusNetWork &&
        dispatch(taskAction.createTasksPending(taskDraft.map((task) => task.name)));
    }
  };

  React.useEffect(() => {
    if (statusNetWork) {
      setIsOnline(true);
      const taskReady = tasksPending.filter((task) => task.status === 'Ready');
      if (taskReady.length > 0)
        dispatch(taskAction.createTasksPending(taskReady.map((task) => task.name)));
    }

    if (!statusNetWork) {
      setIsOnline(false);
      dispatch(taskAction.deleteTasksIsOffline());
    }
  }, [statusNetWork]);

  return (
    <div style={style}>
      <p>{statusNetWork ? 'Online' : 'Offline'}</p>
      <div>
        {tasksPending.length > 0 &&
          tasksPending.map((task, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'row', columnGap: 10 }}>
              <p>name :{task.name}</p>
              <p>status :{task.status}</p>
              {task.status === 'Draft' && (
                <button
                  style={{ width: 50, height: 30, fontSize: 12 }}
                  onClick={() => handelReady(i)}
                >
                  Update ready
                </button>
              )}
              <div
                style={{ width: 40, paddingTop: '15px', paddingLeft: 15 }}
                onClick={() => dispatch(taskAction.deleteTemplateTasks(task.name))}
              >
                <MdClose />
              </div>
            </div>
          ))}
      </div>
      <button onClick={() => handelReady(null)}>Update all ready</button>
      <div>
        <input placeholder='Search task' onChange={tDebounce} />
        <input type='checkbox' checked={isSuccess} onChange={handelSearchSuccess} />
        <label>Completed</label>
      </div>

      {tasks.length > 0 &&
        tasks.map((task, i) => (
          <div style={{ display: 'flex', flexDirection: 'row', columnGap: 15 }} key={i}>
            <p>Task:{task.name}</p>
            <p>Status :{task.status ? 'success' : 'error'}</p>
            <button
              style={{ width: 50, height: 30, fontSize: 10 }}
              onClick={() => handelUpdateStatus(i)}
            >
              Update Success
            </button>

            <div
              style={{ width: 40, paddingTop: '15px', paddingLeft: 15 }}
              onClick={() => dispatch(taskAction.deleteTaskPending(task.id))}
            >
              <MdClose />
            </div>
          </div>
        ))}
      <form onSubmit={handelSubmit}>
        <input
          placeholder='input task'
          value={valueCreateTask}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValueCreateTask(e.target.value)
          }
        />
      </form>
    </div>
  );
}

export default HomePage;
