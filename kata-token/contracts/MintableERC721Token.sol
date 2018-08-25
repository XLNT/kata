pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

// @TODO - finish this
contract MintableERC721Token is ERC721Token {
  constructor(string name, string symbol)
    ERC721Token(name, symbol)
    public
  {

  }
}
