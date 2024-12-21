import { ethers } from 'ethers';

// Smart contract ABI - replace with your actual contract ABI
const CONTRACT_ABI = [
  "function buy() public payable",
  "function getTransactionHistory(address user) public view returns (uint256[])",
];

// Contract address
const CONTRACT_ADDRESS = "0x9177E4c474f111689eD87937eeAd5FFd84A2474B";

export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    
    return { provider, signer, account: accounts[0] };
  } catch (error) {
    console.error("Error connecting to wallet:", error);
    throw error;
  }
};

export const buyBTZ = async (amount: string) => {
  try {
    const { signer } = await connectWallet();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    
    // Convert amount to Wei (assuming 18 decimals)
    const value = ethers.parseEther(amount);
    
    const tx = await contract.buy({ value });
    const receipt = await tx.wait();
    
    return receipt;
  } catch (error) {import { ethers } from 'ethers';

// Smart contract ABI
const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "buy",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getTransactionHistory",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Contract address
const CONTRACT_ADDRESS = "0x9177E4c474f111689eD87937eeAd5FFd84A2474B";

export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    
    return { provider, signer, account: accounts[0] };
  } catch (error) {
    console.error("Error connecting to wallet:", error);
    throw error;
  }
};

export const buyBTZ = async (amount) => {
  try {
    const { signer } = await connectWallet();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    
    // Convert amount to Wei (assuming 18 decimals)
    const value = ethers.parseEther(amount);
    
    const tx = await contract.buy({ value });
    const receipt = await tx.wait();
    
    return receipt;
  } catch (error) {
    console.error("Error buying BTZ:", error);
    throw error;
  }
};

export const getTransactionHistory = async (address) => {
  try {
    const { provider } = await connectWallet();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    
    const history = await contract.getTransactionHistory(address);
    return history;
  } catch (error) {
    console.error("Error getting transaction history:", error);
    throw error;
  }
};

    console.error("Error buying BTZ:", error);
    throw error;
  }
};

export const getTransactionHistory = async (address: string) => {
  try {
    const { provider } = await connectWallet();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    
    const history = await contract.getTransactionHistory(address);
    return history;
  } catch (error) {
    console.error("Error getting transaction history:", error);
    throw error;
  }
};
