import { BigNumber, ethers } from "ethers"

export const convertBigNumberToNumber = (bigNumber) => {
  return ethers.utils.formatEther(BigNumber.from(bigNumber).toString());
}