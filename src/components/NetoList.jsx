import React from 'react'
import NetoNews from './NetoNews'

export default function NetoList({news}) {
  return (
    <div className="news-list">
      {news.map((el) =>
        <NetoNews
          title={el.title}
          image={el.image}
          content={el.content}
          key={el.id}/>
        )}
    </div>
  )
}
