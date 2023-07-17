import { useAppDispatch, useAppSelector } from '../app/store';
import { shallowEqual } from 'react-redux';
import { taskAction } from '../reducer/task/taskSlice';
import { MdClose } from 'react-icons/md';

function TaskTemplate() {
  const statusNetWork = useAppSelector(
    (state) => state.network.statusNetWork,
    shallowEqual
  );
  const tasksPending = useAppSelector((state) => state.task.tasksPending, shallowEqual);
  const dispatch = useAppDispatch();

  function handleDeleteTemplate(name: string) {
    dispatch(taskAction.deleteTemplateTasks(name));
  }

  const handleReady = (index: number | null) => {
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
  return (
    <>
      <p>{statusNetWork ? 'Online' : 'Offline'}</p>
      <h4>Task Template</h4>
      <div>
        {tasksPending.length > 0 &&
          tasksPending.map((task, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: 10,
                width: 400,
                alignItems: 'center',
              }}
            >
              <div style={{ flexGrow: 1 }}>
                <p>name :{task.name}</p>
                <p>status :{task.status}</p>
              </div>
              {task.status === 'Draft' && (
                <button
                  style={{ width: 50, height: 30, fontSize: 12 }}
                  onClick={() => handleReady(i)}
                >
                  Update ready
                </button>
              )}
              <div
                style={{ width: 40, paddingTop: '15px', paddingLeft: 15 }}
                onClick={() => handleDeleteTemplate(task.name)}
              >
                <MdClose />
              </div>
            </div>
          ))}
      </div>
      <button onClick={() => handleReady(null)}>Update all ready</button>
    </>
  );
}

export default TaskTemplate;
