import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/store';
import { shallowEqual } from 'react-redux';
import { userAction } from '../reducer/user/userSlice';

function TargetUser() {
  const { targetUser, users } = useAppSelector(
    (state) => ({ targetUser: state.user.targetUser, users: state.user.users }),
    shallowEqual
  );
  const userId = useParams().id;
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!targetUser && userId && users.length > 0) {
      dispatch(userAction.getTargetUserSuccess(userId));
    }
  }, [targetUser, users, userId]);

  return (
    <div>
      <p>{targetUser?.email}</p>
      <p>{targetUser?.fullName}</p>
      <p>{targetUser?.password}</p>
      <p>{targetUser?.id}</p>
      <p>{targetUser?.role}</p>
    </div>
  );
}

export default TargetUser;
