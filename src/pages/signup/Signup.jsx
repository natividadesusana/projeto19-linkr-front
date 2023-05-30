import styled from "styled-components";
import HomeScreen from "../../constants/HomeScreen";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Signup() {

    const [form, setForm] = useState({ email: "", password: "", username: "", picture_url: "" });
    const [disabled, setDisabled] = useState(false);

    const { email, password, username, picture_url } = form;
    const navigate = useNavigate();

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const createRegister = (e) => {
        e.preventDefault();
        setDisabled(true);
        axios
            .post(`${process.env.REACT_APP_BASE_URL}/sign-up`, form)
            .then(() => navigate("/"))
            .catch((err) => alert(err.response.data))
    }

    return (
        <Main>
            <HomeScreen />
            <SignupContainer>
                <SignUpForm onSubmit={createRegister}>

                    <input
                        placeholder="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleForm}
                        disabled={disabled}
                    />
                    <input
                        placeholder="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleForm}
                        disabled={disabled}
                    />
                    <input
                        placeholder="username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleForm}
                        disabled={disabled}
                    />
                    <input
                        placeholder="picture url"
                        type="text"
                        name="picture_url"
                        value={picture_url}
                        onChange={handleForm}
                        disabled={disabled}
                    />
                    <button type="submit" disabled={disabled}>Sign Up</button>
                    <Link to={"/"}>Switch back to log in</Link>

                </SignUpForm>
            </SignupContainer>
        </Main>
    )
}

const mediaQuery = "@media (max-width: 768px)";

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
`;

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
            color: #9F9F9F;
        }

        &:focus {
            border-color: #1877F2;
            outline: none;
        }
    }
    button {
        width: 430px;
        height: 70px;
        border-radius: 6px;
        border: 1px solid #1877F2;
        background-color: #1877F2;
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        cursor: pointer;
        color: #FFFFFF;
        ${mediaQuery} {
            width: 91%;
        }
    }
    a {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;

        text-decoration-line: underline;

        color: #FFFFFF;
        ${mediaQuery} {
            margin-top: 25px;
        }
    }
    ${mediaQuery} {
        width: 100%;
        padding: 10px;
    }
`
