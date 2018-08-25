require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider");

const provider = url => () => new HDWalletProvider(process.env.MNEMONIC, url);
const infura = network => provider(`https://${network}.infura.io/`);
module.exports = {
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    test: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // eslint-disable-line camelcase
    },
    rinkeby: {
      provider: infura("rinkeby")
    },
    mainnet: {
      provider: infura("mainnet")
    }
  }
};
