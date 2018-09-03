pragma solidity ^0.4.24;

import "../tokens/KataToken.sol";
import "../bouncers/MintableERC20Bouncer.sol";


contract TokenAndBouncerDeployer {
  event Deployed(address indexed token, address indexed bouncer);

  constructor(
    string _name,
    string _symbol,
    uint8 _decimals,
    string _metadataUri,
    address _signer
  )
    public
  {
    MintableERC20Bouncer bouncer = new MintableERC20Bouncer(_signer);
    KataToken token = new KataToken(_name, _symbol, _decimals, _metadataUri);
    token.transferOwnership(address(bouncer));

    emit Deployed(address(token), address(bouncer));

    selfdestruct(msg.sender);
  }
}
