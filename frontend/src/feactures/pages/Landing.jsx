import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="badge bg-primary bg-opacity-10 text-primary mb-3 px-3 py-2 rounded-pill">
                <i className="bi bi-people me-1"></i> Gestiona gastos compartidos
              </span>
              <h1 className="display-4 fw-bold mb-4">
                Controla tus gastos compartidos <span className="text-primary">fácilmente</span>
              </h1>
              <p className="lead text-muted mb-4">
                MyThreeApp te permite registrar, organizar y rastrear los gastos compartidos con tu familia, roommates o grupo. 
                Know кто paga qué y nunca más pierdas el control de tus finanzas compartidas.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/register" className="btn btn-primary btn-lg px-4">
                  <i className="bi bi-person-plus me-2"></i>
                  Comenzar Gratis
                </Link>
                <Link to="/login" className="btn btn-outline-dark btn-lg px-4">
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Ya tengo cuenta
                </Link>
                <a href="https://github.com/Juanosoriio/three-app" target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-lg px-4">
                  <i className="bi bi-github me-2"></i>
                  Ver en GitHub
                </a>
              </div>
              <div className="mt-4 d-flex gap-4 text-muted">
                <div><i className="bi bi-check-circle text-success me-2"></i>Sin tarjeta</div>
                <div><i className="bi bi-check-circle text-success me-2"></i>Gratis Forever</div>
                <div><i className="bi bi-check-circle text-success me-2"></i>100% Online</div>
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="hero-visual position-relative">
                <div className="card border-0 shadow-lg rounded-4 p-4 bg-white">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0"><i className="bi bi-wallet2 text-primary me-2"></i>Mis Gastos</h5>
                    <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill">
                      <i className="bi bi-graph-up me-1"></i> Este mes
                    </span>
                  </div>
                  <div className="mb-3 pb-3 border-bottom">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Total registrado</span>
                      <span className="fw-bold fs-4 text-primary">$1,250,000</span>
                    </div>
                  </div>
                  <div className="expense-item d-flex justify-content-between align-items-center mb-2 p-2 rounded bg-light">
                    <div className="d-flex align-items-center">
                      <div className="expense-icon bg-primary bg-opacity-10 rounded p-2 me-3">
                        <i className="bi bi-cart text-primary"></i>
                      </div>
                      <div>
                        <div className="fw-medium">Mercado</div>
                        <div className="small text-muted">Juan • Ayer</div>
                      </div>
                    </div>
                    <span className="fw-bold">$180,000</span>
                  </div>
                  <div className="expense-item d-flex justify-content-between align-items-center mb-2 p-2 rounded bg-light">
                    <div className="d-flex align-items-center">
                      <div className="expense-icon bg-warning bg-opacity-10 rounded p-2 me-3">
                        <i className="bi bi-car text-warning"></i>
                      </div>
                      <div>
                        <div className="fw-medium">Transporte</div>
                        <div className="small text-muted">Maria • Hace 2 días</div>
                      </div>
                    </div>
                    <span className="fw-bold">$45,000</span>
                  </div>
                  <div className="expense-item d-flex justify-content-between align-items-center p-2 rounded bg-light">
                    <div className="d-flex align-items-center">
                      <div className="expense-icon bg-success bg-opacity-10 rounded p-2 me-3">
                        <i className="bi bi-lightning text-success"></i>
                      </div>
                      <div>
                        <div className="fw-medium">Servicios</div>
                        <div className="small text-muted">Carlos • Hace 3 días</div>
                      </div>
                    </div>
                    <span className="fw-bold">$320,000</span>
                  </div>
                </div>
                <div className="floating-card position-absolute bg-white shadow-lg rounded p-3 d-none d-md-block" style={{top: '-20px', right: '-20px'}}>
                  <div className="d-flex align-items-center">
                    <div className="bg-success bg-opacity-10 rounded p-2 me-2">
                      <i className="bi bi-check-lg text-success"></i>
                    </div>
                    <div>
                      <div className="small text-muted">Balanceado</div>
                      <div className="fw-bold text-success">¡Perfecto!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Todo lo que necesitas para gestionar gastos</h2>
            <p className="text-muted">Simple, intuitivo y diseñado para facilitar la vida compartida</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
                <div className="feature-icon mb-3">
                  <div className="bg-primary bg-opacity-10 rounded p-3 d-inline-block">
                    <i className="bi bi-people fs-2 text-primary"></i>
                  </div>
                </div>
                <h5 className="fw-bold mb-3">Gastos Compartidos</h5>
                <p className="text-muted mb-0">
                  Registra gastos con múltiples responsables. Assigna quién paga y divide los costos de manera equitativa.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
                <div className="feature-icon mb-3">
                  <div className="bg-warning bg-opacity-10 rounded p-3 d-inline-block">
                    <i className="bi bi-tags fs-2 text-warning"></i>
                  </div>
                </div>
                <h5 className="fw-bold mb-3">Categorización</h5>
                <p className="text-muted mb-0">
                  Organiza tus gastos por categorías: alimentación, transporte, entretenimiento, servicios y más.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
                <div className="feature-icon mb-3">
                  <div className="bg-success bg-opacity-10 rounded p-3 d-inline-block">
                    <i className="bi bi-graph-up fs-2 text-success"></i>
                  </div>
                </div>
                <h5 className="fw-bold mb-3">Control Total</h5>
                <p className="text-muted mb-0">
                  Visualiza el total de gastos, filtra por fecha y consulta el historial completo en cualquier momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rick and Morty API Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="text-center">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/8/84/Rick_and_Morty_characters.jpg" 
                  alt="Rick and Morty" 
                  className="img-fluid rounded-4 shadow"
                  style={{maxHeight: '300px'}}
                  onError={(e) => {
                    e.target.src = 'https://rickandmortyapi.com/api/character/avatar/1.jpeg';
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6 order-lg-1 mt-4 mt-lg-0">
              <span className="badge bg-warning bg-opacity-10 text-warning mb-3 px-3 py-2 rounded-pill">
                <i className="bi bi-stars me-1"></i> API Integration
              </span>
              <h2 className="fw-bold mb-4">Explora la API de Rick and Morty</h2>
              <p className="text-muted mb-4">
                ¡También integramos la API pública de Rick and Morty! Explora todos los personajes, 
                lokalizaciones y episodios de tu serie favorita.
              </p>
              <Link to="/rick-morty" className="btn btn-warning btn-lg px-4">
                <i className="bi bi-rocket-takeoff me-2"></i>
                Ver Personajes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">¿Cómo funciona?</h2>
            <p className="text-muted">En solo 3 pasos empieza a controlar tus gastos</p>
          </div>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="step-item">
                <div className="step-number bg-primary bg-opacity-10 text-primary fw-bold rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px', fontSize: '1.5rem'}}>
                  1
                </div>
                <h5 className="fw-bold mb-2">Crea tu cuenta</h5>
                <p className="text-muted mb-0">Regístrate gratis en segundos. Sin complicaciones ni datos innecesarios.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step-item">
                <div className="step-number bg-primary bg-opacity-10 text-primary fw-bold rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px', fontSize: '1.5rem'}}>
                  2
                </div>
                <h5 className="fw-bold mb-2">Registra gastos</h5>
                <p className="text-muted mb-0">Agrega cada gasto indicando descripción, valor, responsable y categoría.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step-item">
                <div className="step-number bg-primary bg-opacity-10 text-primary fw-bold rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px', fontSize: '1.5rem'}}>
                  3
                </div>
                <h5 className="fw-bold mb-2">Comparte y controla</h5>
                <p className="text-muted mb-0">Todos ven quién paga qué. ¡Fin a las cuentas pendientes!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-primary py-5">
        <div className="container text-center py-4">
          <h2 className="mb-3 fw-bold text-white">¿Listo para empezar?</h2>
          <p className="mb-4 text-white opacity-75">
            Únete a miles de personas que ya están controlando sus gastos compartidos
          </p>
          <Link to="/register" className="btn btn-light btn-lg px-5">
            <i className="bi bi-rocket-takeoff me-2"></i>
            Crear Cuenta Gratis
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Landing;
