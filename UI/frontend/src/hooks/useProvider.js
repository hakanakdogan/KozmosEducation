import { useSelector } from "react-redux"

export const useProvider = () => {
    const data = useSelector(state => state.userInfo.provider);
    return data;
}