
import './App.css'

import { BrowserRouter } from 'react-router-dom'
import { RouteManager } from './routes/RouteManager'
import { ContextProviders } from './Context/ContextProviders'

function App() {


  return (
    <>
      <BrowserRouter>
        <ContextProviders>
          <RouteManager></RouteManager>
        </ContextProviders>
      </BrowserRouter>

    </>
  )
}

export default App
