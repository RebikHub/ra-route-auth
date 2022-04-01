import React from 'react';
import NetoNews from './NetoNews';

export default function NetoList({news, checkId}) {
  return (
    <div className="news-list">
      {news.map((el) =>
        <NetoNews
          news={el}
          checkId={checkId}
          key={el.id}/>
        )}
    </div>
  );
};
