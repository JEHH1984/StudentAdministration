import { useEffect, useState } from "react";
import { StudentDetails } from "./model/StudentsDetails";
import { cursoDataHook } from "../hooks/cursosDataHook";

const BASE_URL = "https://backend-subs-control.onrender.com/api/alumno";

interface IStudent {
  id: string;
  nombre: string;
  apellido: string;
  uuid: string;
}

export function Students() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<IStudent[]>([]);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const { cursos } = cursoDataHook();

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data: any) => {
        setStudents(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    setFilteredStudents(students);
  }, [students]);

  const handleDelete = (id: string) => {
    const text = "¿seguro que deseas eliminar?";
    if (confirm(text) === true) {
      fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          setStudents(students.filter((student) => student.id !== id));
        });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nombre = formData.get("nombre");
    const apellido = formData.get("apellido");

    if (selectedStudent) {
      const bodyData = {
        id: selectedStudent.id,
        nombre,
        apellido,
        uuid: selectedStudent.uuid,
      };
      doPut(bodyData);
    } else {
      const bodyData = {
        nombre,
        apellido,
        uuid: crypto.randomUUID(),
      };
      doPost(bodyData);
    }
  };

  const doPut = (bodyData: any) => {
    fetch(`${BASE_URL}/${bodyData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((data) => {
        const newStudents = students.filter(
          (student: IStudent) => student.id !== data.id
        );
        setStudents([...newStudents, data]);

        setStudents(
          students.map((student) =>
            student.id === data.id ? { ...student, ...data } : student
          )
        );
        setShowNew(false);
      });
  };
  const doPost = (bodyData: any) => {
    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((data) => {
        setStudents([...students, data]);
        setShowNew(false);
      });
  };
  const handleUpdate = (student: IStudent) => {
    setSelectedStudent(student);
    setShowNew(true);
  };

  const handleEdit = (student: IStudent) => {
    setSelectedStudent(student);
    setShowDetails(true);
    setShowNew(false);
  };

  const handleAddStudent = () => {
    setShowNew(true);
    setSelectedStudent(null);
  };
  const handleSubmitFilter = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get("search") as string;
    const filteredStudents = students.filter(
      (student: IStudent) =>
        student.nombre.toLowerCase().includes(search) ||
        student.apellido.toLowerCase().includes(search)
    );

    console.log(search);

    setFilteredStudents(filteredStudents);
  };

  if (showDetails && selectedStudent !== null) {
    return (
      <StudentDetails
        student={selectedStudent}
        cursos={cursos}
        setShowDetails={setShowDetails}
      />
    );
  }

  return (
    <>
      <section>
        <form onSubmit={handleSubmitFilter}>
          <label>Search</label>
          <input type="text" name="search" />
          <button type="submit">Search</button>
        </form>
      </section>
      <section className="studentSection">
        {showNew ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              name="nombre"
              defaultValue={selectedStudent?.nombre}
            />
            <input
              type="text"
              placeholder="Apellido"
              name="apellido"
              defaultValue={selectedStudent?.apellido}
            />
            <div>
              <button type="submit">
                {selectedStudent ? "Actualizar" : "Guardar"}
              </button>
              <button onClick={() => setShowNew(false)}>Cancelar</button>
            </div>
          </form>
        ) : (
          <button onClick={handleAddStudent}>Add student</button>
        )}
      </section>
      <section style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredStudents.map((student: IStudent) => (
          <div key={student.id}>
            <h2>
              {student.nombre} {student.apellido}
            </h2>

            <p>{student.uuid}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => handleUpdate(student)}>Actualizar</button>
              <button onClick={() => handleDelete(student.id)}>Eliminar</button>
              <button onClick={() => handleEdit(student)}>Editar</button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
