const MockToken = artifacts.require("MockToken");

const me = "0xEC6d36A487d85CF562B7b8464CE8dc60637362AC";
const tokenAddress = "0xa94b7f0465e98609391c623d0560c5720a3f2d33";

const main = async () => {
  const token = await MockToken.at(tokenAddress);
  console.log(await token.balanceOf(me));
};

module.exports = main();
