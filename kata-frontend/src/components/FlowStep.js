import React from 'react'

import { Query, Mutation } from 'react-apollo'
import { observer, inject } from 'mobx-react'

import Loading from './Loading'

import sign from '../utils/sign'
import { GET_TOKEN, CLAIM_TOKEN } from '../api/queries'

import './FlowStep.css'
import MintableERC721Token from '../models/MintableERC721Token'

const FlowStep = ({
  title,
  helpText,
  actionText,
  errorText,
  successText,
  requestChange,

  pending,
  error,
  success,
  disabled,
}) => (
  <div className='flow-step'>
    {success &&
      <div className='div-blocker'>
        <div className='big-boy flow-done'>
          {successText}
        </div>
      </div>
    }
    {pending &&
      <div className='div-blocker'>
        <div className='big-boy flow-pending'>
          <Loading />
        </div>
      </div>
    }
    {disabled &&
      <div className='div-blocker'>
      </div>
    }
    {title}
    <button
      onClick={requestChange}
    >
      {actionText}
    </button>
    {error
      ? <p className='help-text text-center'>{errorText}</p>
      : <p className='help-text text-center'>{helpText}</p>
    }
  </div>
)

@inject('web3')
@observer
export class SignStep extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pending: false,
      error: false,
    }
  }

  getDataToSign = () => {
    const { currentAccount } = this.props.web3
    const { query } = this.props
    return `yay digital things\n\ni have code: ${query}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nand this is me: ${currentAccount}`
  }

  signData = (claimToken) => async () => {
    this.setState({ pending: true })
    const { web3, currentAccount } = this.props.web3
    try {
      const signature = await sign(web3, currentAccount, this.getDataToSign())
      claimToken({ variables: {
        signature,
        currentAccount,
        query: this.props.query,
      } })
    } catch (error) {
      this.setState({ error: true })
    } finally {
      this.setState({ pending: false })
    }
  }

  onClaimCompleted = (value) => {
    this.props.onDone(value.claimToken.sig)
  }

  render () {
    const { error, pending } = this.state
    const { disabled, success } = this.props

    return (
      <Mutation mutation={CLAIM_TOKEN} onCompleted={this.onClaimCompleted}>
        {(claimToken, { loading, error: claimError }) => {
          return (
            <FlowStep
              title={<h3>1/ sign on the dotted line<br />(cryptographically)</h3>}
              helpText='(this does not send a transaction)'
              actionText='sign'
              errorText={
                claimError
                  ? 'error connecting to the backend. try again?'
                  : 'you cancelled the signature. try again?'
              }
              successText='Signed ✔️'

              requestChange={this.signData(claimToken)}

              pending={pending || loading}
              error={error || claimError}
              success={success}
              disabled={disabled}
            />
          )
        }}
      </Mutation>
    )
  }
}

@inject('web3')
@observer
export class ClaimStep extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pending: false,
      error: false,
    }
  }

  mintToken = async (token) => {
    this.setState({ pending: true })
    const { web3, currentAccount } = this.props.web3
    const { signature } = this.props
    try {
      const token = MintableERC721Token(web3, currentAccount, token.address)
      const reciept = await token.methods.mint(signature)
      console.log(reciept)
      debugger
    } catch (error) {
      this.setState({ error: true })
    } finally {
      this.setState({ pending: false })
    }
  }

  render () {
    const { error, pending } = this.state
    const { query, disabled, success } = this.props

    return (
      <Query
        query={GET_TOKEN}
        variables={{ query }}
      >
        {({ loading, error: tokenError, data }) => {
          return (
            <FlowStep
              title={<h3>2/ mint your token</h3>}
              helpText='(this does send a transaction)'
              actionText='mint'
              errorText={'whoops, something went horribly wrong'}
              successText='Minted ✔️'

              requestChange={() => {}}

              pending={pending || loading}
              error={error || tokenError}
              success={success}
              disabled={disabled}
            />
          )
        }}
      </Query>
    )
  }
}
