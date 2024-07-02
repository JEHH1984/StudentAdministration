import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import SignIn from './sections/SignIn'
import { Admin } from './sections/Admin'
import { ProtectedRouter } from './components/ProtectedRouter'
import { useEffect } from 'react'
import { useLoginStore } from './store/useLoginStore'
import Dashboard from './sections/Dashboard'

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

      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route element={<ProtectedRouter />}>
          <Route path="/admin/*" element={<Dashboard />} />
         
        </Route>
      </Routes>

    </>
  );
}

export default App


