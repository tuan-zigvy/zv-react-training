import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { userAction } from '../reducer/user/userSlice';
import { shallowEqual } from 'react-redux';
import Loading from '../components/Loading';
import { Link, Outlet } from 'react-router-dom';

function Users() {
  const { users, role } = useAppSelector(
    (state) => ({
      users: state.user.users,
      role: state.user.currentUser?.role,
    }),
    shallowEqual
  );
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (role === 'Admin') dispatch(userAction.getUsersPending());
  }, []);

  if (role !== 'Admin')
    return (
      <>
        <h4> Only admin can see users</h4>
      </>
    );

  function handelClickTarget(index: number) {
    if (users.length > 0) dispatch(userAction.getTargetUserSuccess(users[index].id));
  }

  return (
    <div style={{ display: 'flex' }}>
      <div>
        {users.length > 0 ? (
          users.map((user, i) => (
            <div key={i}>
              <button style={{ width: 200 }} onClick={() => handelClickTarget(i)}>
                <Link to={`${user.id}`}>
                  <h4>{user.fullName}</h4>
                </Link>
              </button>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Users;
