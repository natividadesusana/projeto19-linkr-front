import { useRoutes } from "react-router-dom"
import Signin from "../pages/signin/Signin"
import Signup from "../pages/signup/Signup"
import Home from "../pages/home/Home"
import HashtagPage from "../pages/HashtagPage/HashtagPage"

const Routes = () => {
    return useRoutes([
        {path: "/", element: <Signin/>},
        {path: "/cadastro", element: <Signup/>},
        {path: "/timeline", element: <Home/>},
        {path: "/hashtags/:hashtag", element: <HashtagPage/>}
    ])
}
export default Routes
