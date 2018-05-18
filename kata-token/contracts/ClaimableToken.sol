pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/token/ERC721/MintableERC721Token.sol";
import "openzeppelin-solidity/contracts/token/ERC721/DefaultTokenURI.sol";


contract ClaimableToken is DefaultTokenURI, MintableERC721Token {

  constructor(string _name, string _symbol, string _tokenURI)
    ERC721Token(_name, _symbol)
    DefaultTokenURI(_tokenURI)
    public
  {

  }
}
