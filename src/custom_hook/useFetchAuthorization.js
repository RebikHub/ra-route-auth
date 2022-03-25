import { useEffect, useState } from "react"

export default function useFetchAuthorization(input, output, saveToken) {
  const [token, setToken] = useState(saveToken)
  const [user, setUser] = useState(null)
  const [news, setNews] = useState([])

  useEffect(() => {
    if (output) {
      setUser(null)
      setNews([])
      localStorage.removeItem('token')
    }
  }, [output])

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
            throw new Error('401 Unauthorized')
          }
          return resp.json()
        })
        .then(json => setUser(json))
        .catch((err) => console.log(err))
    }
  }, [token])

  useEffect(() => {
    if (token !== null) {
      fetch(process.env.REACT_APP_NEWS, {
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
            throw new Error('401 Unauthorized')
          }
          return resp.json()
        })
        .then(json => setNews(json))
        .catch((err) => console.log(err))
    }
  }, [token])

  return [user, news]
}