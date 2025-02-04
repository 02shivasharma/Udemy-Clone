import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthPage } from "./pages/auth"
import RouteGuard from "./components/route-guard"
import { useContext } from "react"
import { AuthContext } from "./context/auth-context"
import InstructorDashboardPage from "./pages/instructor"
import StudentViewCommonLayout from "./components/student-view/common-layout"
import StudentHomePage from "./pages/student/home"
import NotFound from "./pages/not-found"

function App() {
const { auth }  = useContext(AuthContext);
  return (
    <Router>
      <Routes>
       <Route 
        path="/auth"
        element={
          <RouteGuard
           authenticated={auth?.authenticate}
           user={auth?.user}
           element={<AuthPage />}
           />
        }
       />
       <Route 
        path="/instructor"
        element={<RouteGuard 
        authenticated={auth?.authenticate}
        user={auth?.user}
        element={<InstructorDashboardPage />}
        
        />}
       />
       <Route
       path="/"
       element={
        <RouteGuard 
         element={<StudentViewCommonLayout />}
          authenticated={auth?.authenticate}
          user={auth?.user}
          />
       }
       >
        <Route path="" element={<StudentHomePage />} />
        <Route path="home" element={<StudentHomePage />} />
       </Route>
       <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
