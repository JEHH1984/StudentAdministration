import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import SignIn from './sections/SignIn'
import { Admin } from './sections/Admin'
import { ProtectedRouter } from './components/ProtectedRouter'
import { useEffect } from 'react'
import { useLoginStore } from './store/useLoginStore'

function App() {
  const { login } = useLoginStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = window.localStorage.getItem("user_token");
    if (user) {
      login(user);
      navigate("/admin")
    }
  }, []);

  return (
    <>
    <h1>ESCUELA DE MÚSICA DANONINO</h1>
    <Routes>
      <Route path="/" element={<SignIn/>}/>
      <Route element={<ProtectedRouter/>}>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/other" element={<h1>Otra página</h1>}/>
      </Route>
    </Routes>
      
    </>
  );
}

export default App
