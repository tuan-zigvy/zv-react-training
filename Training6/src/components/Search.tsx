import React from 'react';
import { taskAction } from '../reducer/task/taskSlice';
import { useAppDispatch } from '../app/store';
import { debounce } from '../util/utils';

function Search({ statusNetWork }: { statusNetWork: boolean }) {
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  function handleSearchName(e: React.ChangeEvent<HTMLInputElement>) {
    statusNetWork && dispatch(taskAction.getTasksPending({ name: e.target.value }));
  }

  function handleSearchSuccess() {
    setIsSuccess(!isSuccess);
    statusNetWork && dispatch(taskAction.getTasksPending({ status: !isSuccess }));
  }

  const tDebounce = debounce(handleSearchName, 600);
  return (
    <div>
      <input placeholder='Search task' onChange={tDebounce} />
      <input type='checkbox' checked={isSuccess} onChange={handleSearchSuccess} />
      <label>Completed</label>
    </div>
  );
}

export default Search;
