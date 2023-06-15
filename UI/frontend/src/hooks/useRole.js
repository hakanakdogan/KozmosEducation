import { useSelector } from "react-redux"

export const useRole = () => {
    const data = useSelector(state => state.userInfo.role);
    return data;
}