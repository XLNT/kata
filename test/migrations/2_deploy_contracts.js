require('dotenv').config()

const signMessage = (signer, message = '', options = {}) => {
  return web3.eth.sign(signer, web3.sha3(message, options))
}

// signs hex string using web3 (auto-applies prefix)
const signHex = (signer, message = '') => {
  return signMessage(signer, message, { encoding: 'hex' })
}

const getSigner = (contract, signer, data = '') => (addr) => {
  // via: https://github.com/OpenZeppelin/zeppelin-solidity/pull/812/files
  const message = contract.address.substr(2) + addr.substr(2) + data
  // ^ substr to remove `0x` because in solidity the address is a set of byes, not a string `0xabcd`
  return signHex(signer, message)
}

const ClaimableTokenDeployer = artifacts.require('ClaimableTokenDeployer')
const ClaimableToken = artifacts.require('ClaimableToken')
const ERC721Minter = artifacts.require('openzeppelin-solidity/ERC721Minter')
const FuckTruffle = artifacts.require('FuckTruffle')

const tokenConfigs = [
  {
    name: 'An XLNT Matt',
    symbol: 'MATT',
    tokenUri: 'https://meta.xlnt.co/an-xlnt-matt.json',
  },
  {
    name: 'ArtProject Proof of Work, Ethereal 2018',
    symbol: 'PROOF OF WORK',
    tokenUri: 'https://meta.xlnt.co/artproject-pow-ethereal.json',
  },
]

const INITIAL_BOUNCER = process.env.BOUNCER

module.exports = function (deployer) {
  return deployer.deploy(FuckTruffle).then(async () => {
    for (const config of tokenConfigs) {
      await deployer.deploy(
        ClaimableTokenDeployer,
        config.name,
        config.symbol,
        config.tokenUri,
        INITIAL_BOUNCER,
      )

      const instance = await ClaimableTokenDeployer.deployed()

      const token = ClaimableToken.at(await instance.token())
      const minter = ERC721Minter.at(await instance.minter())

      console.log(`
        Deployed:       ${config.name}
        Token Address:  ${token.address}
        Minter Address: ${minter.address}
      `)

      // // test a mint
      // const signFor = getSigner(minter, INITIAL_BOUNCER)
      // const sig = signFor(INITIAL_BOUNCER)
      // console.log(`Minting to ${INITIAL_BOUNCER} with signature ${sig}`)
      // await minter.mint(sig)

      // console.log('checking balance...')
      // const balance = await token.balanceOf(INITIAL_BOUNCER)
      // console.log('balance:', balance)
    }
  })
}
