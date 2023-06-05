import { useRoutes } from 'react-router-dom'
import Signin from '../pages/signin/Signin'
import Signup from '../pages/signup/Signup'
import Home from '../pages/home/Home'
import HashtagPage from '../pages/HashtagPage/HashtagPage'
import User from '../pages/User/User'

const Routes = () => {
  return useRoutes([
    { path: '/', element: <Signin /> },
    { path: '/cadastro', element: <Signup /> },
    { path: '/timeline', element: <Home /> },
    { path: '/hashtags/:hashtag', element: <HashtagPage /> },
    { path: '/user/:id', element: <User /> }
  ])
}
export default Routes
