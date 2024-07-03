import { useEffect, useState } from "react"
import { getSubsById } from "../../services/subs-service";
import { ISubscription } from "../models/subscriptions";



export const subsDataHook = (id: string) => {
    const [subs, setSubs] = useState<ISubscription[]>([]);
    useEffect(() => {
        getSubscriptions();
    }, []);

    const getSubscriptions = () => {
        getSubsById(id).then((data) => {
            console.log(data)
            setSubs(data)
        });
    }
    return { subs, getSubscriptions }
}