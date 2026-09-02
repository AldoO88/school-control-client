import { useEffect, useState } from "react";
import studentsService from "../services/students.service";
import testsService from "../services/tests.service";

const QUIZ_CATEGORIES = ["ofimatica-1RO", "ofimatica-2DO", "ofimatica-3RO"];

const QuizOfiTeacherList = () => {
  const [students, setStudents] = useState([]);
  const [answersByStudent, setAnswersByStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [gradeFilter, setGradeFilter] = useState("");
  const [groupFilter, setGroupFilter] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const studentsRes = await studentsService.getAllStudents();
        const allStudents = studentsRes.data || [];

        const answersMap = {};
        await Promise.all(
          allStudents.map(async (student) => {
            try {
              const res = await testsService.getAnsweredTest(student._id);
              answersMap[student._id] = res.data || [];
            } catch (err) {
              answersMap[student._id] = [];
            }
          })
        );

        setStudents(allStudents);
        setAnswersByStudent(answersMap);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const findResult = (studentId, category) => {
    const list = answersByStudent[studentId] || [];
    return list.find((a) => a.test === category);
  };

  const filtered = students.filter((s) => {
    if (gradeFilter && s.grade !== gradeFilter) return false;
    if (groupFilter && s.group !== groupFilter) return false;
    return true;
  });

  const grouped = filtered.reduce((acc, student) => {
    const key = `${student.grade}-${student.group}`;
    if (!acc[key]) acc[key] = { grade: student.grade, group: student.group, students: [] };
    acc[key].students.push(student);
    return acc;
  }, {});

  const groupedArray = Object.values(grouped).sort((a, b) => {
    if (a.grade !== b.grade) return a.grade.localeCompare(b.grade);
    return a.group.localeCompare(b.group);
  });

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 p-4">
        Quizzes de Ofimática - Resultados por Grupo
      </h2>

      <div className="flex flex-row gap-4 p-4">
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700 mb-1">Grado</label>
          <select
            className="text-gray-700 border border-gray-300 rounded py-2 px-4"
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="1RO">1RO</option>
            <option value="2DO">2DO</option>
            <option value="3RO">3RO</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700 mb-1">Grupo</label>
          <select
            className="text-gray-700 border border-gray-300 rounded py-2 px-4"
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : groupedArray.length === 0 ? (
        <p className="p-4 text-gray-700">No hay estudiantes con esos filtros.</p>
      ) : (
        <div className="p-4 flex flex-col gap-6">
          {groupedArray.map((g) => (
            <div
              key={`${g.grade}-${g.group}`}
              className="relative overflow-x-auto shadow-md sm:rounded-lg"
            >
              <h3 className="text-lg font-bold text-gray-800 bg-gray-100 p-3">
                Grado {g.grade} - Grupo {g.group} ({g.students.length} alumnos)
              </h3>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Alumno</th>
                    {QUIZ_CATEGORIES.map((cat) => (
                      <th key={cat} scope="col" className="px-6 py-3">
                        {cat.replace("ofimatica-", "")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {g.students.map((student) => (
                    <tr
                      key={student._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {student.lastname}, {student.name}
                      </th>
                      {QUIZ_CATEGORIES.map((cat) => {
                        const result = findResult(student._id, cat);
                        return (
                          <td key={cat} className="px-6 py-4">
                            {result ? (
                              <span className="font-bold text-rose-800">
                                {result.result}
                              </span>
                            ) : (
                              <span className="inline-flex h-8 w-20 font-bold bg-yellow-300 items-center text-red-700 justify-center rounded-lg">
                                Pendiente
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizOfiTeacherList;