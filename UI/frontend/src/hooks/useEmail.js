import { useSelector } from "react-redux"

export const useEmail = () => {
    const data = useSelector(state => state.userInfo.email);
    return data;
}