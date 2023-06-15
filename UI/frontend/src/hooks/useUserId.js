import { useSelector } from "react-redux"

export const useUserId = () => {
    const data = useSelector(state => state.userInfo.id);
    return data;
}