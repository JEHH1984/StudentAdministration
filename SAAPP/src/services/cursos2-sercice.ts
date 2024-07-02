import { ICursoRequest } from "../components/02cursos/model/curso";

const BASE_URL = "https://backend-subs-control.onrender.com/api/clase";


export async function getCursos2 () {
    const response = await fetch(BASE_URL);
    const data = await response.json();
return data;
}


export async function saveCourses(body: ICursoRequest, isNew: boolean){
    if(isNew){
        return postCourses(body);
    } else {
        return postCourses(body);
    }
}

export async function postCourses (body: ICursoRequest) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        const data = await response.json();
        return data
    
}

export async function putCursos(body: ICursoRequest) {
    const response = await fetch(`${BASE_URL}/${body.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    return await response.json();
}


export async function deleteCurso(id: string){
   const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    })
    const data = await response.json();
    return data;
}