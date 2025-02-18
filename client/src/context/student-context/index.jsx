import { createContext, useState } from "react";


export const StudentContext = createContext(null);

export function  StudenetProvider({children}){
   const [studentCoursesList, setStudentCoursesList] = useState([]);

    return <StudentContext.Provider value={studentCoursesList, setStudentCoursesList}>
    {children}
    </StudentContext.Provider>
}