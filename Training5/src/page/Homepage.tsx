import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { todoAction } from '../reducer/todo/todoSlice';
import { MdClose } from 'react-icons/md';
import { debounce } from '../util/utils';

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

function HomePage() {
  const [valueCreateTodo, setValueCreateTodo] = React.useState<string>('');

  const [isCompleted, setIsCompleted] = React.useState<boolean>(false);

  const { todos } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(todoAction.getTodosPending());
  }, []);

  const handelCompleted = (i: number) => {
    dispatch(
      todoAction.updateTodoPending({ ...todos[i], completed: !todos[i].completed })
    );
  };

  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (valueCreateTodo) {
      setValueCreateTodo('');
      dispatch(todoAction.createTodoPending(valueCreateTodo));
    }
  };

  function handelSearchName(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(todoAction.getTodosPending({ name: e.target.value }));
  }

  function handelSearchCompleted() {
    setIsCompleted(!isCompleted);
    dispatch(todoAction.getTodosPending({ completed: !isCompleted }));
  }

  const tDebounce = debounce(handelSearchName, 600);

  return (
    <div style={style}>
      <div>
        <input placeholder='Search todo' onChange={tDebounce} />
        <input type='checkbox' checked={isCompleted} onChange={handelSearchCompleted} />
        <label>Completed</label>
      </div>
      {todos.length > 0 &&
        todos.map((todo, i) => (
          <div style={{ display: 'flex', flexDirection: 'row' }} key={i}>
            <p>{todo.name}</p>
            <input
              type='checkbox'
              checked={todo.completed}
              onChange={() => handelCompleted(i)}
            />

            <div
              style={{ width: 40, paddingTop: '15px', paddingLeft: 15 }}
              onClick={() => dispatch(todoAction.deleteTodoPending(todo.id))}
            >
              <MdClose />
            </div>
          </div>
        ))}
      <form onSubmit={handelSubmit}>
        <input
          placeholder='input task'
          value={valueCreateTodo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValueCreateTodo(e.target.value)
          }
        />
      </form>
    </div>
  );
}

export default HomePage;
