import { useState, useEffect } from 'react';
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
  const [valueCreateTodo, setValueCreateTodo] = useState<string>('');

  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const { todos } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(todoAction.getTodosPending());
  }, []);

  const handleCompleted = (i: number) => {
    dispatch(
      todoAction.updateTodoPending({ ...todos[i], completed: !todos[i].completed })
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (valueCreateTodo) {
      setValueCreateTodo('');
      dispatch(todoAction.createTodoPending(valueCreateTodo));
    }
  };

  function handleSearchName(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(todoAction.getTodosPending({ name: e.target.value }));
  }

  function handleSearchCompleted() {
    setIsCompleted(!isCompleted);
    dispatch(todoAction.getTodosPending({ completed: !isCompleted }));
  }

  const tDebounce = debounce(handleSearchName, 600);

  const handleDelete = (id: string) => {
    dispatch(todoAction.deleteTodoPending(id));
  };
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueCreateTodo(e.target.value);
  };

  return (
    <div style={style}>
      <div>
        <input placeholder='Search todo' onChange={tDebounce} />
        <input type='checkbox' checked={isCompleted} onChange={handleSearchCompleted} />
        <label>Completed</label>
      </div>
      {todos.length > 0 &&
        todos.map((todo, i) => (
          <div style={{ display: 'flex', flexDirection: 'row' }} key={i}>
            <p>{todo.name}</p>
            <input
              type='checkbox'
              checked={todo.completed}
              onChange={() => handleCompleted(i)}
            />

            <div
              style={{ width: 40, paddingTop: '15px', paddingLeft: 15 }}
              onClick={() => handleDelete(todo.id)}
            >
              <MdClose />
            </div>
          </div>
        ))}
      <form onSubmit={handleSubmit}>
        <input
          placeholder='input task'
          value={valueCreateTodo}
          onChange={handleChangeValue}
        />
      </form>
    </div>
  );
}

export default HomePage;
