import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Main() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '15px',
        rowGap: 15,
      }}
    >
      <Header />
      <Outlet />
    </div>
  );
}

export default Main;
