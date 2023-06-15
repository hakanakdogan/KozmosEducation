import { useSelector } from "react-redux"

export const useAccount = () => {
    const data = useSelector(state => state.userInfo.account);
    return data;
}