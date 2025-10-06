import React, { useState } from "react";
import { getStudentsByGroupAndCategory } from "../services/studentsService";

const StudentsList = () => {
  const [grade, setGrade] = useState("");
  const [group, setGroup] = useState("");
  const [category, setCategory] = useState("");
  const [students, setStudents] = useState([]);

  const handleSearch = async () => {
    try {
      const data = await getStudentsByGroupAndCategory(grade, group, category);
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Lista de Estudiantes</h1>
      <div className="flex gap-4 my-4">
        <input
          type="text"
          placeholder="Grado"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Grupo"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2">
          Buscar
        </button>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Apellido</th>
            <th className="border px-4 py-2">Grado</th>
            <th className="border px-4 py-2">Grupo</th>
            <th className="border px-4 py-2">Resultado</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.lastname}</td>
              <td className="border px-4 py-2">{student.grade}</td>
              <td className="border px-4 py-2">{student.group}</td>
              <td className="border px-4 py-2">{student.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsList;