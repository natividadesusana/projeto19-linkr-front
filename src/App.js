import Routes from './routes/index.routes'
import { BrowserRouter } from 'react-router-dom'
import { useState } from 'react'
import AuthContext from './context/AuthContext'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [userName, setUserName] = useState(localStorage.getItem('userName'))

  return (
    <AuthContext.Provider value={{ token, setToken, userName, setUserName }}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
