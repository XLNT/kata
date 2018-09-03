const b = require("buidler");
const { expectThrow } = require("./helpers/expectThrow");
const { getBouncerSigner } = require("./helpers/sign");

const MockToken = b.artifacts.require("MockToken");
const EscrowedERC20Bouncer = b.artifacts.require("EscrowedERC20Bouncer");

const gas = 7000000; // work around gas estimation issues

require("chai")
  .use(require("chai-bignumber")(b.web3.BigNumber))
  .should();

const COUNT = 10;
let nonce = 0;

contract(
  "EscrowedERC20Bouncer",
  ([
    _,
    deployer,
    bouncerSigner,
    executor,
    beneficiary,
    anyone,
    withdrawDestination
  ]) => {
    beforeEach(async function() {
      this.token = await MockToken.new("Test", "TEST", 18, { from: deployer });
      this.mock = await EscrowedERC20Bouncer.new(bouncerSigner, {
        from: deployer
      });
      this.signFor = getBouncerSigner(this.mock, bouncerSigner);
    });

    context("with nothing in it", function() {
      it("doesn't really do anything", async function() {
        await expectThrow(
          this.mock.withdraw(this.token.address, beneficiary, 1, "0x0", {
            from: anyone
          })
        );

        await expectThrow(
          this.mock.withdraw(this.token.address, beneficiary, 1, "0x0", {
            from: bouncerSigner
          })
        );
      });
    });

    context("with one TKNbit in it", function() {
      beforeEach(async function() {
        await this.token.mint(this.mock.address, 1, { from: deployer });
      });

      it("allows bouncer to withdraw for beneficiary via delegate", async function() {
        const sig = await this.signFor(executor, "withdraw", [
          ++nonce,
          this.token.address,
          beneficiary,
          1
        ]);

        await this.mock.withdraw(
          nonce,
          this.token.address,
          beneficiary,
          1,
          sig,
          {
            from: executor,
            gas
          }
        );

        (await this.token.balanceOf(beneficiary)).should.be.bignumber.equal(1);
      });
    });

    context("with multiple TKNbits in it", function() {
      beforeEach(async function() {
        await this.token.mint(this.mock.address, COUNT, { from: deployer });
      });

      it("allows bouncer to withdraw for beneficiary via delegate for n times", async function() {
        for (let i = 1; i < COUNT + 1; i++) {
          const sig = await this.signFor(executor, "withdraw", [
            ++nonce,
            this.token.address,
            beneficiary,
            1
          ]);

          await this.mock.withdraw(
            nonce,
            this.token.address,
            beneficiary,
            1,
            sig,
            {
              from: executor,
              gas
            }
          );

          (await this.token.balanceOf(beneficiary)).should.be.bignumber.equal(
            i
          );
        }
      });
    });
    context("with some TKNbits left over", function() {
      beforeEach(async function() {
        this.token.mint(this.mock.address, COUNT, { from: deployer });
      });
      it("should allow bouncer to withdraw all", async function() {
        (await this.token.balanceOf(
          withdrawDestination
        )).should.be.bignumber.equal(0);

        await this.mock.withdrawAll(this.token.address, withdrawDestination, {
          from: bouncerSigner
        });

        (await this.token.balanceOf(
          withdrawDestination
        )).should.be.bignumber.equal(COUNT);
      });
      it("should not allow anyone to withdrawall", async function() {
        await expectThrow(
          this.mock.withdrawAll(this.token.address, withdrawDestination, {
            from: anyone
          })
        );
      });
    });
  }
);
