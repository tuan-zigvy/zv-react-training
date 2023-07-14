import { Outlet } from 'react-router-dom';

function BlankLayout() {
  return (
    <div style={{ display: 'flex' }}>
      <Outlet />
    </div>
  );
}

export default BlankLayout;
