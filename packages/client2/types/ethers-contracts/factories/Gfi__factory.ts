/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Gfi, GfiInterface } from "../Gfi";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "initialCap",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "who",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "cap",
        type: "uint256",
      },
    ],
    name: "CapUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "OWNER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PAUSER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "cap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_cap",
        type: "uint256",
      },
    ],
    name: "setCap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001eca38038062001eca8339810160408190526200003491620003f2565b8251839083906200004d906004906020850190620002af565b50805162000063906005906020840190620002af565b50506006805461ff001960ff199091166012171690555060078190556200009a60008051602062001eaa8339815191528562000149565b620000b560008051602062001e8a8339815191528562000149565b620000d060008051602062001e6a8339815191528562000149565b620000fa60008051602062001eaa83398151915260008051602062001e6a83398151915262000159565b6200012460008051602062001e8a83398151915260008051602062001e6a83398151915262000159565b6200013f60008051602062001e6a8339815191528062000159565b5050505062000480565b620001558282620001ab565b5050565b600082815260208190526040808220600201549051839285917fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff9190a460009182526020829052604090912060020155565b600082815260208181526040909120620001d091839062000ab962000224821b17901c565b156200015557620001e062000244565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60006200023b836001600160a01b03841662000248565b90505b92915050565b3390565b600062000256838362000297565b6200028e575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556200023e565b5060006200023e565b60009081526001919091016020526040902054151590565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620002f257805160ff191683800117855562000322565b8280016001018555821562000322579182015b828111156200032257825182559160200191906001019062000305565b506200033092915062000334565b5090565b5b8082111562000330576000815560010162000335565b600082601f8301126200035c578081fd5b81516001600160401b038082111562000373578283fd5b6040516020601f8401601f191682018101838111838210171562000395578586fd5b80604052508194508382528681858801011115620003b257600080fd5b600092505b83831015620003d65785830181015182840182015291820191620003b7565b83831115620003e85760008185840101525b5050505092915050565b6000806000806080858703121562000408578384fd5b84516001600160a01b03811681146200041f578485fd5b60208601519094506001600160401b03808211156200043c578485fd5b6200044a888389016200034b565b9450604087015191508082111562000460578384fd5b506200046f878288016200034b565b606096909601519497939650505050565b6119da80620004906000396000f3fe608060405234801561001057600080fd5b50600436106101da5760003560e01c806370a0823111610104578063a457c2d7116100a2578063d547741f11610071578063d547741f146103ab578063dd62ed3e146103be578063e58378bb146103d1578063e63ab1e9146103d9576101da565b8063a457c2d71461036a578063a9059cbb1461037d578063ca15c87314610390578063d5391393146103a3576101da565b80639010d07c116100de5780639010d07c1461032757806391d148541461034757806395d89b411461035a578063a217fddf14610362576101da565b806370a08231146102f957806379cc67901461030c5780638456cb591461031f576101da565b8063355274ea1161017c57806340c10f191161014b57806340c10f19146102b857806342966c68146102cb57806347786d37146102de5780635c975abb146102f1576101da565b8063355274ea1461028257806336568abe1461028a578063395093511461029d5780633f4ba83a146102b0576101da565b806323b872dd116101b857806323b872dd14610232578063248a9ca3146102455780632f2ff15d14610258578063313ce5671461026d576101da565b806306fdde03146101df578063095ea7b3146101fd57806318160ddd1461021d575b600080fd5b6101e76103e1565b6040516101f491906113b4565b60405180910390f35b61021061020b3660046112fa565b610477565b6040516101f491906113a0565b610225610495565b6040516101f491906113ab565b6102106102403660046112ba565b61049b565b610225610253366004611324565b610522565b61026b61026636600461133c565b610537565b005b610275610588565b6040516101f491906118c8565b610225610591565b61026b61029836600461133c565b610597565b6102106102ab3660046112fa565b6105d9565b61026b610627565b61026b6102c63660046112fa565b610679565b61026b6102d9366004611324565b610715565b61026b6102ec366004611324565b610729565b6102106107ea565b61022561030736600461126b565b6107f8565b61026b61031a3660046112fa565b610813565b61026b610868565b61033a61033536600461136b565b6108b8565b6040516101f4919061138c565b61021061035536600461133c565b6108d7565b6101e76108ef565b610225610950565b6102106103783660046112fa565b610955565b61021061038b3660046112fa565b6109bd565b61022561039e366004611324565b6109d1565b6102256109e8565b61026b6103b936600461133c565b610a0c565b6102256103cc366004611286565b610a46565b610225610a71565b610225610a95565b60048054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561046d5780601f106104425761010080835404028352916020019161046d565b820191906000526020600020905b81548152906001019060200180831161045057829003601f168201915b5050505050905090565b600061048b610484610ace565b8484610ad2565b5060015b92915050565b60035490565b60006104a8848484610b86565b610518846104b4610ace565b61051385604051806060016040528060288152602001611934602891396001600160a01b038a166000908152600260205260408120906104f2610ace565b6001600160a01b031681526020810191909152604001600020549190610c9b565b610ad2565b5060019392505050565b60009081526020819052604090206002015490565b60008281526020819052604090206002015461055590610355610ace565b61057a5760405162461bcd60e51b81526004016105719061148c565b60405180910390fd5b6105848282610cc7565b5050565b60065460ff1690565b60075481565b61059f610ace565b6001600160a01b0316816001600160a01b0316146105cf5760405162461bcd60e51b8152600401610571906117f8565b6105848282610d30565b600061048b6105e6610ace565b8461051385600260006105f7610ace565b6001600160a01b03908116825260208083019390935260409182016000908120918c168152925290205490610d99565b6106537f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a610355610ace565b61066f5760405162461bcd60e51b8152600401610571906115b9565b610677610dbe565b565b6106a57f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6610355610ace565b6106c15760405162461bcd60e51b8152600401610571906117d0565b6106c96107ea565b156106e65760405162461bcd60e51b815260040161057190611668565b6106ef81610e2d565b61070b5760405162461bcd60e51b815260040161057190611631565b6105848282610e4c565b610726610720610ace565b82610f0c565b50565b6107557fb19546dff01e856fb3f010c267a7b1c60363cf8a4664e21cc89c26224620214e610355610ace565b6107715760405162461bcd60e51b8152600401610571906116df565b610779610495565b8110156107985760405162461bcd60e51b815260040161057190611692565b60078190556107a5610ace565b6001600160a01b03167f32fb4810d3e24ba1aa970e73c47779c970d006f8e33c4f3b696dc6fce03b61c06007546040516107df91906113ab565b60405180910390a250565b600654610100900460ff1690565b6001600160a01b031660009081526001602052604090205490565b60006108458260405180606001604052806024815260200161195c6024913961083e866103cc610ace565b9190610c9b565b905061085983610853610ace565b83610ad2565b6108638383610f0c565b505050565b6108947f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a610355610ace565b6108b05760405162461bcd60e51b8152600401610571906115b9565b610677610fe2565b60008281526020819052604081206108d0908361103f565b9392505050565b60008281526020819052604081206108d0908361104b565b60058054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561046d5780601f106104425761010080835404028352916020019161046d565b600081565b600061048b610962610ace565b8461051385604051806060016040528060258152602001611980602591396002600061098c610ace565b6001600160a01b03908116825260208083019390935260409182016000908120918d16815292529020549190610c9b565b600061048b6109ca610ace565b8484610b86565b600081815260208190526040812061048f90611060565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b600082815260208190526040902060020154610a2a90610355610ace565b6105cf5760405162461bcd60e51b8152600401610571906115e1565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205490565b7fb19546dff01e856fb3f010c267a7b1c60363cf8a4664e21cc89c26224620214e81565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b60006108d0836001600160a01b03841661106b565b3390565b6001600160a01b038316610af85760405162461bcd60e51b81526004016105719061178c565b6001600160a01b038216610b1e5760405162461bcd60e51b815260040161057190611509565b6001600160a01b0380841660008181526002602090815260408083209487168084529490915290819020849055517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92590610b799085906113ab565b60405180910390a3505050565b6001600160a01b038316610bac5760405162461bcd60e51b815260040161057190611747565b6001600160a01b038216610bd25760405162461bcd60e51b815260040161057190611449565b610bdd8383836110b5565b610c1a8160405180606001604052806026815260200161190e602691396001600160a01b0386166000908152600160205260409020549190610c9b565b6001600160a01b038085166000908152600160205260408082209390935590841681522054610c499082610d99565b6001600160a01b0380841660008181526001602052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610b799085906113ab565b60008184841115610cbf5760405162461bcd60e51b815260040161057191906113b4565b505050900390565b6000828152602081905260409020610cdf9082610ab9565b1561058457610cec610ace565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000828152602081905260409020610d4890826110c0565b1561058457610d55610ace565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b6000828201838110156108d05760405162461bcd60e51b81526004016105719061154b565b610dc66107ea565b610de25760405162461bcd60e51b8152600401610571906114db565b6006805461ff00191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa610e16610ace565b604051610e23919061138c565b60405180910390a1565b6000600754610e4483610e3e610495565b90610d99565b111592915050565b6001600160a01b038216610e725760405162461bcd60e51b815260040161057190611847565b610e7e600083836110b5565b600354610e8b9082610d99565b6003556001600160a01b038216600090815260016020526040902054610eb19082610d99565b6001600160a01b0383166000818152600160205260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610f009085906113ab565b60405180910390a35050565b6001600160a01b038216610f325760405162461bcd60e51b815260040161057190611706565b610f3e826000836110b5565b610f7b816040518060600160405280602281526020016118ec602291396001600160a01b0385166000908152600160205260409020549190610c9b565b6001600160a01b038316600090815260016020526040902055600354610fa190826110d5565b6003556040516000906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610f009085906113ab565b610fea6107ea565b156110075760405162461bcd60e51b815260040161057190611668565b6006805461ff0019166101001790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610e16610ace565b60006108d083836110fd565b60006108d0836001600160a01b038416611142565b600061048f8261115a565b60006110778383611142565b6110ad5750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561048f565b50600061048f565b61086383838361115e565b60006108d0836001600160a01b03841661118e565b6000828211156110f75760405162461bcd60e51b815260040161057190611582565b50900390565b815460009082106111205760405162461bcd60e51b815260040161057190611407565b82600001828154811061112f57fe5b9060005260206000200154905092915050565b60009081526001919091016020526040902054151590565b5490565b611169838383610863565b6111716107ea565b156108635760405162461bcd60e51b81526004016105719061187e565b6000818152600183016020526040812054801561124a57835460001980830191908101906000908790839081106111c157fe5b90600052602060002001549050808760000184815481106111de57fe5b60009182526020808320909101929092558281526001898101909252604090209084019055865487908061120e57fe5b6001900381819060005260206000200160009055905586600101600087815260200190815260200160002060009055600194505050505061048f565b600091505061048f565b80356001600160a01b038116811461048f57600080fd5b60006020828403121561127c578081fd5b6108d08383611254565b60008060408385031215611298578081fd5b6112a28484611254565b91506112b18460208501611254565b90509250929050565b6000806000606084860312156112ce578081fd5b83356112d9816118d6565b925060208401356112e9816118d6565b929592945050506040919091013590565b6000806040838503121561130c578182fd5b6113168484611254565b946020939093013593505050565b600060208284031215611335578081fd5b5035919050565b6000806040838503121561134e578182fd5b823591506020830135611360816118d6565b809150509250929050565b6000806040838503121561137d578182fd5b50508035926020909101359150565b6001600160a01b0391909116815260200190565b901515815260200190565b90815260200190565b6000602080835283518082850152825b818110156113e0578581018301518582016040015282016113c4565b818111156113f15783604083870101525b50601f01601f1916929092016040019392505050565b60208082526022908201527f456e756d657261626c655365743a20696e646578206f7574206f6620626f756e604082015261647360f01b606082015260800190565b60208082526023908201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260408201526265737360e81b606082015260800190565b6020808252602f908201527f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60408201526e0818591b5a5b881d1bc819dc985b9d608a1b606082015260800190565b60208082526014908201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604082015260600190565b60208082526022908201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604082015261737360f01b606082015260800190565b6020808252601b908201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604082015260600190565b6020808252601e908201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604082015260600190565b6020808252600e908201526d26bab9ba103132903830bab9b2b960911b604082015260600190565b60208082526030908201527f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60408201526f2061646d696e20746f207265766f6b6560801b606082015260800190565b60208082526019908201527f43616e6e6f74206d696e74206d6f7265207468616e2063617000000000000000604082015260600190565b60208082526010908201526f14185d5cd8589b194e881c185d5cd95960821b604082015260600190565b6020808252602d908201527f43616e6e6f7420646563726561736520746865206361702062656c6f7720657860408201526c697374696e6720737570706c7960981b606082015260800190565b6020808252600d908201526c26bab9ba1031329037bbb732b960991b604082015260600190565b60208082526021908201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736040820152607360f81b606082015260800190565b60208082526025908201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604082015264647265737360d81b606082015260800190565b60208082526024908201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646040820152637265737360e01b606082015260800190565b6020808252600e908201526d26bab9ba1031329036b4b73a32b960911b604082015260600190565b6020808252602f908201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560408201526e103937b632b9903337b91039b2b63360891b606082015260800190565b6020808252601f908201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604082015260600190565b6020808252602a908201527f45524332305061757361626c653a20746f6b656e207472616e736665722077686040820152691a5b19481c185d5cd95960b21b606082015260800190565b60ff91909116815260200190565b6001600160a01b038116811461072657600080fdfe45524332303a206275726e20616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e20616d6f756e74206578636565647320616c6c6f77616e636545524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa2646970667358221220a5ee234337636ee82ab086eb5cf2e974e1047eb29944c3edef0432ead96c0dc864736f6c634300060c0033b19546dff01e856fb3f010c267a7b1c60363cf8a4664e21cc89c26224620214e65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6";

type GfiConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GfiConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Gfi__factory extends ContractFactory {
  constructor(...args: GfiConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Gfi";
  }

  deploy(
    owner: string,
    name: string,
    symbol: string,
    initialCap: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Gfi> {
    return super.deploy(
      owner,
      name,
      symbol,
      initialCap,
      overrides || {}
    ) as Promise<Gfi>;
  }
  getDeployTransaction(
    owner: string,
    name: string,
    symbol: string,
    initialCap: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      owner,
      name,
      symbol,
      initialCap,
      overrides || {}
    );
  }
  attach(address: string): Gfi {
    return super.attach(address) as Gfi;
  }
  connect(signer: Signer): Gfi__factory {
    return super.connect(signer) as Gfi__factory;
  }
  static readonly contractName: "Gfi";
  public readonly contractName: "Gfi";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GfiInterface {
    return new utils.Interface(_abi) as GfiInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Gfi {
    return new Contract(address, _abi, signerOrProvider) as Gfi;
  }
}
