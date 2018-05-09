import React from 'react'
import gql from 'graphql-tag'
import { Query, ApolloConsumer } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import './IndexPage.css'

const GET_TOKEN = gql`
  query getToken($code: String!) {
    getToken(query: $code) {
      address
      metadata {
        name
        description
        image
      }
    }
  }
`

class IndexPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = { code: '', acquired: false }
  }

  validCode = (code) => {
    const isCorrectLength = code.length === 6 + 6 + 1
    const isCorrectFormat = code.split('-').length === 2
    return isCorrectLength && isCorrectFormat
  }

  handleInput = (e) => {
    const prevCode = this.state.code
    let code = e.target.value
    if (prevCode.length === 6 && code.length === 7 && code[6] !== '-') {
      code = `${code.substr(0, 6)}-${code.substr(6, 1)}`
    }
    if (code.length > 13) {
      return
    }
    this.setState({ code })
  }

  acquire = () => this.setState({ acquired: true })

  render () {
    const { code, acquired } = this.state
    return (
      <Query
        query={GET_TOKEN}
        variables={{ code }}
        skip={!this.validCode(code)}
      >
        {({ loading, error, data, refetch }) => {
          if (acquired) {
            return <Redirect to={`/${code}`} />
          }

          return (
            <div className='big-boy'>
              <h1 className='typo-title bold'>
                GOT
              </h1>
              <h1 className='typo-title bold'>
                AN XLNT
              </h1>
              <h1 className='typo-title bold'>
                CODE?
              </h1>
              <h2>put it here with your hands</h2>
              <input
                type='text'
                autoComplete='off'
                autoCorrect='off'
                autoCapitalize='off'
                spellCheck='false'
                value={code}
                placeholder='ropdyl-argnav'
                onChange={this.handleInput}
              />
              {error &&
                <p className='help-text text-center'>could not find a token for that code</p>
              }
              {!error && !loading &&
                [
                  <button
                    key='button'
                    onClick={this.acquire}
                    disabled={!this.validCode(code)}
                  >
                    acquire digital thing
                  </button>,
                  <p
                    key='p'
                    className='help-text text-center'
                  >
                    you found &#39;{data.getToken.metadata.name}&#39;
                  </p>,
                ]
              }
              <footer className='big-boy'>
                <h3>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='mailto:matt@XLNT.co'
                    className='hidden-link'
                  >
                    want your own tokens / codes?
                  </a>
                </h3>
              </footer>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default IndexPage
