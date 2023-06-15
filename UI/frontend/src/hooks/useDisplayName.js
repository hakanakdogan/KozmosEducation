import { useSelector } from "react-redux"

export const useDisplayName = () => {
    const data = useSelector(state => state.userInfo.displayName);
    return data;
}