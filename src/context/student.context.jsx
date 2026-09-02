import { createContext, useEffect, useState } from 'react';

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [studentId, setStudentId] = useState(null);
  const [grade, setGrade] = useState(null);

    // Cargar el studentId y grade desde localStorage al iniciar la aplicación
    useEffect(() => {
      const storedStudentId = localStorage.getItem('studentId');
      const storedGrade = localStorage.getItem('studentGrade');
      if (storedStudentId) {
        setStudentId(storedStudentId);
      }
      if (storedGrade) {
        setGrade(storedGrade);
      }
    }, []);
  
    // Función para actualizar el contexto y localStorage
    const updateStudentId = (id) => {
      setStudentId(id);
      localStorage.setItem('studentId', id);  // Guardar en localStorage
    };

    const updateGrade = (g) => {
      setGrade(g);
      localStorage.setItem('studentGrade', g);
    };
  
    // Función para borrar el studentId del contexto y localStorage
    const clearStudentId = () => {
      setStudentId(null);
      setGrade(null);
      localStorage.removeItem('studentId');  // Eliminar del localStorage
      localStorage.removeItem('studentGrade');
    };

  return (
    <StudentContext.Provider value={{ studentId, grade, updateStudentId, updateGrade, clearStudentId }}>
      {children}
    </StudentContext.Provider>
  );
};

