pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/access/ERC721Minter.sol";
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
    token.addOwner(msg.sender);
    token.addMinter(address(minter));
    minter.addOwner(msg.sender);
    minter.addBouncer(_bouncer);
  }
}
