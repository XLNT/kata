const b = require("buidler");
const { expectThrow } = require("./helpers/expectThrow");
const { getBouncerSigner } = require("./helpers/sign");

const MockToken = b.artifacts.require("MockToken");
const MintableERC20Bouncer = b.artifacts.require("MintableERC20Bouncer");

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
      this.token = await MockToken.new("Test", "TEST", 18, { from: deployer });
      this.mock = await MintableERC20Bouncer.new(bouncerSigner, {
        from: deployer
      });

      this.sign = getBouncerSigner(this.mock, bouncerSigner);
    });

    context("with mintable permission", function() {
      beforeEach(async function() {
        await this.token.transferOwnership(this.mock.address, {
          from: deployer
        });
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

          (await this.token.balanceOf(beneficiary)).should.be.bignumber.equal(
            i
          );
        }
      });
    });
  }
);
