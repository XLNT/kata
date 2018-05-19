import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'normalize.css'
import './index.css'

ReactDOM.render(<App />, document.getElementById('root'))
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .getRegistration()
    .then(function (reg) {
      if (reg) {
        reg.unregister()
      }
      return null
    })
    .catch(console.error.bind(console))
}
