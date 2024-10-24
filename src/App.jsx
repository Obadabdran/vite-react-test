import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Addpost, Admin, Login,Mainpage,Register, Update} from './pages/index'
import {PrivateRoute} from './components/index'
import { getCurrentUser } from './auth/auth'


function App() {
  const currentUser = getCurrentUser()

  return (
  <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Mainpage/>}/>
        <Route
          path="/addpost"
          element={
            <PrivateRoute allowedRoles={['user']} user={currentUser}>
              <Addpost />
            </PrivateRoute>
          }
        />
        <Route path="/update" element={<Update/>}/>
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={['admin']} user={currentUser}>
              <Admin />
            </PrivateRoute>
          }
        />


      </Routes>
    </Router>
  )
}

export default App
