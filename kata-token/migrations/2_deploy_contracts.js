require("dotenv").config();

const MockToken = artifacts.require("MockToken");
const EscrowedERC20Bouncer = artifacts.require("EscrowedERC20Bouncer");

const INITIAL_BOUNCER = process.env.BOUNCER.toLowerCase();

const main = async () => {
  const token = await MockToken.new("Test Token", "TEST", 18);
  const bouncer = await EscrowedERC20Bouncer.new(INITIAL_BOUNCER);
  await token.mint(bouncer.address, 10);
  console.log("Token:", token.address);
  console.log("Minter:", bouncer.address);
  console.log(
    `${INITIAL_BOUNCER} is minter: ${await bouncer.hasRole(
      INITIAL_BOUNCER,
      "bouncer"
    )}`
  );
};

module.exports = main();
