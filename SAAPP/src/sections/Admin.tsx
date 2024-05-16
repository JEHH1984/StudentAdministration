import { Navigate } from "react-router-dom"
import { useLoginStore } from "../store/useLoginStore";
import { Button } from "@mui/material";

export function Admin() {
    
    const {user} = useLoginStore();
    const { logout } = useLoginStore();

    return (
        <>
        <h1>admin</h1>
        <h2>Bienvenido: {user}</h2>
        <Button onClick={() => logout()}>Salir</Button>
        </>
    )
}