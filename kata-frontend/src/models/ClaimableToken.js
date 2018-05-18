import ClaimableTokenArtifact from '../artifacts/ClaimableToken.json'

export default (web3, currentAccount, address) => {
  return new web3.eth.Contract(
    ClaimableTokenArtifact.abi,
    address,
    {
      data: ClaimableTokenArtifact.bytecode,
      from: currentAccount,
    }
  )
}
