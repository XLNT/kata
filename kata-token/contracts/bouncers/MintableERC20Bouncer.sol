pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "openzeppelin-solidity/contracts/access/SignatureBouncer.sol";


contract MintableERC20Bouncer is SignatureBouncer {

  uint256 public nonce;

  modifier validDataWithoutSender(bytes _signature)
  {
    require(_isValidSignatureAndData(address(this), _signature), "INVALID_SIGNATURE");
    _;
  }

  constructor(address _bouncer)
    public
  {
    addBouncer(_bouncer);
  }

  /**
   * allow anyone with a valid bouncer signature for the msg data to mint `_amount` of `_token` to `_to`
   */
  function mint(uint256 _nonce, ERC20Mintable _token, address _to, uint256 _amount, bytes _signature)
    public
    validDataWithoutSender(_signature)
  {
    require(_nonce > nonce, "NONCE_GT_NONCE_REQUIRED");
    nonce = _nonce;
    _token.mint(_to, _amount);
  }
}
