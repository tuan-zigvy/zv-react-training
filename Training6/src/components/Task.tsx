import { ITaskRes } from '../util/interface';
import { MdClose } from 'react-icons/md';
import { useAppDispatch } from '../app/store';
import { taskAction } from '../reducer/task/taskSlice';

function TaskList({ tasks }: { tasks: ITaskRes[] }) {
  const dispatch = useAppDispatch();

  const handleUpdateStatus = (i: number) => {
    dispatch(taskAction.updateTaskPending({ ...tasks[i], status: true }));
  };

  function handleDeleteTask(id: string) {
    dispatch(taskAction.deleteTaskPending(id));
  }
  return (
    <div style={{ borderTop: '1px solid black', paddingTop: '12px' }}>
      <h4 style={{ textAlign: 'center' }}>Tasks</h4>
      {tasks.length > 0 &&
        tasks.map((task, i) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              columnGap: 10,
              width: 400,
              alignItems: 'center',
            }}
            key={i}
          >
            <div style={{ flexGrow: 1 }}>
              <p>Task:{task.name}</p>
              <p>Status :{task.status ? 'success' : 'error'}</p>
            </div>
            <button
              style={{ width: 50, height: 30, fontSize: 10 }}
              onClick={() => handleUpdateStatus(i)}
            >
              Update Success
            </button>

            <div
              style={{ width: 40, paddingTop: '15px', paddingLeft: 15 }}
              onClick={() => handleDeleteTask(task.id)}
            >
              <MdClose />
            </div>
          </div>
        ))}
    </div>
  );
}

export default TaskList;
