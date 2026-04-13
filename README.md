# MyThreeApp - Gestión de Gastos Compartidos

**MyThreeApp** es una aplicación web fullstack para gestionar gastos compartidos entre familia, roommates o grupos. Permite registrar, organizar y rastrear gastos compartidos de manera sencilla e intuitiva.

---

## 🚀 Características

- **Registro de usuarios**: Crear cuenta con nombre, email y contraseña
- **Inicio de sesión**: Autenticación segura con JWT
- **Recuperación de contraseña**: Sistema de reset de contraseña por email
- **Gestión de gastos**: Registrar gastos con descripción, monto, responsable y categoría
- **Categorización**: Alimentación, Transporte, Entretenimiento, Servicios, Otros
- **Historial completo**: Ver todos los gastos registrados con filtros
- **Edición y eliminación**: Modificar o borrar gastos existentes
- **Diseño responsivo**: Funciona en escritorio y móvil

---

## 🛠️ Tecnologías

### Frontend
- **React 19** - Biblioteca de UI
- **Vite** - Herramienta de build
- **React Router** - Enrutamiento
- **Bootstrap 5** - Framework CSS
- **Bootstrap Icons** - Iconos

### Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB + Mongoose** - Base de datos
- **JWT** - Autenticación
- **Bcryptjs** - Encriptación de contraseñas

---

## 📁 Estructura del Proyecto

```
MythreeApp/
├── frontend/                 # Aplicación React
│   ├── src/
│   │   ├── feactures/
│   │   │   ├── api/
│   │   │   │   └── components/
│   │   │   │       └── ApiRyC_Axios.jsx  # Ejemplo API Rick & Morty
│   │   │   ├── layout/
│   │   │   │   ├── Header.jsx           # Navegación
│   │   │   │   ├── Footer.jsx           # Pie de página
│   │   │   │   └── Content.jsx
│   │   │   └── pages/
│   │   │       ├── Landing.jsx          # Página de inicio
│   │   │       ├── Login.jsx           # Inicio de sesión
│   │   │       ├── Register.jsx        # Registro de usuario
│   │   │       ├── RecoverPassword.jsx # Recuperar contraseña
│   │   │       └── Dashboard.jsx      # Panel de gastos
│   │   ├── shared/
│   │   │   ├── App.css                 # Estilos principales
│   │   │   └── index.css
│   │   ├── App.jsx                     # Componente principal
│   │   └── main.jsx                    # Punto de entrada
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Servidor Express
│   ├── server.js             # API REST completa
│   ├── package.json
│   └── .env                  # Variables de entorno
│
└── README.md
```

---

## 🔌 Endpoints de la API

| Método | Ruta | Descripción | Autenticación |
|--------|------|-------------|---------------|
| POST | `/api/register` | Registrar nuevo usuario | No |
| POST | `/api/login` | Iniciar sesión | No |
| POST | `/api/recover` | Solicitar recuperación de contraseña | No |
| POST | `/api/reset-password` | Restablecer contraseña | No |
| GET | `/api/users` | Obtener usuarios | Sí (JWT) |
| POST | `/api/expenses` | Registrar gasto | Sí (JWT) |
| GET | `/api/expenses` | Listar gastos | Sí (JWT) |
| PUT | `/api/expenses/:id` | Actualizar gasto | Sí (JWT) |
| DELETE | `/api/expenses/:id` | Eliminar gasto | Sí (JWT) |
| GET | `/api/health` | Estado del servidor | No |

---

## 🚀 Despliegue

### Frontend → Vercel
1. Ve a https://vercel.com
2. "Add New..." → "Project"
3. Importa el repositorio `three-app`
4. Configura:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Añade variable de entorno:
   - `VITE_API_URL` = URL del backend (ej: `https://three-app.onrender.com`)
6. Deploy

### Backend → Render
1. Ve a https://render.com
2. "New" → "Web Service"
3. Conecta tu repositorio GitHub
4. Configura:
   - Name: `three-app-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Añade environment variables:
   - `PORT`: `5000`
   - `MONGODB_URI`: Tu string de conexión MongoDB Atlas
   - `JWT_SECRET`: Una clave segura aleatoria
6. Deploy

### Configuración Cross-Origin
Si frontend y backend están en dominios diferentes, el backend ya tiene CORS configurado para aceptar peticiones de cualquier origen.

---

## ⚙️ Instalación y Ejecución

### Prerrequisitos
- Node.js 18+
- MongoDB (local o Atlas)

### 1. Clonar el proyecto
```bash
git clone <repo-url>
cd MythreeApp
```

### 2. Instalar dependencias del frontend
```bash
cd frontend
npm install
```

### 3. Instalar dependencias del backend
```bash
cd ../backend
npm install
```

### 4. Configurar variables de entorno

Crear archivo `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/mythreeapp
JWT_SECRET=tu_secret_key_aqui
```

### 5. Ejecutar la aplicación

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 6. Abrir en el navegador
```
http://localhost:5173
```

---

## 🎨 Diseño

- **Tema visual**: Azul Bootstrap (`#0d6efd` → `#0dcaf0`)
- **Estilo**: Moderno, limpio y responsivo
- **Landing page**: Describe la funcionalidad de gestión de gastos compartidos
- **Dashboard**: Panel lateral con avatar, menú de navegación y tabla de gastos

---

## 📝 Uso

1. **Registrarse** en la página de inicio
2. **Iniciar sesión** con las credenciales
3. **Registrar gastos** completando: fecha, descripción, valor, responsable y categoría
4. **Visualizar** el historial de gastos y totales
5. **Editar o eliminar** gastos según sea necesario

---

## 🔐 Seguridad

- Contraseñas encriptadas con bcrypt
- Autenticación JWT con token en header
- Validación de datos en servidor
- Rutas protegidas en dashboard

---

## 📄 Licencia

MIT License - 2026 MyThreeApp
