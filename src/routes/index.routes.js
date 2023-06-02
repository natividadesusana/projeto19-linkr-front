import { useRoutes } from "react-router-dom"
import Signin from "../pages/signin/Signin"
import Signup from "../pages/signup/Signup"
import Home from "../pages/home/Home"

const Routes = () => {
    return useRoutes([
        {path: "/", element: <Signin/>},
        {path: "/cadastro", element: <Signup/>},
        {path: "/timeline", element: <Home/>},
    ])
}
export default Routes
