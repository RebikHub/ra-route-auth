import React from 'react'

export default function NetoLogout({user, handleClickOut}) {
  return (
    <div className="auth">
      <h5>{user.name}</h5>
      <img src={user.avatar} alt={user.name} />
      <button
        type="button"
        className="btn-out"
        onClick={handleClickOut}>Logout</button>
    </div>
  )
}
