import { useEffect, useState } from "react";

export default function useFetchAuthorization(input, output, saveToken, newsId) {
  const [token, setToken] = useState(saveToken);
  const [user, setUser] = useState(null);
  const [news, setNews] = useState([]);
  const [error, setError] = useState('Not Found First Value');
  const [newsOne, setNewsOne] = useState(null);

  useEffect(() => {
    if (output) {
      setUser(null);
      setNews([]);
      setError('Not Found First Value');
      localStorage.removeItem('token');
    };
  }, [output]);

  useEffect(() => {
    if (newsId) {
      fetch(process.env.REACT_APP_NEWS_ID + newsId, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token.token
        }
      })
        .then(resp => {
          if(resp.status === 404) {
            throw new Error('404 Not Found')
          };
          setError('Not Found First Value');
          return resp.json();
        })
        .then(json => setNewsOne(json))
        .catch(() => setError('404 Not Found'))
    };
  }, [newsId, token]);

  useEffect(() => {
    if (input !== null) {
      fetch(process.env.REACT_APP_AUTH, {
        method: 'POST',
        body: JSON.stringify({
          login: input.login, 
          password: input.password
        })
      })
        .then(resp => {
          if(resp.status === 400) {
            setUser(null);
            setNews([]);
            localStorage.removeItem('token');
            throw new Error('user not found');
          }
          return resp.json();
        })
        .then(token => {
          setToken(token);
          setError('Not Found First Value');
          localStorage.setItem('token', JSON.stringify(token));
      })
        .catch(() => setError('user not found'));
    };
  }, [input]);

  useEffect(() => {
    if (token !== null) {
      fetch(process.env.REACT_APP_ME, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token.token
        }
      })
        .then(resp => {
          if(resp.status === 401) {
            setUser(null);
            setNews([]);
            localStorage.removeItem('token');
            throw new Error('401 Unauthorized');
          }
          return resp.json();
        })
        .then(json => {
          setUser(json);
          setError('Not Found First Value');
          fetch(process.env.REACT_APP_NEWS, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + token.token
            }
          })
            .then(resp => resp.json())
            .then(json => setNews(json))
        })
        .catch(() => setError('401 Unauthorized'));
    };
  }, [token]);

  return [user, news, error, newsOne];
};