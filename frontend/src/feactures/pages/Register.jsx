import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '') 
  : 'https://three-app-z1gz.onrender.com';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Por favor confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message || 'Error al registrar usuario' });
        setLoading(false);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      navigate('/dashboard');
    } catch {
      setErrors({ general: 'Error de conexión. Intenta más tarde.' });
    }
    
    setLoading(false);
  };

  return (
    <div className="register-page d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">Crear Cuenta</h2>
                  <p className="text-muted">Regístrate para comenzar</p>
                </div>

                {errors.general && (
                  <div className="alert alert-danger" role="alert">
                    {errors.general}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Juan Pérez"
                      autoComplete="name"
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      autoComplete="email"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      autoComplete="new-password"
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirmar Contraseña
                    </label>
                    <input
                      type="password"
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      autoComplete="new-password"
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">{errors.confirmPassword}</div>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    ) : null}
                    {loading ? 'Registrando...' : 'Crear Cuenta'}
                  </button>
                </form>

                <div className="text-center">
                  <p className="mb-0">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login">Inicia sesión aquí</Link>
                  </p>
                </div>

                <hr className="my-4" />

                <div className="text-center">
                  <Link to="/" className="text-muted text-decoration-none">
                    ← Volver al inicio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
