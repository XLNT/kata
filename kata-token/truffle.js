/* eslint-disable camelcase */
require('dotenv').config()
const HDWalletProvider = require('truffle-hdwallet-provider')

const provider = url => () => new HDWalletProvider(process.env.MNEMONIC, url)
const infura = (network) => provider(`https://${network}.infura.io/`)

const defaultConfig = {
  gas: 7800000,
  network_id: '*',
}

module.exports = {
  mocha: {
    useColors: true,
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      // provider: provider('http://127.0.0.1:8545'),
      ...defaultConfig,
    },
    mainnet: {
      provider: infura('mainnet'),
      ...defaultConfig,
      network_id: 1,
      gas: 7500000,
      gasPrice: 15000000000, // 15gwei
    },
    rinkeby: {
      provider: infura('rinkeby'),
      ...defaultConfig,
      gas: 6500000,
      network_id: 4,
    },
  },
}
