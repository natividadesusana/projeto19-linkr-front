import { useRoutes } from 'react-router-dom'
import App from '../pages/app/App'
import Signin from '../pages/signin/Signin'
import Signup from '../pages/signup/Signup'
import Home from '../pages/home/Home'

const Routes = () => {
    return useRoutes([
        {path: "/", element: <App/>},
        {path: "/login", element: <Signin/>},
        {path: "/cadastro", element: <Signup/>},
        {path: "/timeline", element: <Home/>},
    ])
}
export default Routes
