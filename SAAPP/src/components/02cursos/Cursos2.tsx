import { useEffect, useState } from "react"

const BASE_URL = "https://backend-subs-control.onrender.com/api/clase"

interface ICurso {
    id: string;
    nombre: string;
    costo: string;
}

export function Cursos2() {
    const [cursos, setCursos] = useState<ICurso[]>([]);
    const [showNew, setShowNew] = useState<boolean>(false);
    const [selectedCurso, setSelectedCurso] = useState<ICurso | null>(null);

    useEffect(() => {
        fetch(BASE_URL)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCursos(data)
            });



    }, []);

    const handleDeleteCurso = (id: string) => {
        fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        }).then((response) => response.json())
            .then(() => {
                setCursos(cursos.filter((curso) => curso.id !== id))
            });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const nombre = formData.get("nombre");
        const costo = formData.get("costo");


        if (selectedCurso) {
            const bodyData = {
                id: selectedCurso.id,
                nombre,
                costo,
            };
            doPut(bodyData)
        } else {
            const bodyData = {
                nombre,
                costo,
            };
            doPost(bodyData);
        }
    };
        const doPut = (bodyData: any) => {
            fetch(`${BASE_URL}/${bodyData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyData)
            })
                .then((response) => response.json())
                .then((data) => {
                    const newCursos = cursos.filter((curso: ICurso) => curso.id !== data.id);
                    setCursos([...newCursos, data]);
    
                    setCursos(
                        cursos.map((curso) =>
                            curso.id === data.id ? { ...curso, ...data } : curso)
                    )
                    setShowNew(false)
                });
        }
         const doPost = (bodyData: any)  => { 
        fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        })
            .then((response) => response.json())
            .then((data) => {
                setCursos([...cursos, data]);
                setShowNew(false)
            });
    }
    const handleUpdate = (curso: ICurso) => {
        setSelectedCurso(curso)
        setShowNew(true);
    }

    const handleAddCurso = () => {
        setShowNew(true);
        setSelectedCurso(null);
    };



    return (
        <>
            <section className="cursoSection">
                {showNew ? (

                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Curso" name="nombre" defaultValue={selectedCurso?.nombre}/>
                        <input type="text" placeholder="Costo" name="costo" defaultValue={selectedCurso?.costo}/>
                        <div>
                            <button type="submit">{selectedCurso ? "Actualizar" : "Guardar"}</button>
                            <button onClick={() => setShowNew(false)}>Cancelar</button>
                        </div>
                    </form>
                ) : (
                    <button onClick={handleAddCurso}>Agregar Curso</button>
                )}
            </section>

            <section style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {cursos.map((curso: ICurso) => (
                    <div key={curso.id}>
                        <h2>
                            {curso.nombre} ${curso.costo}
                        </h2>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button onClick={() => handleUpdate(curso)}>Actualizar</button>
                            <button onClick={() => handleDeleteCurso(curso.id)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}