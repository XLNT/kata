const b = require("buidler");
const { getBouncerSigner } = require("./helpers/sign");

const TokenAndBouncerDeployer = b.artifacts.require("TokenAndBouncerDeployer");
const MintableERC20Bouncer = b.artifacts.require("MintableERC20Bouncer");
const KataToken = b.artifacts.require("KataToken");

const gas = 7000000; // work around gas estimation issues

require("chai")
  .use(require("chai-bignumber")(b.web3.BigNumber))
  .should();

const COUNT = 10;
let nonce = 0;

contract(
  "MintableERC20Bouncer",
  ([_, deployer, bouncerSigner, executor, beneficiary]) => {
    beforeEach(async function() {
      const test = await TokenAndBouncerDeployer.new({ from: deployer });
      const res = await test.deploy(
        "Test Token",
        "TEST",
        18,
        "https://example.com",
        bouncerSigner,
        { from: deployer, gas }
      );

      const args = res.logs[res.logs.length - 1].args;

      this.token = await KataToken.at(args.token);
      this.mock = await MintableERC20Bouncer.at(args.bouncer);
      this.sign = getBouncerSigner(this.mock, bouncerSigner);
    });

    it("allows bouncer to mint for beneficiary via delegate", async function() {
      const sig = await this.sign("mint", [
        ++nonce,
        this.token.address,
        beneficiary,
        1
      ]);

      await this.mock.mint(nonce, this.token.address, beneficiary, 1, sig, {
        from: executor,
        gas
      });

      (await this.token.balanceOf(beneficiary)).should.be.bignumber.equal(1);
    });

    it("allows bouncer to mint for beneficiary via delegate for n times", async function() {
      for (let i = 1; i < COUNT + 1; i++) {
        const sig = await this.sign("mint", [
          ++nonce,
          this.token.address,
          beneficiary,
          1
        ]);

        await this.mock.mint(nonce, this.token.address, beneficiary, 1, sig, {
          from: executor,
          gas
        });

        (await this.token.balanceOf(beneficiary)).should.be.bignumber.equal(i);
      }
    });
  }
);
