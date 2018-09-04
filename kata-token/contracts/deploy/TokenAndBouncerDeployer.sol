pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../tokens/KataToken.sol";
import "../bouncers/MintableERC20Bouncer.sol";


contract TokenAndBouncerDeployer is Ownable {
  event Deployed(address indexed token, address indexed bouncer);

  function deploy(
    string _name,
    string _symbol,
    uint8 _decimals,
    string _tokenURI,
    address _signer
  )
    public
    onlyOwner
  {
    MintableERC20Bouncer bouncer = new MintableERC20Bouncer(_signer);
    KataToken token = new KataToken(_name, _symbol, _decimals, _tokenURI);
    token.transferOwnership(address(bouncer));

    emit Deployed(address(token), address(bouncer));

    selfdestruct(msg.sender);
  }
}
