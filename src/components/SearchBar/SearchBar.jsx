import { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  InputBox,
  SearchContainer,
  Input,
  OutlineIcon,
  UserBox
} from './styled'
import { AiOutlineSearch } from 'react-icons/ai'

export default function SearchInput({ avatar }) {
  const { token } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [users, setUsers] = useState('')
  const [loading, setLoading] = useState(false)
  const [clicked, setClicked] = useState(false)
  const searchContainerRef = useRef(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (username.length >= 3) {
      const usernameToSearch = username
      const response = axios.get(
        `${process.env.REACT_APP_API_URL}/users/${usernameToSearch}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      response.then(res => setUsers(res.data))
      response.catch(res => {
        setUsers()
        console.log('Entrei')
      })
    } else {
      setUsers([])
    }
    function clickOutside(event) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setUsers([])
      }
    }

    document.addEventListener('mousedown', clickOutside)
    return () => {
      document.removeEventListener('mousedown', clickOutside)
    }
  }, [token, username])

  useEffect(() => {
    if (clicked && selectedUser !== null) {
      setUsername('')
      navigate(`/user/${selectedUser}`)
      setClicked(false)
      setSelectedUser(null)
      setUsername('')
    }
  }, [clicked, selectedUser, navigate])

  return (
    <Container>
      <InputBox>
        <Input
          data-test="search"
          type="text"
          placeholder="Search for people"
          value={username}
          disabled={loading}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <OutlineIcon>
          {' '}
          <AiOutlineSearch name="search-outline" />
        </OutlineIcon>
      </InputBox>
      {users.length > 0 && (
        <SearchContainer id="search-container">
          {users.map(user => (
            <UserBox
              data-test="user-search"
              href={`/user/${user.id}`}
              key={user.id}
            >
              <img src={user.pictureUrl} />
              <h1>
                {user.userName}{' '}
                {user.following ? <span> • following</span> : ''}
              </h1>
            </UserBox>
          ))}
        </SearchContainer>
      )}
    </Container>
  )
}
