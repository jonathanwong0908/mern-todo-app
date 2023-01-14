import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Dashboard /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
