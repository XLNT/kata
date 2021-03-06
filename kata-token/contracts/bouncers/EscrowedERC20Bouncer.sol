pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "openzeppelin-solidity/contracts/access/SignatureBouncer.sol";


contract EscrowedERC20Bouncer is SignatureBouncer {
  using SafeERC20 for IERC20;

  uint256 public nonce;

  modifier onlyBouncer()
  {
    require(isBouncer(msg.sender), "DOES_NOT_HAVE_BOUNCER_ROLE");
    _;
  }

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
   * allow anyone with a valid bouncer signature for the msg data to send `_amount` of `_token` to `_to`
   */
  function withdraw(uint256 _nonce, IERC20 _token, address _to, uint256 _amount, bytes _signature)
    public
    validDataWithoutSender(_signature)
  {
    require(_nonce > nonce, "NONCE_GT_NONCE_REQUIRED");
    nonce = _nonce;
    _token.safeTransfer(_to, _amount);
  }

  /**
   * Allow the bouncer to withdraw all of the ERC20 tokens in the contract
   */
  function withdrawAll(IERC20 _token, address _to)
    public
    onlyBouncer
  {
    _token.safeTransfer(_to, _token.balanceOf(address(this)));
  }
}
