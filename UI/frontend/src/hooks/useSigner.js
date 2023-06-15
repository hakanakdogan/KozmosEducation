import { useSelector } from "react-redux"

export const useSigner = () => {
    const data = useSelector(state => state.userInfo.signer);
    return data;
}