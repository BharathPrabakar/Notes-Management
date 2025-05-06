import './App.css'
import SignUp from './pages/signup'
import Login from './pages/login'
import CreateNote from './pages/CreateNote'
import EditNote from './pages/EditNote'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/edit/:id" element={<EditNote />} />
      </Routes>
    </Router>
  )
}

export default App