import React from 'react'

export default function NetoHeader(props) {
  return (
    <div className="header-social">
      <h4 className="header-title">Neto Social</h4>
      {props.children}
    </div>
  )
}
