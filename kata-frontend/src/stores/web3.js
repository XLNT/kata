import { observable, flow, action, transaction, computed } from 'mobx'
import Web3 from 'web3'

const networkDescById = {
  1: 'Mainnet',
  3: 'Ropsten',
  4: 'Rinkeby',
  42: 'Kovan',
}

const defaultNetwork = {
  id: null,
  description: '',
}

export default class Web3Store {
  @observable web3 = null
  @observable currentAccount = null
  @observable network = defaultNetwork
  @observable latestBlock = null
  @observable isMetaMask = false

  constructor () {
    setImmediate(() => {
      transaction(() => {
        this._getAndSetWeb3()
      })
    })
  }

  @computed get hasWeb3 () {
    return !!this.web3
  }

  @computed get hasNetwork () {
    return !!this.network.id
  }

  @computed get isLocked () {
    return !this.isUnlocked
  }

  @computed get isUnlocked () {
    return !!this.currentAccount
  }

  @computed get canRead () {
    return this.hasWeb3 &&
      this.hasNetwork
  }

  @computed get canWrite () {
    return this.isUnlocked
  }

  _getAndSetWeb3 = action(() => {
    if (typeof window.web3 === 'undefined') {
      this.network = defaultNetwork
      this.web3 = null
      this.currentAccount = null
      setTimeout(this._getAndSetWeb3, 1000)
      return
    }

    if (!this.web3) {
      // only if we haven't instantiated
      // Create a new web3 object using the current provider
      this.web3 = new Web3(window.web3.currentProvider)
    }

    this.isMetaMask = !!this.web3.currentProvider.isMetaMask
    this._getAndSetInfo(5000)
  })

  _getAndSetInfo = flow(function *(interval = 1000) {
    try {
      const id = yield this.web3.eth.net.getId()
      const description = networkDescById[id] || `Non-Canonical Network ${id}`
      this.network.id = id
      this.network.description = description

      const accounts = yield this.web3.eth.getAccounts()
      this.currentAccount = accounts[0] || null

      this.web3.eth.defaultAddress = this.currentAccount

      this.latestBlock = yield this.web3.eth.getBlockNumber()
    } catch (error) {
      throw new Error(error)
    }

    setTimeout(this._getAndSetInfo, interval)
  }.bind(this))
}
