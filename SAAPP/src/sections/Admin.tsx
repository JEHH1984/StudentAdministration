import { Navigate } from "react-router-dom"
import { useLoginStore } from "../store/useLoginStore";
import { Button } from "@mui/material";
import Dashboard from "./Dashboard";

export function Admin() {
    
    const {user} = useLoginStore();
    const { logout } = useLoginStore();

    return (
        <>
        <Dashboard/>
        <Button onClick={() => logout()}>Salir</Button>

        </>
    )
}