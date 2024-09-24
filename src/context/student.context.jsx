import { createContext, useEffect, useState } from 'react';

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [studentId, setStudentId] = useState(null);

    // Cargar el studentId desde localStorage al iniciar la aplicación
    useEffect(() => {
      const storedStudentId = localStorage.getItem('studentId');
      if (storedStudentId) {
        setStudentId(storedStudentId);
      }
    }, []);
  
    // Función para actualizar el contexto y localStorage
    const updateStudentId = (id) => {
      setStudentId(id);
      localStorage.setItem('studentId', id);  // Guardar en localStorage
    };
  
    // Función para borrar el studentId del contexto y localStorage
    const clearStudentId = () => {
      setStudentId(null);
      localStorage.removeItem('studentId');  // Eliminar del localStorage
    };

  return (
    <StudentContext.Provider value={{ studentId, updateStudentId, clearStudentId }}>
      {children}
    </StudentContext.Provider>
  );
};

