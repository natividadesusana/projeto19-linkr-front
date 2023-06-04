import styled from 'styled-components'
import HomeScreen from '../../components/HomeScreen'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import FONTS from '../../constants/Fonts'
import useForm from '../../hooks/useForm'
import { useSignUp } from '../../services/auth'

export default function Signup() {
  const signUp = useSignUp()
  const { form, handleForm } = useForm({
    email: '',
    password: '',
    username: '',
    pictureUrl: ''
  })

  const [disabled, setDisabled] = useState(false)

  function createRegister(e) {
    e.preventDefault()
    setDisabled(true)
    signUp(form)

    // axios
    //   .post(`${process.env.REACT_APP_BASE_URL}/sign-up`, form)
    //   .then(() => navigate('/'))
    //   .catch(err => alert(err.response.data))
    //   .finally(() => setDisabled(false))
  }

  return (
    <Main>
      <HomeScreen />
      <SignupContainer>
        <SignUpForm onSubmit={createRegister}>
          <input
            data-test="email"
            placeholder="e-mail"
            type="email"
            name="email"
            value={form.email}
            onChange={handleForm}
            disabled={disabled}
          />
          <input
            data-test="password"
            placeholder="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleForm}
            disabled={disabled}
          />
          <input
            data-test="username"
            placeholder="username"
            type="text"
            name="username"
            required
            value={form.username}
            onChange={handleForm}
            disabled={disabled}
          />
          <input
            data-test="picture-url"
            placeholder="picture url"
            type="text"
            required
            name="pictureUrl"
            value={form.pictureUrl}
            onChange={handleForm}
            disabled={disabled}
          />
          <button
            data-test="sign-up-btn"
            type="submit"
            disabled={disabled}
            onClick={() => setDisabled(false)}
          >
            Sign Up
          </button>
          <Link data-test="login-link" to={'/'}>
            Switch back to log in
          </Link>
        </SignUpForm>
      </SignupContainer>
    </Main>
  )
}

const mediaQuery = '@media (max-width: 768px)'

const Main = styled.div`
  display: flex;
`
const SignupContainer = styled.div`
  background-color: #2d3133;
  width: 30%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  ${mediaQuery} {
    height: calc(100vh - 185px);
    width: 100%;
    top: 174px;
  }
`

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  input {
    width: 395px;
    height: 40px;
    border-radius: 6px;
    border: 1px solid #fff;
    background-color: #fff;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 50px;
    color: #000;
    padding: 17px;
    ${mediaQuery} {
      width: 84%;
    }
    ::placeholder {
      font-family: 'Oswald', sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 27px;
      line-height: normal;
      color: #9f9f9f;
    }
    &:focus {
      border-color: #1877f2;
      outline: none;
    }
  }
  button {
    width: 430px;
    height: 70px;
    border-radius: 6px;
    border: 1px solid #1877f2;
    background-color: #1877f2;
    font-family: ${FONTS.SECONDARY};
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    cursor: pointer;
    color: #ffffff;
    ${mediaQuery} {
      width: 91%;
    }
  }
  a {
    font-family: ${FONTS.LINKS};
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-decoration-line: underline;
    color: #ffffff;
    ${mediaQuery} {
      margin-top: 25px;
    }
  }
  ${mediaQuery} {
    width: 100%;
    padding: 10px;
  }
`
