# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


const specificDate = new Date("2024-09-24T00:00:00Z"); // Fecha específica
const nextDay = new Date("2024-09-25T00:00:00Z"); // Día siguiente para el filtro

db.answers.aggregate([
    {
        $match: {
            createdAt: { $gte: specificDate, $lt: nextDay } // Filtra por fecha
        }
    },
    {
        $lookup: {
            from: "students",
            localField: "studentId",
            foreignField: "_id",
            as: "studentInfo"
        }
    },
    { $unwind: "$studentInfo" },
    {
        $group: {
            _id: "$studentId", // Agrupamos solo por studentId
            name: { $first: "$studentInfo.name" }, // Captura el primer nombre
            lastname: { $first: "$studentInfo.lastname" }, // Captura el primer apellido
            grade: { $first: "$studentInfo.grade" }, // Captura el primer grado
            group: { $first: "$studentInfo.group" }, // Captura el primer grupo
            count: { $sum: 1 }, // Cuenta el número de registros
            records: { $push: { result: "$result", createdAt: "$createdAt" } } // Guarda los registros
        }
    },
    {
        $match: {
            count: { $gt: 2 } // Filtra para tener solo aquellos con más de dos registros
        }
    },
    {
        $project: {
            _id: 0,
            studentId: "$_id", // Muestra el studentId agrupado
            name: 1,
            lastname: 1,
            grade: 1,
            group: 1,
            count: 1,
            records: 1
        }
    },
    {
        $sort: {
            grade: 1, // Ordena por grado (1 para ascendente)
            group: 1  // Luego ordena por grupo (1 para ascendente)
        }
    }
])