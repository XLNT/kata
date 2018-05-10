
// eslint-disable-next-line promise/avoid-new
const send = async (web3, method, params = []) => new Promise((resolve, reject) => {
  web3.currentProvider.sendAsync(
    {
      jsonrpc: '2.0',
      method,
      params,
      id: +(new Date()),
    },
    (err, result) => {
      if (err) { return reject(err) }
      if (result.error) { return reject(result.error) }
      return resolve(result.result)
    }
  )
})

export default async (web3, account, data) => {
  return send(web3, 'personal_sign', [
    web3.utils.toHex(data),
    account,
  ])
}
