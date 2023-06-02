import { useContext } from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export function useLogin() {
  const { setUserName, setToken } = useContext(AuthContext)
  const navigate = useNavigate()

  return body => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, body)
      .then(res => {
        setUserName(res.data.userName)
        setToken(res.data.token)
        localStorage.setItem('userName', res.data.userName)
        localStorage.setItem('token', res.data.token)
        navigate('/home')
      })
      .catch(err => alert(err.response.data))
  }
}

export function useLogout() {
  const navigate = useNavigate()
  const { setUserName, token, setToken } = useContext(AuthContext)
  const config = { headers: { Authorization: `Bearer ${token}` } }

  return () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/logout`, {}, config)
      .then(() => {
        setUserName(undefined)
        setToken(undefined)
        localStorage.clear()
        navigate('/')
      })
      .catch(err => alert(err.response.data))
  }
}
