import { useState } from "react";
import testsService from "../services/answers.service";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ALL_CATEGORIES = [
  { key: "Beck1", label: "Beck BAI" },
  { key: "Beck", label: "Beck BDI-2" },
  { key: "Lynn", label: "Peter Honey" },
  { key: "Peter", label: "Lynn O'Brien" },
  { key: "ofimatica-1RO", label: "Ofimática 1RO" },
  { key: "ofimatica-2DO", label: "Ofimática 2DO" },
  { key: "ofimatica-3RO", label: "Ofimática 3RO" },
];

const StudentsList = () => {
  const [grade, setGrade] = useState("");
  const [group, setGroup] = useState("");
  const [category, setCategory] = useState("");
  const [students, setStudents] = useState([]);
  const [viewMode, setViewMode] = useState("grade"); // "grade" o "category"

  const handleSearch = async () => {
    try {
      if (viewMode === "grade" && grade) {
        const params = { grade };
        const response = await testsService.getStudentsByGrade(params);
        const data = response.data;
        setStudents(Array.isArray(data) ? data : []);
      } else if (viewMode === "category" && grade && group && category) {
        const params = { grade, group, category };
        const response = await testsService.getStudentsByGroupAndCategory(params);
        const data = response.data;
        setStudents(Array.isArray(data) ? data : []);
      } else {
        alert("Selecciona los filtros requeridos según el modo de consulta.");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();

    if (viewMode === "grade") {
      const title = `Resultados por Grado - ${grade}`;
      const textWidth = doc.getTextWidth(title);
      doc.text(title, (pageWidth - textWidth) / 2, 10);
      doc.setFontSize(10);
      doc.text(`GRADO: ${grade}`, 10, 18);

      const tableColumns = ["No.", "Nombre", "Apellido", "Grupo", ...ALL_CATEGORIES.map(c => c.label)];
      const tableRows = students.map((student, index) => [
        index + 1,
        student.name,
        student.lastname,
        student.group,
        ...ALL_CATEGORIES.map(cat => {
          const r = student[cat.key];
          if (!r || r.interpretation === "Sin resultado") return "-";
          return r.interpretation || r.score || "-";
        }),
      ]);

      autoTable(doc, {
        head: [tableColumns],
        body: tableRows,
        startY: 22,
        styles: { fontSize: 7, cellPadding: 2 },
        headStyles: { fillColor: [59, 130, 246] },
      });

      doc.save(`${grade}_resultados_todos_los_quiz.pdf`);
    } else {
      let title = "";
      let fileNameCategory = "";
      const categoryLabels = {
        Beck1: "Resultados Inventario de Ansiedad de Beck (BAI)",
        Beck: "Resultados Inventario de Depresión de Beck (BDI-2)",
        Lynn: "Resultados Estilos de Aprendizaje: Peter Honey-Alonso Gallego",
        Peter: "Resultados Estilos de Aprendizaje de Lynn O'Brien",
        "ofimatica-1RO": "Resultados Quiz de Ofimática - 1RO",
        "ofimatica-2DO": "Resultados Quiz de Ofimática - 2DO",
        "ofimatica-3RO": "Resultados Quiz de Ofimática - 3RO",
      };
      title = categoryLabels[category] || "Resultados";
      fileNameCategory = `_${category}`;

      const textWidth = doc.getTextWidth(title);
      doc.text(title, (pageWidth - textWidth) / 2, 10);
      doc.setFontSize(12);
      doc.text(`GRADO: ${grade}  GRUPO: ${group}`, 70, 20);

      const isOfimatica = category.startsWith("ofimatica");
      const tableColumns = isOfimatica
        ? ["No.", "Nombre", "Apellido", "Resultado"]
        : ["No.", "Nombre", "Apellido", "Resultado", "Interpretación"];

      const tableRows = students.map((student, index) => {
        if (isOfimatica) {
          return [index + 1, student.name, student.lastname, student.interpretation];
        }
        return [index + 1, student.name, student.lastname, student.score, student.interpretation];
      });

      autoTable(doc, {
        head: [tableColumns],
        body: tableRows,
        startY: 25,
      });

      doc.save(`${grade}_${group}_${fileNameCategory}.pdf`);
    }
  };

  const getInterpretation = (student, catKey) => {
    const r = student[catKey];
    if (!r || r.interpretation === "Sin resultado") return null;
    return r.interpretation || r.score || null;
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-col justify-between mb-4 w-full">
        <h1 className="text-2xl font-bold text-center">Lista de Estudiantes</h1>

        <div className="flex gap-2 my-4 justify-center">
          <button
            onClick={() => { setViewMode("grade"); setGroup(""); setCategory(""); setStudents([]); }}
            className={`px-4 py-2 rounded ${viewMode === "grade" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Consulta por Grado
          </button>
          <button
            onClick={() => { setViewMode("category"); setStudents([]); }}
            className={`px-4 py-2 rounded ${viewMode === "category" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Consulta por Categoría
          </button>
        </div>

        <div className="flex gap-4 my-4 justify-center items-end flex-wrap">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Grado</label>
            <select value={grade} onChange={(e) => setGrade(e.target.value)} className="border p-2">
              <option value="">Selecciona un grado</option>
              <option value="1RO">1RO</option>
              <option value="2DO">2DO</option>
              <option value="3RO">3RO</option>
            </select>
          </div>

          {viewMode === "category" && (
            <>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Grupo</label>
                <select value={group} onChange={(e) => setGroup(e.target.value)} className="border p-2">
                  <option value="">Selecciona un grupo</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Categoría</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2">
                  <option value="">Selecciona una categoría</option>
                  <option value="Beck1">Beck BAI</option>
                  <option value="Beck">Beck BDI-2</option>
                  <option value="Lynn">Peter Honey-Alonso Gallego</option>
                  <option value="Peter">Lynn O'Brien</option>
                  <option value="ofimatica-1RO">Ofimática - 1RO</option>
                  <option value="ofimatica-2DO">Ofimática - 2DO</option>
                  <option value="ofimatica-3RO">Ofimática - 3RO</option>
                </select>
              </div>
            </>
          )}

          <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
            Buscar
          </button>
        </div>
      </div>

      {viewMode === "grade" ? (
        <div className="w-full overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">No.</th>
                <th className="border px-2 py-1">Nombre</th>
                <th className="border px-2 py-1">Apellido</th>
                <th className="border px-2 py-1">Grado</th>
                <th className="border px-2 py-1">Grupo</th>
                {ALL_CATEGORIES.map((cat) => (
                  <th key={cat.key} className="border px-2 py-1 text-center" style={{ minWidth: "90px" }}>
                    {cat.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-2 py-1 text-center">{index + 1}</td>
                    <td className="border px-2 py-1">{student.name}</td>
                    <td className="border px-2 py-1">{student.lastname}</td>
                    <td className="border px-2 py-1 text-center">{student.grade}</td>
                    <td className="border px-2 py-1 text-center">{student.group}</td>
                    {ALL_CATEGORIES.map((cat) => {
                      const val = getInterpretation(student, cat.key);
                      const isOfimatica = cat.key.startsWith("ofimatica");
                      return (
                        <td
                          key={cat.key}
                          className={`border px-2 py-1 text-center text-xs ${
                            val
                              ? isOfimatica
                                ? "font-bold text-rose-800"
                                : "text-gray-800"
                              : "text-gray-400"
                          }`}
                        >
                          {val || "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5 + ALL_CATEGORIES.length} className="border px-4 py-2 text-center">
                    No hay estudiantes para mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">No.</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Apellido</th>
              <th className="border px-4 py-2">Grado</th>
              <th className="border px-4 py-2">Grupo</th>
              <th className="border px-4 py-2" colSpan={2}>Resultado</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => {
                const isOfimatica = category.startsWith("ofimatica");
                return (
                  <tr key={index}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{student.name}</td>
                    <td className="border px-4 py-2">{student.lastname}</td>
                    <td className="border px-4 py-2">{student.grade}</td>
                    <td className="border px-4 py-2">{student.group}</td>
                    {isOfimatica ? (
                      <td className="border px-4 py-2 font-bold text-rose-800" colSpan={2}>{student.interpretation}</td>
                    ) : (
                      <>
                        <td className="border px-4 py-2">{student.score}</td>
                        <td className="border px-4 py-2">{student.interpretation}</td>
                      </>
                    )}
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
      )}

      <div className="mt-4">
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
