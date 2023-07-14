import { useAppSelector } from '../app/store';
import { shallowEqual } from 'react-redux';

function Info() {
  const user = useAppSelector((state) => state.user.currentUser, shallowEqual);
  return (
    <div style={{ padding: 20 }}>
      <p>{user?.email}</p>
      <p>{user?.fullName}</p>
      <p>{user?.password}</p>
      <p>{user?.id}</p>
      <p>{user?.role}</p>
    </div>
  );
}

export default Info;
