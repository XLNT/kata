import React from 'react'
import { observer, inject } from 'mobx-react'
import { Query } from 'react-apollo'

import Loading from '../components/Loading'
import { SignStep, ClaimStep } from '../components/FlowStep'

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

  didSign = async (value) => {
    this.setState({ signature: value })
  }

  didMint = async (value) => {
    this.setState({ tokenId: value })
  }

  _renderNotice = (children) => {
    return (
      <div className='notice'>
        {children}
      </div>
    )
  }

  _renderClaimingFlow = () => {
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

    // if (!domain.hasCrafty) {
    //   return this._renderNotice(
    //     <p>
    //         We&#39;re connected to a network, but the Crafty contract isn&#39;t available.
    //         Are you sure you&#39;re connected to the right network?
    //     </p>
    //   )
    // }

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

    return (
      <div className='flow-container'>
        <SignStep
          query={this.props.match.params.query}
          onDone={this.didSign}
          disabled={false}
          success={this.state.signature}
        />
        <ClaimStep
          query={this.props.match.params.query}
          signature={this.state.signature}
          onDone={this.didMint}
          disabled={!this.state.signature}
          success={this.state.tokenId}
        />
        {this.state.tokenId &&
          <div className='notice'>
            Token got! You&#39;ve minted yourself this non-fungible token, which means it&#39;s now owned by your Ethereum address. We&#39;ll have a nice way to view the things you own in the future, but until then you&#39;ll have to make do with the warm fuzzy feeling you get by owning something unique.
          </div>
        }
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
                      src={data.tokenInfo.metadata.image}
                      alt={data.tokenInfo.metadata.description || data.tokenInfo.metadata.name}
                    />
                  </div>
                  <h2 className='token-title'>{data.tokenInfo.metadata.name}</h2>
                  <p>{data.tokenInfo.metadata.description}</p>
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
