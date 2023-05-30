import Routes from "./routes/index.routes";
import { BrowserRouter } from "react-router-dom";
import Contextapi from "./context/Contextapi"
import { useState } from "react";
function App() {

  const [username, setUsername] = useState("Pessoa")

  return (
    <Contextapi.Provider value={{ username, setUsername }}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Contextapi.Provider>
  )
}

export default App
