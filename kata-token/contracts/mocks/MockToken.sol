pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";


contract MockToken is ERC20Detailed, ERC20Mintable {
  constructor(string _name, string _symbol, uint8 _decimals)
    ERC20Detailed(_name, _symbol, _decimals)
    ERC20Mintable()
    ERC20()
    public
  {

  }
}
