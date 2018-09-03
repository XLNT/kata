const TokenAndBouncerDeployer = artifacts.require("TokenAndBouncerDeployer");

const INITIAL_SIGNER = "0x4ee6b15c72919582C2fBc8cFa4a6AE24a7d6950d";

const NAME = "Nifty Commons";
const SYMBOL = "NIFTY";
const DECIMALS = 18;
const TOKEN_URI = "https://meta.xlnt.co/niftycommons.json";

modules.exports = async ([main]) => {
  const bouncer = await TokenAndBouncerDeployer.new(
    NAME,
    SYMBOL,
    DECIMALS,
    TOKEN_URI,
    INITIAL_SIGNER,
    { from: main }
  );

  console.log(bouncer);
};
