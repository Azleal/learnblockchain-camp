const types = {
  // EIP712Domain: [{
  //     name: 'name',
  //     type: 'string'
  //   },
  //   {
  //     name: 'version',
  //     type: 'string'
  //   },
  //   {
  //     name: 'chainId',
  //     type: 'uint256'
  //   },
  //   {
  //     name: 'verifyingContract',
  //     type: 'address'
  //   },
  // ],
  Permit: [{
      name: 'owner',
      type: 'address'
    },
    {
      name: 'spender',
      type: 'address'
    },
    {
      name: 'value',
      type: 'uint256'
    },
    {
      name: 'nonce',
      type: 'uint256'
    },
    {
      name: 'deadline',
      type: 'uint256'
    }
  ]
}

function getDomainSeperator(name, version, chainId, verifyingContract){
  return {
    name,
    version,
    chainId,
    verifyingContract
  }
}

function getMessage(owner,
  spender,
  value,
  nonce,
  deadline){
  return {
    owner,
    spender,
    value,
    nonce,
    deadline
  }
}

function getPermitTypedDataFunction(domain ){
  return function(owner, spender,  value, nonce, deadline){
    const message = getMessage(owner, spender,  value, nonce, deadline)
    primaryType = "Permit"
    const data =  {
      types,
      primaryType,
      domain ,
      message
    }
    console.log("getPermitTypedDataFunction, data:",  data)
    return data
  }
}




module.exports = {
  getDomainSeperator,
  getPermitTypedDataFunction,
}