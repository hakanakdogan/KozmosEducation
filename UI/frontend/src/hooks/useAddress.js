import { useSelector } from "react-redux"

export const useAddress = () => {
    const data = useSelector(state => state.userInfo.address);
    return data;
}