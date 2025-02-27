import { createContext, useState } from "react";


export const StudentContext = createContext(null);

export default function  StudentProvider({children}){
   const [studentCoursesList, setStudentCoursesList] = useState([]);
     const [loadingState, setLoadingState] = useState(true);

    return <StudentContext.Provider value={{studentCoursesList, setStudentCoursesList, loadingState, setLoadingState}}>
    {children}
    </StudentContext.Provider>
}