pragma solidity ^0.4.24;

// import "./ClaimableTokenMinter.sol";
// import "./ClaimableToken.sol";


// contract ClaimableTokenDeployer {
//   ClaimableToken public token;
//   ClaimableTokenMinter public minter;

//   constructor(
//     string _name,
//     string _symbol,
//     string _tokenURI,
//     address _bouncer
//   )
//     public
//   {
//     token = new ClaimableToken(_name, _symbol, _tokenURI);
//     minter = new ClaimableTokenMinter(token);
//     token.addOwner(msg.sender);
//     token.addMinter(address(minter));
//     minter.addOwner(msg.sender);
//     minter.addBouncer(_bouncer);
//   }
// }
