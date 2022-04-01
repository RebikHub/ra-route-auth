import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import NetoError from './NetoError';

export default function NetoNews({news, checkId}) {
  const params = useParams();

  useEffect(() => {
    checkId(params.newsId);
  }, [checkId, news, params.newsId]);

  if (news === null) {
    return (
      <NetoError error={'404 Not Found'}/>
    );
  };

  return (
    <Link to={`/news/${news.id}`} onClick={(ev) => {
        if (params.newsId) {
          ev.preventDefault();
        } else {
          checkId(news.id);
        };
      }} className="news">
      <img src={news.image} alt={news.title} />
      <div className="news-text">
        <h5>{news.title}</h5>
        <p>{news.content}</p>
      </div>
    </Link>
  );
};
