import Routes from './routes/index.routes'
import { BrowserRouter } from 'react-router-dom'
import { useState } from 'react'
import AuthContext from './context/AuthContext'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
