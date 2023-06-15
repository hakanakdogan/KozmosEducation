import { useSelector } from "react-redux"

export const useIsWalletConnected = () => {
    const data = useSelector(state => state.userInfo.isWalletConnected);
    return data;
}