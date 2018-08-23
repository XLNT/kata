import React from 'react'
import { observer, inject } from 'mobx-react'
import { Query } from 'react-apollo'

import Loading from '../components/Loading'
import { SignStep, ClaimStep, SignAndClaimStep } from '../components/FlowStep'

import { GET_TOKEN } from '../api/queries'

import './ClaimPage.css'

@inject('web3')
@observer
class ClaimPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      signature: null,
      minting: false,
      tokenId: null,
    }
  }

  didSign = async (signature) => {
    this.setState({ signature })
  }

  didMint = async (tokenId) => {
    this.setState({ tokenId })
  }

  didSignAndClaim = async (txHash) => {
    this.setState({ txHash })
  }

  _renderNotice = (children) => {
    return (
      <div className='notice'>
        {children}
      </div>
    )
  }

  _renderClaimingFlow = (redeemer_signs) => {
    const { web3 } = this.props

    if (!web3.hasWeb3) {
      return this._renderNotice(
        <p>
          Unfortunately, we rely on an Ethereum web3 browser like Brave, MetaMask,
          Cipher, Toshi, Status, or TrustWallet in order to mint you your token.
          <br />
          <br />
          Bookmark this page or share it to a device of yours that provides web3.
          In the future we&#39;ll help you get set up with digital ownership right here.
        </p>
      )
    }

    if (!web3.hasNetwork) {
      return this._renderNotice(
        <p>
          You&#39;re in a supported browser, but we can&#39;t connect to your web3 node!
          How&#39;s your internet connection?
        </p>
      )
    }

    if (web3.isLocked) {
      if (web3.isMetaMask) {
        return this._renderNotice(
          <p>
            Your MetaMask is locked!
          </p>
        )
      } else {
        return this._renderNotice(
          <p>
            We&#39;ve got a web3 connection, but no access to accounts!
          </p>
        )
      }
    }

    let steps
    if (redeemer_signs) {
      steps = [
        <SignStep
          key='sign'
          query={this.props.match.params.query}
          onDone={this.didSign}
          disabled={false}
          success={this.state.signature}
        />,
        <ClaimStep
          key='claim'
          query={this.props.match.params.query}
          signature={this.state.signature}
          onDone={this.didMint}
          disabled={!this.state.signature}
          success={this.state.tokenId}
        />,
      ]
    } else {
      steps = [
        <SignAndClaimStep
          key='sign-and-claim'
          query={this.props.match.params.query}
          onDone={this.didSignAndClaim}
          success={this.state.txHash}
        />,
      ]
    }

    return (
      <div className='flow-container'>
        {steps}
        {(this.state.tokenId || this.state.txHash) &&
          <div className='notice'>
            Token got! You&#39;ve minted yourself this non-fungible token, which means
            it&#39;s now owned directly by your Ethereum address. For now, it&#39;s hard to showcase
            these digital things you own, but you can always come back to this page to check it out.
          </div>
        }
      </div>
    )
  }

  render () {
    // pre-render the claiming flow because mobx needs to know to track this function call
    // for every single render, not just when Query decides to call it
    this._renderClaimingFlow(true)
    return (
      <Query
        query={GET_TOKEN}
        variables={{ query: this.props.match.params.query }}
      >
        {({ loading, error, data }) => {
          const done = !loading && !error && data
          if (error) {
            return (
              <div className='big-boy'>
                <h1 className='typo-title bold'>NOT FOUND</h1>
                <h2>
                  Sorry, either this code doesn&#39;t exist or someone (maybe you!) redeemed it for a token already.
                </h2>
              </div>
            )
          }

          return (
            <div className='big-boy'>
              <h1 className='typo-title bold'>TOKEN GET!</h1>
              {loading &&
                <Loading />
              }
              {done &&
                <div className='big-boy'>
                  <div>
                    <img
                      className='token-image'
                      src={data.getToken.token.metadata.image}
                      alt={data.getToken.token.metadata.description || data.getToken.token.metadata.name}
                    />
                  </div>
                  <h2 className='token-title'>{data.getToken.token.metadata.name}</h2>
                  <p>{data.getToken.token.metadata.description}</p>
                  {data.getToken.code && data.getToken.code.consumed
                    ? this._renderNotice(<p>You already own this token!</p>)
                    : this._renderClaimingFlow(data.getToken.token.redeemer_signs)
                  }
                </div>
              }
              <footer className='big-boy'>
                <h3>
                  this is an <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://xlnt.co'
                    className='hidden-link'
                  >
                    XLNT
                  </a> app
                </h3>
              </footer>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default ClaimPage
