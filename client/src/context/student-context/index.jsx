import { createContext, useState } from "react";


export const StudentContext = createContext(null);

export default function  StudentProvider({children}){
   const [studentCoursesList, setStudentCoursesList] = useState([]);
     const [loadingState, setLoadingState] = useState(true);
   const [currentCourseDetailsId, setCurrentCourseDetailsId] = useState(null);
  const [studentBoughtCoursesList, setStudentBoughtCoursesList] = useState([]);
  const [studentCurrentCourseProgress, setStudentCurrentCourseProgress] =
    useState({});

    return <StudentContext.Provider value={{currentCourseDetailsId, setCurrentCourseDetailsId,studentCoursesList, setStudentCoursesList, loadingState, setLoadingState
     , studentBoughtCoursesList, setStudentBoughtCoursesList, studentCurrentCourseProgress, setStudentCurrentCourseProgress
    }}>
    {children}
    </StudentContext.Provider>
}