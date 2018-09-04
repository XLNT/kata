pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "openzeppelin-solidity/contracts/proposals/ERC1046/TokenMetadata.sol";


contract KataToken is ERC20, ERC20Detailed, ERC20Mintable, ERC20WithMetadata {
  constructor(
    string _name,
    string _symbol,
    uint8 _decimals,
    string _tokenURI
  )
    ERC20WithMetadata(_tokenURI)
    ERC20Detailed(_name, _symbol, _decimals)
    public
  {}
}
