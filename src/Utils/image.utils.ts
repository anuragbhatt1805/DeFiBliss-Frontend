import {
  Transaction,
  TransactionRequest,
  DownloadResult,
  DownloadedTransaction,
} from "./interface";
import { ethers } from "ethers";

const contractABI = [
  {
    inputs: [{ internalType: "address", name: "_owner", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "invalidInput", type: "error" },
  { inputs: [], name: "invalidUser", type: "error" },
  { inputs: [], name: "invalidUserName", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "_walletAddress", type: "address" },
    ],
    name: "getArtistUsername",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_signature", type: "string" },
      { internalType: "string", name: "_username", type: "string" },
      { internalType: "address", name: "_walletAddress", type: "address" },
      { internalType: "uint256", name: "_timestamp", type: "uint256" },
    ],
    name: "saveArtist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contractABI2 = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_platformFeePercentage",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  { inputs: [], name: "ReentrancyGuardReentrantCall", type: "error" },
  { inputs: [], name: "feelimitexceed", type: "error" },
  { inputs: [], name: "invalidAmount", type: "error" },
  { inputs: [], name: "withdrawFail", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "artist",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformFee",
        type: "uint256",
      },
    ],
    name: "PaymentProcessed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newPercentage",
        type: "uint256",
      },
    ],
    name: "PlatformFeePercentageUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "getLastFeeCollected",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalFeesCollected",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastFeeCollected",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "platformFeePercentage",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "artist", type: "address" },
    ],
    name: "purchaseArt",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_platformFeePercentage",
        type: "uint256",
      },
    ],
    name: "setPlatformFeePercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalFeesCollected",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contractAddressProfile = "0xF5660dFB252251b2bAF542297F39969086178255";
const contractAddressPayment = "0xebAFB4095300FB820642Bdd03c1B73052E40fb21";
const provider = new ethers.BrowserProvider((window as any).ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(
  contractAddressProfile,
  contractABI,
  signer
);
const contract2 = new ethers.Contract(
  contractAddressPayment,
  contractABI2,
  signer
);
export const getTransactionId = async ({
  walletAddress,
  signature,
  username,
  timestamp,
}: TransactionRequest): Promise<Transaction> => {
  try {
    const tx = await contract.saveArtist(
      signature,
      username,
      walletAddress,
      timestamp
    );
    console.log("Transaction sent:", tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction mined:", receipt);
    return {
      transactionId: tx.hash,
    };
  } catch (error) {
    console.error("Error calling saveArtist:", error);
    throw error;
  }

  // return {
  //     transactionId: `${username}-${walletAddress}-${timestamp}-${signature}`
  // }
};

export const getDownloadProof = async ({
  userAddress,
  artistsAddress,
  amount,
}: DownloadedTransaction): Promise<DownloadResult> => {
  try {
    console.log(userAddress);
    const tx = await contract2.purchaseArt(
      artistsAddress,
      // ethers.parseUnits(amount.toString(), 18)
      { value: ethers.parseUnits(amount.toString(), 18) }
    ); // 18 decimal places
    console.log("Art purchase transaction sent:", tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("USDC transfer transaction mined:", receipt);
    return {
      success: true,
      transactionId: tx.hash,
    };
  } catch (error) {
    console.error("Error transferring USDC:", error);
    throw error;
  }
  // return {
  //     success: true,
  //     transactionId: `${userAddress}-${artistsAddress}-${amount}`
  // }
};
