import styled from 'styled-components'
import { useLogin } from '../../services/auth'

export default function Signin() {
  const login = useLogin()

  return (
    <Main>
      <p>Hello world</p>
    </Main>
  )
}
const Main = styled.div`
  width: 1000px;
  margin: auto;
`
