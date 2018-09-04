require("dotenv").config();

const MockToken = artifacts.require("MockToken");
const EscrowedERC20Bouncer = artifacts.require("EscrowedERC20Bouncer");

const INITIAL_SIGNER = process.env.SIGNER.toLowerCase();

const main = async () => {
  const token = await MockToken.new("Test Token", "TEST", 18);
  const bouncer = await EscrowedERC20Bouncer.new(INITIAL_SIGNER);
  await token.mint(bouncer.address, 10);
  console.log("Token:", token.address);
  console.log("Minter:", bouncer.address);
  console.log(
    `${INITIAL_SIGNER} is minter: ${await bouncer.hasRole(
      INITIAL_SIGNER,
      "bouncer"
    )}`
  );
};

module.exports = main();
