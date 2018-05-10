pragma solidity ^0.4.23;

import "./ClaimableToken.sol";


contract ClaimableTokenDeployer {
  ClaimableToken public token;
  ERC721Minter public minter;
  constructor(
    string _name,
    string _symbol,
    string _tokenURI,
    address _bouncer
  )
    public
  {
    token = new ClaimableToken(_name, _symbol, _tokenURI);
    minter = new ERC721Minter(token);
    token.addMinter(address(minter));
    minter.addBouncer(_bouncer);
  }
}
