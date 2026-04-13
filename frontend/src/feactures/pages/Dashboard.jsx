import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || '/api';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('gastos');

  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState([]);
  const [expenseLoading, setExpenseLoading] = useState(false);
  const [responsables, setResponsables] = useState([]);

  const [form, setForm] = useState({ description: '', amount: '', date: '', responsible: '', category: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (e) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
    setLoading(false);
    if (!token) return;
    fetchExpenses(token);
    fetchUsers(token);
  }, [navigate]);

  const fetchUsers = async (token) => {
    try {
      const res = await fetch(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.users) {
        const userNames = data.users.map(u => u.name);
        setResponsables(['Juan', 'Maria', 'Carlos', 'Ana', ...userNames]);
      }
    } catch (err) {
      setResponsables(['Juan', 'Maria', 'Carlos', 'Ana']);
    }
  };

  const getToken = () => localStorage.getItem('token');

  const fetchExpenses = async (token) => {
    setExpenseLoading(true);
    try {
      const res = await fetch(`${API_URL}/expenses`, {
        headers: { Authorization: `Bearer ${token || getToken()}` }
      });
      const data = await res.json();
      if (res.ok) {
        setExpenses(data.expenses || []);
        setSummary(data.summary || []);
      }
    } catch (err) {
      console.error(err);
    }
    setExpenseLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const token = getToken();
    if (!token) return;

    const expenseData = {
      description: form.description,
      amount: parseFloat(form.amount),
      date: form.date || new Date().toISOString(),
      responsible: form.responsible,
      category: form.category
    };

    try {
      let res;
      if (editingId) {
        res = await fetch(`${API_URL}/expenses/${editingId}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(expenseData)
        });
      } else {
        res = await fetch(`${API_URL}/expenses`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(expenseData)
        });
      }

      const data = await res.json();
      if (res.ok) {
        setForm({ description: '', amount: '', date: '', responsible: '', category: '' });
        setEditingId(null);
        fetchExpenses(token);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  const handleEdit = (expense) => {
    setForm({
      description: expense.description,
      amount: expense.amount.toString(),
      date: expense.date ? new Date(expense.date).toISOString().split('T')[0] : '',
      responsible: expense.responsible,
      category: expense.category
    });
    setEditingId(expense._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar gasto?')) return;
    const token = getToken();
    try {
      const res = await fetch(`${API_URL}/expenses/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchExpenses(token);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setForm({ description: '', amount: '', date: '', responsible: '', category: '' });
    setEditingId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const totalGastos = expenses.reduce((sum, e) => sum + e.amount, 0);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-lg-3 col-md-4 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="avatar-circle mx-auto mb-3">
                  <span className="avatar-text">{user?.name?.charAt(0).toUpperCase()}</span>
                </div>
                <h5 className="fw-bold mb-1">{user?.name}</h5>
                <p className="text-muted small mb-3">{user?.email}</p>
              </div>
              <hr className="my-0" />
              <div className="list-group list-group-flush">
                <button 
                  onClick={() => setActiveTab('gastos')}
                  className={`list-group-item list-group-item-action border-0 py-3 ${activeTab === 'gastos' ? 'bg-primary bg-opacity-10' : ''}`}
                >
                  <i className="bi bi-wallet2 me-2"></i>
                  Gastos
                </button>
                <button 
                  onClick={() => setActiveTab('perfil')}
                  className={`list-group-item list-group-item-action border-0 py-3 ${activeTab === 'perfil' ? 'bg-primary bg-opacity-10' : ''}`}
                >
                  <i className="bi bi-person me-2"></i>
                  Mi Perfil
                </button>
                <button 
                  onClick={() => setActiveTab('config')}
                  className={`list-group-item list-group-item-action border-0 py-3 ${activeTab === 'config' ? 'bg-primary bg-opacity-10' : ''}`}
                >
                  <i className="bi bi-gear me-2"></i>
                  Configuración
                </button>
              </div>
              <hr className="my-0" />
              <div className="card-body">
                <button onClick={handleLogout} className="btn btn-outline-danger w-100">
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-8">
            {activeTab === 'gastos' && (
              <div className="row g-4">
                <div className="col-12">
                  <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white border-0 py-2">
                      <h5 className="fw-bold mb-0">
                        <i className="bi bi-plus-circle me-2 text-primary"></i>
                        {editingId ? 'Editar Gasto' : 'Registrar Gasto'}
                      </h5>
                    </div>
                    <div className="card-body py-2">
                      {error && <div className="alert alert-danger">{error}</div>}
                      <form onSubmit={handleSubmit}>
                        <div className="row g-2 align-items-end">
                          <div className="col-auto">
                            <label className="form-label small">Fecha</label>
                            <input 
                              type="date" className="form-control form-control-sm" 
                              value={form.date}
                              onChange={(e) => setForm({...form, date: e.target.value})}
                            />
                          </div>
                          <div className="col-auto">
                            <label className="form-label small">Descripción</label>
                            <input 
                              type="text" className="form-control form-control-sm" 
                              value={form.description}
                              onChange={(e) => setForm({...form, description: e.target.value})}
                              placeholder="Ej: Almuerzo" required
                            />
                          </div>
                          <div className="col-auto">
                            <label className="form-label small">Valor</label>
                            <input 
                              type="number" className="form-control form-control-sm" 
                              value={form.amount}
                              onChange={(e) => setForm({...form, amount: e.target.value})}
                              placeholder="0" required
                            />
                          </div>
                          <div className="col-auto" style={{ minWidth: '140px' }}>
                            <label className="form-label small">Responsable</label>
                            <select 
                              className="form-select form-select-sm"
                              value={form.responsible}
                              onChange={(e) => setForm({...form, responsible: e.target.value})}
                              required
                            >
                              <option value="">Seleccionar</option>
                              {responsables.map((name, i) => (
                                <option key={i} value={name}>{name}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-auto" style={{ minWidth: '150px' }}>
                            <label className="form-label small">Categoría</label>
                            <select 
                              className="form-select form-select-sm"
                              value={form.category}
                              onChange={(e) => setForm({...form, category: e.target.value})}
                              required
                            >
                              <option value="">Seleccionar</option>
                              <option value="Alimentación">Alimentación</option>
                              <option value="Transporte">Transporte</option>
                              <option value="Entretenimiento">Entretenimiento</option>
                              <option value="Servicios">Servicios</option>
                              <option value="Otros">Otros</option>
                            </select>
                          </div>
                          <div className="col-auto">
                            <button type="submit" className="btn btn-primary btn-sm">
                              <i className="bi bi-check-lg me-1"></i>
                              Guardar
                            </button>
                            {editingId && (
                              <button type="button" onClick={handleCancel} className="btn btn-outline-secondary btn-sm ms-1">
                                Cancelar
                              </button>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                      <h5 className="fw-bold mb-0">
                        <i className="bi bi-list me-2 text-primary"></i>
                        Historial de Gastos
                      </h5>
                      <div className="text-end">
                        <span className="text-muted small me-2">Total:</span>
                        <span className="fw-bold text-primary">${totalGastos.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="card-body p-0">
                      {expenseLoading ? (
                        <div className="text-center py-4">
                          <div className="spinner-border text-primary"></div>
                        </div>
                      ) : expenses.length === 0 ? (
                        <div className="text-center py-4 text-muted">
                          <i className="bi bi-receipt fs-1"></i>
                          <p className="mb-0">No hay gastos registrados</p>
                        </div>
                      ) : (
                        <div className="table-responsive">
                          <table className="table table-hover mb-0">
                            <thead className="bg-light">
                              <tr>
                                <th className="ps-4">Descripción</th>
                                <th>Responsable</th>
                                <th>Categoría</th>
                                <th>Fecha</th>
                                <th className="text-end pe-4">Monto</th>
                                <th className="text-end pe-4">Acciones</th>
                              </tr>
                            </thead>
                            <tbody>
                              {expenses.map((expense) => (
                                <tr key={expense._id}>
                                  <td className="ps-4">{expense.description}</td>
                                  <td>
                                    <span className="badge bg-primary bg-opacity-10 text-primary">
                                      {expense.responsible}
                                    </span>
                                  </td>
                                  <td>{expense.category}</td>
                                  <td className="text-muted">
                                    {new Date(expense.date).toLocaleDateString('es-CO')}
                                  </td>
                                  <td className="text-end fw-bold pe-4">
                                    ${expense.amount.toLocaleString()}
                                  </td>
                                  <td className="text-end pe-4">
                                    <button 
                                      onClick={() => handleEdit(expense)}
                                      className="btn btn-sm btn-outline-primary me-1"
                                    >
                                      <i className="bi bi-pencil"></i>
                                    </button>
                                    <button 
                                      onClick={() => handleDelete(expense._id)}
                                      className="btn btn-sm btn-outline-danger"
                                    >
                                      <i className="bi bi-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'perfil' && (
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0 py-3">
                  <h5 className="fw-bold mb-0">
                    <i className="bi bi-person me-2 text-primary"></i>
                    Mi Perfil
                  </h5>
                </div>
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Nombre Completo</label>
                        <input type="text" className="form-control" defaultValue={user?.name} />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control" defaultValue={user?.email} disabled />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      <i className="bi bi-check-lg me-2"></i>
                      Guardar Cambios
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'config' && (
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0 py-3">
                  <h5 className="fw-bold mb-0">
                    <i className="bi bi-gear me-2 text-primary"></i>
                    Configuración
                  </h5>
                </div>
                <div className="card-body">
                  <div className="form-check form-switch mb-3">
                    <input className="form-check-input gray-switch" type="checkbox" id="notifEmail" defaultChecked />
                    <label className="form-check-label ms-2 text-secondary" htmlFor="notifEmail">
                      Correo electrónico
                    </label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input className="form-check-input gray-switch" type="checkbox" id="notifPush" defaultChecked />
                    <label className="form-check-label ms-2 text-secondary" htmlFor="notifPush">
                      Notificaciones push
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;