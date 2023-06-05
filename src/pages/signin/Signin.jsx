import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import COLORS from '../../constants/Colors'
import FONTS from '../../constants/Fonts'
import { MoonLoader } from 'react-spinners'
import HomeScreen from '../../components/HomeScreen'
import { useLogin } from '../../services/auth'
import useForm from '../../hooks/useForm'

export default function Signin() {
  const login = useLogin()
  const { form, handleForm } = useForm({ email: '', password: '' })
  const [disabled] = useState(false)
  const [loading, setLoading] = useState(false)

  function submitForm(e) {
    e.preventDefault()
    login(form)

    // setForm({ ...form, [e.target.name]: e.target.value })
  }

  // const signIn = e => {
  //   e.preventDefault()
  //   setDisabled(true)
  //   axios
  //     .post(`${process.env.REACT_APP_BASE_URL}/sign-in`, form)
  //     .then(res => {
  //       navigate('/timeline')
  //       console.log(res)
  //     })
  //     .catch(err => alert(err.response.data))
  //     .finally(() => {
  //       setLoading(false)
  //       setDisabled(false)
  //     })
  // }

  return (
    <Main>
      <HomeScreen />
      <SignupContainer>
        <SignUpForm onSubmit={submitForm}>
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
          <button
            data-test="login-btn"
            type="submit"
            disabled={disabled}
            onClick={() => setLoading(true)}
          >
            Log In
          </button>
          <Link data-test="sign-up-link" to={'/cadastro'}>
            {loading ? <MoonLoader /> : 'First time? Create an account!'}
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
  background-color: ${COLORS.BACKGROUND};
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
    font-family: ${FONTS.SECONDARY};
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 50px;
    padding: 17px;
    ${mediaQuery} {
      width: 84%;
    }

    ::placeholder {
      font-family: ${FONTS.SECONDARY}, sans-serif;
      font-weight: 700;
      font-size: 27px;
      line-height: normal;
      color: ${COLORS.TERCIARY};
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
    background-color: ${COLORS.QUATERNARY};
    font-family: ${FONTS.SECONDARY};
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    cursor: pointer;
    color: #ffffff;
    ${mediaQuery} {
      width: 91%;
    }

    &:disabled {
      opacity: 0.1;
      cursor: auto;
      pointer-events: none;
    }
  }
  a {
    font-family: ${FONTS.LINKS};
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;

    text-decoration-line: underline;

    color: ${COLORS.LINKS};
    ${mediaQuery} {
      margin-top: 25px;
    }
  }
  ${mediaQuery} {
    width: 100%;
    padding: 10px;
  }
  width: 1000px;
  margin: auto;
`
