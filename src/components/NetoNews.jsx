import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function NetoNews({news, checkId}) {
  const params = useParams()
  // console.log(params);
  // console.log(news);
  return (
    <Link to={`/news/${news.id}`} onClick={() => checkId(news.id)} className="news">
      <img src={news.image} alt={news.title} />
      <div className="news-text">
        <h5>{news.title}</h5>
        <p>{news.content}</p>
      </div>
    </Link>
  )
}
