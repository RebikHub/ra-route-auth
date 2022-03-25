import React from 'react'

export default function NetoNews({title, image, content}) {
  return (
    <div className="news">
      <img src={image} alt={title} />
      <div className="news-text">
        <h5>{title}</h5>
        <p>{content}</p>
      </div>
    </div>
  )
}
