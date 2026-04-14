import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './feactures/layout/Header';
import Footer from './feactures/layout/Footer';
import Landing from './feactures/pages/Landing';
import Login from './feactures/pages/Login';
import Register from './feactures/pages/Register';
import RecoverPassword from './feactures/pages/RecoverPassword';
import Dashboard from './feactures/pages/Dashboard';
import { ApiRyC_Axios } from './feactures/api/components/ApiRyC_Axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './shared/App.css';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recover" element={<RecoverPassword />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/rick-morty" element={<ApiRyC_Axios />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
