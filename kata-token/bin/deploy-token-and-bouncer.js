const TokenAndBouncerDeployer = artifacts.require("TokenAndBouncerDeployer");

const INITIAL_SIGNER = process.env.SIGNER.toLowerCase();

const NAME = "Nifty Commons";
const SYMBOL = "NIFTY";
const DECIMALS = 0;
const TOKEN_URI = "https://meta.xlnt.co/niftycommons.json";

const main = async () => {
  const bouncer = await TokenAndBouncerDeployer.new();
  const res = await bouncer.deploy(
    NAME,
    SYMBOL,
    DECIMALS,
    TOKEN_URI,
    INITIAL_SIGNER,
    { gas: 7000000 }
  );

  const args = res.logs[res.logs.length - 1].args;

  console.log(args);
};

module.exports = main();
