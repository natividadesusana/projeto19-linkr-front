import axios from 'axios'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export function useSignUp() {
  const navigate = useNavigate()

  return body => {
    console.log(body)
    axios
      .post(`${process.env.REACT_APP_API_URL}/sign-up`, body)
      .then(res => {
        console.log(res.data)
        navigate('/')
      })
      .catch(err => alert(err.response.data))
  }
}

export function useLogout() {
  const { token, setToken, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const config = { headers: { Authorization: `Bearer ${token}` } }

  return () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/logout`, {}, config)
      .then(() => {
        setToken(undefined)
        setUser(undefined)
        localStorage.clear()
        navigate('/')
      })
      .catch(err => alert(err.response.data))
  }
}
export function useLogin() {
  const { setUser, setToken } = useContext(AuthContext)
  const navigate = useNavigate()

  return body => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/sign-in`, body)
      .then(res => {
        setUser(res.data)
        setToken(res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data))
        localStorage.setItem('token', res.data.token)
        navigate('/timeline')
      })
      .catch(err => alert(err.response.data))
  }
}
