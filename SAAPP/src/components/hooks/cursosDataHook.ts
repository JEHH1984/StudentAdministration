import { useEffect, useState } from "react"
import { ICurso } from "../../components/02cursos/model/curso";
import { getCursos2 } from "../../services/cursos2-services";

export const cursoDataHook = () => {
    const [cursos, setCursos] = useState<ICurso[]>([]);
    useEffect(() => {

        getCursos2().then((data) => {
            console.log(data)
            setCursos(data)
        });
    }, []);
    return { cursos }
}