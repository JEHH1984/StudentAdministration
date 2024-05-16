import { Navigate, Outlet } from "react-router-dom";
import { useLoginStore } from "../store/useLoginStore";

export function ProtectedRouter(){
    const {isLoggedIn} = useLoginStore();
    
    if(!isLoggedIn){
        return <Navigate to="/"/>;
    }
    return <Outlet/>;
}