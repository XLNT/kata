import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import ClaimPage from './pages/ClaimPage'

import LoadingFrame from './components/LoadingFrame'

import { ApolloProvider } from 'react-apollo'
import client from './api/client'

class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <LoadingFrame>
            <Switch>
              <Route exact path='/' component={IndexPage} />
              <Route path='/:code' component={ClaimPage} />
            </Switch>
          </LoadingFrame>
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

export default App
