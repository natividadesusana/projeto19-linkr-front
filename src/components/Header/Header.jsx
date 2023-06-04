import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { Container, Title, UserImage, Icon, Menu, LogoutOption } from './styled'
import { useContext, useState } from 'react'
import userIcon from '../../assets/images/userIcon.jpeg'
import { useLogout } from '../../services/auth'
import AuthContext from '../../context/AuthContext'
import SearchInput from '../SearchBar/SearchBar'

export default function Header() {
  const { user } = useContext(AuthContext)
  const picture_url = user.pictureUrl
  const [showLogoutOption, setShowLogoutOption] = useState(false)
  const logout = useLogout()

  const handleIconClick = () => {
    setShowLogoutOption(!showLogoutOption)
  }

  return (
    <Container>
      <Title>linkr</Title>
      <SearchInput />
      <Menu>
        {showLogoutOption ? (
          <Icon onClick={handleIconClick}>
            <AiOutlineUp />
          </Icon>
        ) : (
          <Icon onClick={handleIconClick}>
            <AiOutlineDown />
          </Icon>
        )}

        <UserImage
          data-test="avatar"
          src={!picture_url ? userIcon : picture_url}
          alt="User Image"
        />
        {showLogoutOption && (
          <LogoutOption data-test="menu">
            <div data-test="logout" onClick={logout}>
              Logout
            </div>
          </LogoutOption>
        )}
      </Menu>
    </Container>
  )
}
