import styled from 'styled-components'
import { useLogout } from '../services/auth'

export default function Header() {
  const logout = useLogout()

  return (
    <Container>
      <button onClick={logout} display="none">
        Logout
      </button>
    </Container>
  )
}

const Container = styled.div
