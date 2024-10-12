import './App.css'
import LecturePage from './pages/LecturePage'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DptSecretary from './pages/DptSecretary'
import HODPage from './pages/HODPage'
import RegisterPage from './pages/RegisterPage'
import DeanPage from './pages/DeanPage'
import ExamDepartmentPage from './pages/ExamDepartmentPage'
import RegistarPage from './pages/RegistarPage'
import VCPage from './pages/VCPage'
import PublishedResultPage from './pages/PublishedResultPage'
import AdminPage from './pages/AdminPage'
function App() {
  
  return (
    
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/lecture' element={<LecturePage />} />
          <Route path='/dptSecretary' element={<DptSecretary/>} />
          <Route path='/hod' element={<HODPage/>} />
          <Route path='/dean' element={<DeanPage/>} />
          <Route path='/examDepartment' element={<ExamDepartmentPage />} />
          <Route path='/registar' element={<RegistarPage />} />
          <Route path='/vc' element={<VCPage />} />
          <Route path='/publishedResult' element={<PublishedResultPage />} />
          <Route path='/admin' element={<AdminPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
