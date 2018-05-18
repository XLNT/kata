import ERC721MinterArtifact from '../artifacts/ERC721Minter.json'

export default (web3, currentAccount, address) => {
  return new web3.eth.Contract(
    ERC721MinterArtifact.abi,
    address,
    {
      data: ERC721MinterArtifact.bytecode,
      from: currentAccount,
    }
  )
}
