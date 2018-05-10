import MintableERC721TokenArtifact from '../artifacts/MintableERC721Token.json'

export default (web3, currentAccount, address) => {
  return new web3.eth.Contract(
    MintableERC721TokenArtifact.abi,
    address,
    {
      data: MintableERC721TokenArtifact.bytecode,
      from: currentAccount,
    }
  )
}
