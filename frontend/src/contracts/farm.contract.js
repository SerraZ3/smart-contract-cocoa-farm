// importa o web3
import web3 from "./web3";
// Endereço do contrato gerado no deploy
const address = "0xDd7F929541887c547e46e053Dd3BF65Cc3F9e0B7";
// Abi gerada no deploy do contrato
const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "position",
        type: "uint256",
      },
    ],
    name: "buyHarvest",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "harvests",
    outputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "size",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "timestamp",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_size",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "_timestamp",
        type: "uint64",
      },
    ],
    name: "insertHarvest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "listHarvest",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "size",
            type: "uint256",
          },
          {
            internalType: "uint64",
            name: "timestamp",
            type: "uint64",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        internalType: "struct Harvest[]",
        name: "_harvests",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
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
    name: "owner",
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
];

//exporte o contrato
export default new web3.eth.Contract(abi, address);
