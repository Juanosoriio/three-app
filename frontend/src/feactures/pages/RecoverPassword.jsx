import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || '/api';

function RecoverPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [resetToken, setResetToken] = useState(null)
  const [manualToken, setManualToken] = useState('')

  const handleManualToken = (e) => {
    e.preventDefault()
    if (manualToken.trim()) {
      navigate(`/recover?token=${manualToken.trim()}`)
    }
  }

  const handleRequestReset = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!email) {
      setError('Por favor ingresa tu correo electrónico')
      setLoading(false)
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor ingresa un correo válido')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_URL}/recover`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Error al procesar solicitud')
        setLoading(false)
        return
      }

      if (data.resetToken) {
        setResetToken(data.resetToken)
      }

      setEnviado(true)
    } catch (err) {
      setError('Error de conexión. Asegúrate de que el backend esté corriendo.')
      console.error('Recover error:', err)
    }

    setLoading(false)
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!password || !confirmPassword) {
      setError('Por favor completa todos los campos')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Error al restablecer contraseña')
        setLoading(false)
        return
      }

      setSuccess(true)
    } catch (err) {
      setError('Error de conexión. Asegúrate de que el backend esté corriendo.')
      console.error('Reset error:', err)
    }

    setLoading(false)
  }

  if (token) {
    if (success) {
      return (
        <div className="recover-page d-flex align-items-center justify-content-center min-vh-100 bg-light">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-5 col-lg-4">
                <div className="card shadow-sm border-0">
                  <div className="card-body p-4 text-center">
                    <div className="mb-3">
                      <i className="bi bi-check-circle-fill text-success display-1"></i>
                    </div>
                    <h4 className="fw-bold mb-3">¡Contraseña Restablecida!</h4>
                    <p className="text-muted mb-4">
                      Tu contraseña ha sido actualizada exitosamente.
                    </p>
                    <Link to="/login" className="btn btn-primary">
                      Iniciar Sesión
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="recover-page d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5 col-lg-4">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <h2 className="fw-bold">Nueva Contraseña</h2>
                    <p className="text-muted">Ingresa tu nueva contraseña</p>
                  </div>

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleResetPassword}>
                    <div className="mb-3">
                      <label htmlFor="token" className="form-label">
                        Token de Recuperación
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="token"
                        value={token}
                        onChange={(e) => navigate(`/recover?token=${e.target.value}`)}
                        placeholder="Pega el token aquí"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirmar Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                      {loading ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      ) : null}
                      {loading ? 'Restableciendo...' : 'Cambiar Contraseña'}
                    </button>
                  </form>

                  <hr className="my-4" />

                  <div className="text-center">
                    <Link to="/login" className="text-muted text-decoration-none">
                      ← Volver a Iniciar Sesión
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (enviado && resetToken) {
    const resetUrl = `/recover?token=${resetToken}`
    return (
      <div className="recover-page d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5 col-lg-4">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4 text-center">
                  <div className="mb-3">
                    <i className="bi bi-key text-primary display-1"></i>
                  </div>
                  <h4 className="fw-bold mb-3">Token Generado</h4>
                  <p className="text-muted mb-3">
                    Copia el token y úsalo para restablecer tu contraseña:
                  </p>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" value={resetToken} readOnly />
                    <button className="btn btn-outline-secondary" onClick={() => navigator.clipboard.writeText(resetToken)}>
                      <i className="bi bi-clipboard"></i>
                    </button>
                  </div>
                  <Link to={resetUrl} className="btn btn-primary mb-3 d-block">
                    Restablecer Contraseña
                  </Link>
                  <Link to="/login" className="text-muted text-decoration-none small">
                    ← Volver a Iniciar Sesión
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (enviado) {
    return (
      <div className="recover-page d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5 col-lg-4">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4 text-center">
                  <div className="mb-3">
                    <i className="bi bi-envelope-check text-primary display-1"></i>
                  </div>
                  <h4 className="fw-bold mb-3">Correo Enviado</h4>
                  <p className="text-muted mb-4">
                    Si el correo existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.
                  </p>
                  <Link to="/login" className="btn btn-primary">
                    Volver a Iniciar Sesión
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="recover-page d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">¿Ya tienes el token?</h2>
                  <p className="text-muted">Ingresa el token directamente</p>
                </div>
                <form onSubmit={handleManualToken}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={manualToken}
                      onChange={(e) => setManualToken(e.target.value)}
                      placeholder="Pega el token aquí"
                    />
                  </div>
                  <button type="submit" className="btn btn-outline-primary w-100">
                    Usar Token
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-5 col-lg-4">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">Recuperar Contraseña</h2>
                  <p className="text-muted">O ingresa tu correo para recibir el enlace</p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleRequestReset}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    ) : null}
                    {loading ? 'Enviando...' : 'Enviar Enlace'}
                  </button>
                </form>

                <hr className="my-4" />

                <div className="text-center">
                  <Link to="/login" className="text-muted text-decoration-none">
                    ← Volver a Iniciar Sesión
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecoverPassword