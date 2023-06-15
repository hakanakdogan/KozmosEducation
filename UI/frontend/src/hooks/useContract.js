import { useSelector } from "react-redux"

export const useContract = () => {
    const data = useSelector(state => state.contractInfo.transferContract);
    return data;
}