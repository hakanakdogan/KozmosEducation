import { useSelector } from "react-redux"

export const useUserName = () => {
    const data = useSelector(state => state.userInfo.userName);
    return data;
}