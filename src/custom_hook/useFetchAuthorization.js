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

  async function fetchNews(token, newsId) {
    try {
      const response = await fetch(process.env.REACT_APP_NEWS_ID + newsId, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      setError(null)
      if(response.status === 404) {
        setError('404 Not Found')
        throw new Error('404 Not Foynd')
      }
      const json = await response.json()
      return setNewsOne(json)
    } catch (err) {
      setError(err)
    }
  }

  useEffect(() => {
    if (newsId !== null) {
      // fetchNews(token.token, newsId)
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
  }, [newsId, token]);

  async function fetchAuth(input) {
    const response = await fetch(process.env.REACT_APP_AUTH, {
      method: 'POST',
      body: JSON.stringify({
        login: input.login, 
        password: input.password
      })
    })
    const token = await response.json()
    setToken(token)
    setError(null)
    return localStorage.setItem('token', JSON.stringify(token))
  }


  useEffect(() => {
    if (input !== null) {
      // fetchAuth(input)
      fetch(process.env.REACT_APP_AUTH, {
        method: 'POST',
        body: JSON.stringify({
          login: input.login, 
          password: input.password
        })
      })
        .then(resp => {
          if(resp.status === 400) {
            setUser(null)
            setNews([])
            localStorage.removeItem('token')
            setError('user not found' )
            throw new Error('user not found' )
          }
          setError(null)
          return resp.json()
        })
        .then(token => {
          setToken(token)
          setError(null)
          localStorage.setItem('token', JSON.stringify(token))
      })
        .catch((err) => console.log(err))
    }
  }, [input])

  async function fetchGetData(token) {
    try {
      const response = await fetch(process.env.REACT_APP_ME, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token.token
        }
      })
      if(response.status === 401) {
        setUser(null)
        setNews([])
        localStorage.removeItem('token')
        setError('401 Unauthorized')
        throw new Error('401 Unauthorized')
      }
      setError(null)
      const json = await response.json()
      setUser(json)
      const responseNews = await fetch(process.env.REACT_APP_NEWS, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      const jsonNews = await responseNews.json()
      return setNews(jsonNews)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (token !== null) {
      // fetchGetData(token.token)
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

  return [user, news, error, newsOne]
}