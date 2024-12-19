import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './components/Homepage.jsx'
import Register from './components/Register'
import Userprofile from './components/UserProfile'
import AddFormulaire from './components/Formulaire'
import AddDocument from './components/addDocument'
import DocumentPage from './components/DocumentsPage'
import Login from './components/Login'
import UpdateDemande from './components/UpdateDemande'
import FormulaireDetails from './components/FormulaireDetails'
import WorkerLogin from './components/WorkerLogin'
import WorkerProfile from './components/Worker/WorkerProfil'
import VerifyDemande from './components/Worker/VerifyDemande'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path='/user/profile' element={<Userprofile/>} />
        <Route path='/addformulaire' element={<AddFormulaire/>} />
        <Route path='/add_document' element={<AddDocument/>} />
        <Route path="/documents/:id" element={<DocumentPage />} />
        <Route path="/modify-demande/:id" element={<UpdateDemande />} />
        <Route path="/formulaire/:id" element={<FormulaireDetails />} />
        <Route path='/rekrowLogin' element={<WorkerLogin/>} />
        <Route path='/workerProfile' element={<WorkerProfile/>} />
        <Route path='/verify-demande/:id' element={<VerifyDemande/>} />
      </Routes>
    </Router>
  )
}

export default App