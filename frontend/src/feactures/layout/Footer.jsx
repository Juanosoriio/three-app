function Footer() {
  return (
    <footer className="bg-white py-4 mt-auto border-top">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 text-muted">&copy; 2026 MyThreeApp. Todos los derechos reservados.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <span className="text-muted small">
              <i className="bi bi-heart-fill text-danger me-1"></i>
              Hecho para simplificar gastos compartidos
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
