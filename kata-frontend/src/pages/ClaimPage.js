import React from 'react'
import { observer, inject } from 'mobx-react'
import { Query, Mutation } from 'react-apollo'
import Loading from '../components/Loading'

import { GET_TOKEN, CLAIM_TOKEN } from '../api/queries'

import './ClaimPage.css'

@inject('web3')
@observer
class ClaimPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      signing: false,
      signature: null,
      minting: false,
      minted: false,
    }
  }

  requestSignature = async () => {

  }

  _renderNotice = (children) => {
    return (
      <div>
        {children}
      </div>
    )
  }

  _renderClaimingFlow = () => {
    const { web3 } = this.props

    if (!web3.hasWeb3) {
      return this._renderNotice(
        <p className='text-center'>
          To claim this token, plase access this page with a web3 client like
          MetaMask, or a mobile dApp browser like Cipher, Toshi, or Status.
        </p>
      )
    }

    if (!web3.hasNetwork) {
      return this._renderNotice(
        <p className='text-center'>
          We can&#39;t connect to your web3 node!
        </p>
      )
    }

    // if (!domain.hasCrafty) {
    //   return this._renderNotice(
    //     <p className='text-center'>
    //         We&#39;re connected to a network, but the Crafty contract isn&#39;t available.
    //         Are you sure you&#39;re connected to the right network?
    //     </p>
    //   )
    // }

    if (web3.isLocked) {
      if (web3.isMetaMask) {
        return this._renderNotice(
          <p className='text-center'>
            Your MetaMask is locked!
          </p>
        )
      } else {
        return this._renderNotice(
          <p className='text-center'>
            We&#39;ve got a web3 connection, but no access to accounts!
          </p>
        )
      }
    }

    return (
      <div>
        GOOD TO GO
      </div>
    )
  }

  render () {
    // pre-render the claiming flow because mobx needs to know to track this function call
    // for every single render, not just when Query decides to call it
    const flow = this._renderClaimingFlow()
    return (
      <Query
        query={GET_TOKEN}
        variables={{ code: this.props.match.params.code }}
      >
        {({ loading, error, data }) => {
          const tokenInfo = data.getToken
          const done = !loading && !error && tokenInfo

          return (
            <div className='big-boy'>
              <h1 className='typo-title bold'>TOKEN GET!</h1>
              {loading &&
                <Loading />
              }
              {done &&
                <div className='big-boy'>
                  <img
                    className='token-image'
                    src={tokenInfo.metadata.image}
                    alt={tokenInfo.metadata.description || tokenInfo.metadata.name}
                  />
                  <h2 className='token-title'>{tokenInfo.metadata.name}</h2>
                  <p>{tokenInfo.metadata.description}</p>
                  {flow}
                </div>
              }
            </div>
          )
        }}
      </Query>
    )
  }
}

export default ClaimPage
