import { useState } from "react";
import testsService from "../services/answers.service";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const StudentsList = () => {
  const [grade, setGrade] = useState("");
  const [group, setGroup] = useState("");
  const [category, setCategory] = useState("");
  const [students, setStudents] = useState([]);

  const handleSearch = async () => {
    try {

      const params = { grade: grade, group: group, category: category };
      console.log("Fetching with params:", params);
      const response = await testsService.getStudentsByGroupAndCategory(params);
      const data = response.data;
      if(Array.isArray(data)) {
        setStudents(data);
      }else{
        console.error("Unexpected response format:", data);
        setStudents([]);
      }
      
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
  };

  // NUEVA FUNCIÓN PARA GENERAR PDF
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    let fileNameCategory = "lista_estudiantes.pdf";
    
    if(category === "Beck1"){
      const title = "Resultados Inventario de Ansiedad de Beck (BAI)";
      const textWidth = doc.getTextWidth(title);
      const x = (pageWidth - textWidth) / 2;
      doc.text(title, x, 10);
      fileNameCategory = "_Beck_BAI";
    }else if(category === "Beck"){
      const title = "Resultados Inventario de Depresión de Beck (BDI-2)";
      const textWidth = doc.getTextWidth(title);
      const x = (pageWidth - textWidth) / 2;
      doc.text(title, x, 10);
      fileNameCategory = "_Beck_BDI2";
    }else if(category === "Lynn"){
      const title = "Resultados Estilos de Aprendizaje: Peter Honey-Alonso Gallego";
      const textWidth = doc.getTextWidth(title);
      const x = (pageWidth - textWidth) / 2;
      doc.text(title, x, 10 );
      fileNameCategory = "_Peter_Honey";
    }
    else if(category === "Peter"){
      const title = "Resultados Estilos de Aprendizaje de Lynn O'Brien";
      const textWidth = doc.getTextWidth(title);
      const x = (pageWidth - textWidth) / 2;
      doc.text(title, x, 10);
      fileNameCategory = "_Lynn_OBrien";
    }
  
    doc.text(`GRADO: ${grade}  GRUPO: ${group}`, 70, 20);
    doc.setFontSize(12);
    const tableColumn = ["No.", "Nombre", "Apellido", "Resultado", "Interpretación"];
    const tableRows = [];

    students.forEach((student, index) => {
      tableRows.push([
        index + 1,
        student.name,
        student.lastname,
        student.score,
        student.interpretation,
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
    });

    
    doc.save(grade + "_" + group + "_" + fileNameCategory + ".pdf");
  };

  

  return (
    <div className="flex flex-col items-center p-4">
    <div className="flex flex-col justify-between mb-4">
      <h1 className="text-2xl font-bold text-center">Lista de Estudiantes</h1>
      <div className="flex gap-4 my-4">
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="border p-2"
        >
        <option value="">Selecciona un grado</option>
        <option value="1RO">1RO</option>
        <option value="2DO">2DO</option>
        <option value="3RO">3RO</option>
      </select>

    {/* Combobox para Grupo */}
    <select
      value={group}
      onChange={(e) => setGroup(e.target.value)}
      className="border p-2"
    >
      <option value="">Selecciona un grupo</option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
    </select>

    {/* Combobox para Categoría */}
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="border p-2"
    >
      <option value="">Selecciona una categoría</option>
      <option value="Beck1">Beck BAI</option>
      <option value="Beck">Beck BDI-2</option>
      <option value="Lynn">Estilos de Aprendizaje: Peter Honey-Alonso Gallego</option>
      <option value="Peter">Estilos de Aprendizaje de Lynn O Brien</option>
    </select>

        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2">
          Buscar
        </button>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">No.</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Apellido</th>
            <th className="border px-4 py-2">Grado</th>
            <th className="border px-4 py-2">Grupo</th>
            <th className="border px-4 py-2" colSpan={
              2
            }>Resultado</th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(students) && students.length > 0 ? (
  students.map((student, index) => {
   
    return (
      <tr key={index}>
        <td className="border px-4 py-2">{index + 1}</td>
        <td className="border px-4 py-2">{student.name}</td>
        <td className="border px-4 py-2">{student.lastname}</td>
        <td className="border px-4 py-2">{student.grade}</td>
        <td className="border px-4 py-2">{student.group}</td>
        <td className="border px-4 py-2">{student.score}</td>
        <td className="border px-4 py-2">{student.interpretation}</td>
      </tr>
    );
  })
) : (
  <tr>
    <td colSpan="6" className="border px-4 py-2 text-center">
      No hay estudiantes para mostrar.
    </td>
  </tr>
)}
        </tbody>
      </table>
    </div>
    <div>
      <button
          onClick={handleGeneratePDF}
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={students.length === 0}
        >
          Generar PDF
        </button>
    </div>
    </div>
  );
};

export default StudentsList;