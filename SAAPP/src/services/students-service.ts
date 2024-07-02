
import { IStudentRequest } from "../components/01students/model/student";

const BASE_URL = "https://backend-subs-control.onrender.com/api/alumno";


export async function getStudents() {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
}


export async function saveCourses(body: IStudentRequest, isNew: boolean) {
    if (isNew) {
        return postStudents(body);
    } else {
        return postStudents(body);
    }
}

export async function postStudents(body: IStudentRequest) {
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

export async function putStudents(body: IStudentRequest) {
    const response = await fetch(`${BASE_URL}/${body.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    return await response.json();
}


export async function deleteStudent(id: string) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    })
    const data = await response.json();
    return data;
}