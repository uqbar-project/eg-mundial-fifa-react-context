import './App.css'

import { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import logo from './assets/logoQatar.png'
import { Provider } from './context/Provider'
import { MundialRoutes } from './routes'

class App extends Component {
  render() {
    return (
      <Provider>
        <BrowserRouter>
          <div className="App" data-testid="app">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
            </header>
            <hr className="separador" />
            <MundialRoutes />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
