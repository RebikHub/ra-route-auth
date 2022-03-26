import { useEffect, useState } from "react"

export default function useFetchAuthorization(input, output, saveToken, newsId) {
  const [token, setToken] = useState(saveToken)
  const [user, setUser] = useState(null)
  const [news, setNews] = useState([])
  const [error, setError] = useState(null)
  const [newsOne, setNewsOne] = useState(null)

  useEffect(() => {
    if (output) {
      setUser(null)
      setNews([])
      setError(null)
      localStorage.removeItem('token')
    }
  }, [output])

  useEffect(() => {
    console.log(newsId);
    if (newsId !== null) {
      fetch(process.env.REACT_APP_NEWS_ID + newsId, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token.token
        }
      })
        .then(resp => {
          if(resp.status === 404) {
            setError('404 Not Found')
            throw new Error('404 Not Foynd')
          }
          setError(null)
          return resp.json()
        })
        .then(json => setNewsOne(json))
        .catch(err => setError(err))
    }
  }, [newsId]);

  useEffect(() => {
    if (input !== null) {
      fetch(process.env.REACT_APP_AUTH, {
        method: 'POST',
        body: JSON.stringify({
          login: input.login, 
          password: input.password
        })
      })
        .then(resp => resp.json())
        .then(token => {
          setToken(token)
          setError(null)
          localStorage.setItem('token', JSON.stringify(token))
      })
    }
  }, [input])

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
            setUser(null)
            setNews([])
            localStorage.removeItem('token')
            setError('401 Unauthorized')
            throw new Error('401 Unauthorized')
          }
          setError(null)
          return resp.json()
        })
        .then(json => {
          setUser(json)
          fetch(process.env.REACT_APP_NEWS, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + token.token
            }
          })
            .then(resp => resp.json())
            .then(json => {
              setNews(json)
            })
        })
        .catch((err) => console.log(err))
    }
  }, [token])

  // useEffect(() => {
  //   if (token !== null) {
  //     fetch(process.env.REACT_APP_NEWS, {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': 'Bearer ' + token.token
  //       }
  //     })
  //       .then(resp => {
  //         if(resp.status === 401) {
  //           setUser(null)
  //           setNews([])
  //           localStorage.removeItem('token')
  //           throw new Error('401 Unauthorized')
  //         }
  //         return resp.json()
  //       })
  //       .then(json => {
  //         setNews(json)
  //         setLoading(false)
  //       })
  //       .catch((err) => console.log(err))
  //   }
  // }, [token])

  return [user, news, error, newsOne]
}