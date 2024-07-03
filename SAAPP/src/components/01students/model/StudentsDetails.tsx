import {
    Button,
    Card,
    CardContent,
    Typography
} from "@mui/material";
import { FormEvent } from "react";
import { subsDataHook } from "../../hooks/subsDataHook";
import {
    ISubscription,
    ISubscriptionRequest,
} from "../../models/subscriptions";
import { saveSubscription } from "../../../services/subs-service"
import { ICurso } from "../../02cursos/model/curso";
import { IStudent } from "../model/student";

export function StudentDetails({
    student,
    cursos,
    setShowDetails,
}: {
    student: IStudent;
    cursos: ICurso[];
    setShowDetails: (showDetails: boolean) => void;
}) {
    const { subs, getSubscriptions } = subsDataHook(student.id);

    const handleClick = async (
        e: FormEvent<HTMLFormElement>,
        curso: ICurso,
        sub: ISubscription | undefined
    ) => {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        const costo = form.get("costo") as string;
        const subscribed: boolean = !!sub?.estado;
        const model: ISubscriptionRequest = {
            id: sub?.id,
            alumno: student.id,
            clase: curso.id,
            costo: Number(costo ?? curso.costo),
            diaPago: 5,
            estado: subscribed ? 0 : 1,
        };
        console.log(model);
        await saveSubscription(model, !sub);
        getSubscriptions();
    };
    return (
        <>
            <section>
                <h2>
                    {student?.nombre} {student?.apellido}
                </h2>
                <p>{student?.uuid}</p>
                <button onClick={() => setShowDetails(false)}>Volver</button>
            </section>
            <section style={{ display: "flex", gap: "10px", flexFlow: "wrap" }}>
                {cursos?.map((curso: ICurso) => {
                    const sub = subs.find((sub: ISubscription) => sub.clase === curso.id);
                    const subActive = !!sub?.estado;
                    const buttonText = subActive ? "Cancelar" : "Inscribir";
                    const variantName = subActive ? "outlined" : "contained";
                    return (
                        <Card key={curso.id} sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {curso.nombre}
                                </Typography>
                                <form
                                    onSubmit={(e: FormEvent<HTMLFormElement>) =>
                                        handleClick(e, curso, sub)
                                    }
                                >
                                    <div key={sub?.costo ?? curso.costo}>
                                        <input
                                            defaultValue={sub?.costo ?? curso.costo}
                                            name="costo"
                                            style={{
                                                height: "35px",
                                                borderRadius: "5px",
                                                marginRight: "10px",
                                                paddingLeft: "10px",
                                            }}
                                        />

                                        <Button type="submit" variant={variantName}>
                                            {buttonText}{" "}
                                        </Button>
                                    </div>

                                </form>
                            </CardContent>
                        </Card>
                    );
                })}
            </section>
        </>
    );
}
