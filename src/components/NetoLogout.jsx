import React from 'react';
import { Link } from 'react-router-dom';

export default function NetoLogout({user, handleClickOut}) {
  return (
    <div className="auth">
      <h5>{user.name}</h5>
      <img src={user.avatar} alt={user.name} />
      <Link
        to={'/'}
        className="btn-out"
        onClick={handleClickOut}>Logout</Link>
    </div>
  );
};
