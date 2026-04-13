import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div className="bg-primary bg-gradient rounded d-flex align-items-center justify-content-center" style={{width: '36px', height: '36px'}}>
            <i className="bi bi-wallet2 text-white fs-5"></i>
          </div>
          <span className="fw-bold">MyThreeApp</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="btn btn-outline-primary btn-sm ms-2">
                <i className="bi bi-box-arrow-in-right me-1"></i>
                Iniciar Sesión
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="btn btn-primary btn-sm ms-2">
                <i className="bi bi-person-plus me-1"></i>
                Registrarse
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
