import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

export async function sendToken(to: string, tokenAddress: string) {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const contract = new ethers.Contract(tokenAddress, [
    "function transfer(address to, uint256 value) public returns (bool)"
  ], wallet);

  const tx = await contract.transfer(to, ethers.parseUnits("1", 18));
  await tx.wait();

  console.log("Sent reward to", to);
  return tx.hash;
}