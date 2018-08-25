require("dotenv").config();

const Account = require("eth-lib/lib/account");
const web3Utils = require("web3-utils");

const prefixMessage = data => {
  const message = web3Utils.isHexStrict(data)
    ? web3Utils.hexToBytes(data)
    : data;
  const messageBuffer = Buffer.from(message);
  const preamble = "\x19Ethereum Signed Message:\n" + message.length;
  const preambleBuffer = Buffer.from(preamble);
  const ethMessage = Buffer.concat([preambleBuffer, messageBuffer]);
  return web3Utils.keccak256(ethMessage);
};

const getSigner = (contract, signer, data = "") => async addr => {
  // via: https://github.com/OpenZeppelin/zeppelin-solidity/pull/812/files
  const original = contract.address.substr(2) + addr.substr(2) + data;
  // ^ substr to remove `0x` because in solidity the address is a set of byes, not a string `0xabcd`
  console.log("original:", original);
  const hash = web3Utils.sha3(web3Utils.hexToBytes(`0x${original}`));
  const newHash = web3Utils.soliditySha3(`0x${original}`);
  console.log("hash:", hash, hash === newHash);

  const prefixed = prefixMessage(hash);
  console.log("prefixed:", prefixed);

  const sig = Account.sign(
    prefixed,
    "0x8e87e42670e858aff1d04ccffe07a5c07dc8a1ac9b81f1c86a480765ac707ebb"
  );

  return sig;
};

const ClaimableTokenDeployer = artifacts.require("ClaimableTokenDeployer");
const ClaimableToken = artifacts.require("ClaimableToken");
const ClaimableTokenMinter = artifacts.require("ClaimableTokenMinter");
const FuckTruffle = artifacts.require("FuckTruffle");

const tokenConfigs = [
  // {
  //   name: 'An XLNT Matt',
  //   symbol: 'MATT',
  //   tokenUri: 'https://meta.xlnt.co/an-xlnt-matt.json',
  // },
  {
    name: "An XLNT Nate",
    symbol: "NATE",
    tokenUri: "https://meta.xlnt.co/an-xlnt-nate.json"
  }
];

const INITIAL_BOUNCER = process.env.BOUNCER.toLowerCase();
// const INITIAL_BOUNCER = '0x7E75EdaBCE163EFee3E383Fc7C0a21720367f463'.toLowerCase()

module.exports = function(deployer) {
  return deployer.deploy(FuckTruffle).then(async () => {
    for (const config of tokenConfigs) {
      await deployer.deploy(
        ClaimableTokenDeployer,
        config.name,
        config.symbol,
        config.tokenUri,
        INITIAL_BOUNCER
      );

      const instance = await ClaimableTokenDeployer.deployed();

      const token = ClaimableToken.at(await instance.token());
      const minter = ClaimableTokenMinter.at(await instance.minter());

      console.log(`
        Deployed:       ${config.name}
        Token Address:  ${token.address}
        Minter Address: ${minter.address}
      `);

      // try {
      //   // test a mint
      //   const signFor = getSigner(minter, INITIAL_BOUNCER)
      //   const sig = await signFor(INITIAL_BOUNCER)
      //   console.log('signature:', sig)
      //   console.log('to:', INITIAL_BOUNCER)
      //   console.log('from:', INITIAL_BOUNCER)

      //   await minter.mint(sig, { from: INITIAL_BOUNCER })

      //   console.log('checking balance...')
      //   const balance = await token.balanceOf(INITIAL_BOUNCER)
      //   console.log('balance:', balance.toNumber())
      // } catch (error) {
      //   console.error(error)
      // }
    }
  });
};
