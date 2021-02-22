import web3 from '../web3';
const { FORWARDER_ADDRESSES } = require('./utils');
const ForwarderAbi = require('../../abi/Forwarder.json');
const { ethers } = require('ethers');

const RelayUrl = '/relay';
const MAX_GAS = 2e6;

const EIP712DomainType = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
];

const ForwardRequestType = [
  { name: 'from', type: 'address' },
  { name: 'to', type: 'address' },
  { name: 'value', type: 'uint256' },
  { name: 'gas', type: 'uint256' },
  { name: 'nonce', type: 'uint256' },
  { name: 'data', type: 'bytes' },
];

const TypedData = {
  domain: {
    name: 'Defender',
    version: '1',
    chainId: null,
    verifyingContract: null,
  },
  primaryType: 'ForwardRequest',
  types: {
    EIP712Domain: EIP712DomainType,
    ForwardRequest: ForwardRequestType,
  },
  message: {},
};

async function submitGaslessTransaction(contractAddress, unsentAction) {
  const provider = new ethers.providers.Web3Provider(web3.currentProvider);
  const signer = provider.getSigner();
  const from = await signer.getAddress();

  const network = await provider.getNetwork();
  const ForwarderAddress = FORWARDER_ADDRESSES[network.chainId];
  TypedData.domain.chainId = network.chainId;
  TypedData.domain.verifyingContract = ForwarderAddress;

  // Get nonce for current signer
  const forwarder = new ethers.Contract(ForwarderAddress, ForwarderAbi, provider);
  const nonce = await forwarder.getNonce(from).then(nonce => nonce.toString());

  const data = (await Promise.resolve(unsentAction)).encodeABI();

  // Encode meta-tx request
  const request = {
    from,
    to: contractAddress,
    value: 0,
    gas: MAX_GAS,
    nonce,
    data,
  };
  const toSign = { ...TypedData, message: request };

  // Directly call the JSON RPC interface, since ethers does not support signTypedDataV4 yet
  // See https://github.com/ethers-io/ethers.js/issues/830
  const signature = await provider.send('eth_signTypedData_v4', [from, JSON.stringify(toSign)]);

  const response = await fetch(RelayUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...request, signature }),
  }).then(
    r => r.json(),
    e => e.json(),
  );

  return response;
}

export { submitGaslessTransaction };
