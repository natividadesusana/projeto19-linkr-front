import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Contextapi from "../context/Contextapi";

export function useLogout() {
    const { token, setToken, setUsername } = useContext(Contextapi);
    const navigate = useNavigate();
    const config = { headers: { Authorization: `Bearer ${token}` } };
  
    return () => {
      axios
        .post(`${process.env.REACT_APP_API_URL}/logout`, {}, config)
        .then(() => {
          setToken(undefined);
          setUsername(undefined);
          localStorage.clear();
          navigate("/");
        })
        .catch((err) => alert(err.response.data));
    };
  }