import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import ClaimPage from './pages/ClaimPage'
import { Provider as MobXProvider } from 'mobx-react'
import { ApolloProvider } from 'react-apollo'

import LoadingFrame from './components/LoadingFrame'

import Web3Store from './stores/web3'
import client from './api/client'

class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <MobXProvider web3={new Web3Store()}>
          <BrowserRouter>
            <LoadingFrame>
              <Switch>
                <Route exact path='/' component={IndexPage} />
                <Route path='/:code' component={ClaimPage} />
              </Switch>
            </LoadingFrame>
          </BrowserRouter>
        </MobXProvider>
      </ApolloProvider>
    )
  }
}

export default App
