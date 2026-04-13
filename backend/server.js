import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000
const JWT_SECRET = process.env.JWT_SECRET || 'mythreeapp_secret_key_2026'
const NODE_ENV = process.env.NODE_ENV || 'development'

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token no proporcionado' })
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch (e) {
        return res.status(401).json({ message: 'Token inválido' })
    }
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String, default: null },
    resetTokenExpiry: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)

const expenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    responsible: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
})

const Expense = mongoose.model('Expense', expenseSchema)

app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body
        
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        
        const newUser = new User({ name, email, password: hashedPassword })
        await newUser.save()

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '7d' })

        res.status(201).json({ 
            message: 'Usuario registrado exitosamente',
            token,
            user: { id: newUser._id, name: newUser.name, email: newUser.email }
        })
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error: error.message })
    }
})

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Credenciales incorrectas' })
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' })

        res.json({ 
            message: 'Login exitoso',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        })
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message })
    }
})

app.post('/api/recover', async (req, res) => {
    try {
        const { email } = req.body
        
        if (!email) {
            return res.status(400).json({ message: 'El correo es requerido' })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ message: 'Si el correo existe, recibirás un enlace para restablecer tu contraseña' })
        }

        const resetToken = jwt.sign({ userId: user._id, type: 'password_reset' }, JWT_SECRET, { expiresIn: '1h' })
        const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000)
        
        await User.findByIdAndUpdate(user._id, { resetToken, resetTokenExpiry })

        if (NODE_ENV === 'development') {
            console.log(`Token de recuperación para ${email}: ${resetToken}`)
        }
        
        res.json({ 
            message: 'Si el correo existe, recibirás un enlace para restablecer tu contraseña',
            resetToken: resetToken
        })
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar solicitud', error: error.message })
    }
})

app.post('/api/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body
        
        if (!token || !newPassword) {
            return res.status(400).json({ message: 'Token y nueva contraseña son requeridos' })
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' })
        }

        let decoded
        try {
            decoded = jwt.verify(token, JWT_SECRET)
        } catch (e) {
            return res.status(400).json({ message: 'Token inválido o expirado' })
        }

        if (decoded.type !== 'password_reset') {
            return res.status(400).json({ message: 'Token inválido' })
        }

        const user = await User.findOne({ 
            _id: decoded.userId,
            resetToken: token,
            resetTokenExpiry: { $gt: new Date() }
        })

        if (!user) {
            return res.status(400).json({ message: 'Token inválido o expirado' })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        
        await User.findByIdAndUpdate(user._id, { 
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiry: null
        })

        res.json({ message: 'Contraseña actualizada exitosamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al restablecer contraseña', error: error.message })
    }
})

app.get('/api/users', authenticate, async (req, res) => {
    try {
        const users = await User.find({ _id: req.userId }).select('name email')
        res.json({ users })
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message })
    }
})

app.post('/api/expenses', authenticate, async (req, res) => {
    try {
        const { description, amount, responsible, category, date } = req.body
        if (!description || !amount || !responsible || !category) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' })
        }
        const newExpense = new Expense({ userId: req.userId, description, amount, responsible, category, date })
        await newExpense.save()
        res.status(201).json({ message: 'Gasto registrado', expense: newExpense })
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar gasto', error: error.message })
    }
})

app.get('/api/expenses', authenticate, async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.userId }).sort({ date: -1 })
        const summary = await Expense.aggregate([
            { $match: { userId: req.userId } },
            { $group: { _id: '$responsible', total: { $sum: '$amount' } } }
        ])
        res.json({ expenses, summary })
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener gastos', error: error.message })
    }
})

app.put('/api/expenses/:id', authenticate, async (req, res) => {
    try {
        const { description, amount, responsible, category, date } = req.body
        const expense = await Expense.findOne({ _id: req.params.id, userId: req.userId })
        if (!expense) {
            return res.status(404).json({ message: 'Gasto no encontrado' })
        }
        if (description) expense.description = description
        if (amount) expense.amount = amount
        if (responsible) expense.responsible = responsible
        if (category) expense.category = category
        if (date) expense.date = date
        await expense.save()
        res.json({ message: 'Gasto actualizado', expense })
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar gasto', error: error.message })
    }
})

app.delete('/api/expenses/:id', authenticate, async (req, res) => {
    try {
        const result = await Expense.deleteOne({ _id: req.params.id, userId: req.userId })
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Gasto no encontrado' })
        }
        res.json({ message: 'Gasto eliminado' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar gasto', error: error.message })
    }
})

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI
        
        if (!mongoURI) {
            console.log('MONGODB_URI no configurada')
            return
        }

        await mongoose.connect(mongoURI)
        console.log('Conectado a MongoDB Atlas')
    } catch (error) {
        console.error('Error conectando a MongoDB:', error.message)
    }
}

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', mongoConnected: mongoose.connection.readyState === 1 })
})

connectDB().then(() => {
    app.listen(PORT, () => {
        if (NODE_ENV === 'development') {
            console.log(`Servidor corriendo en http://localhost:${PORT}`)
        }
    })
})
