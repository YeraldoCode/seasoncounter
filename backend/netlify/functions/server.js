const serverless = require('serverless-http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const eventRoutes = require('../../routes/eventRoutes');
const authRoutes = require('../../routes/authRoutes');
const userRoutes = require('../../routes/userRoutes');
const themeRoutes = require('../../routes/themeRoutes');

dotenv.config();

const app = express();

// Middleware
// Configuración CORS permisiva para Netlify
app.use(cors({
    origin: true, // Permite todos los orígenes en producción de Netlify
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: 'Netlify Functions'
    });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/themes', themeRoutes);
app.use('/api/events', eventRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Database Connection (conecta solo una vez)
let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/seasoncounter', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = db.connections[0].readyState === 1;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

// Exportar como función serverless
const handler = serverless(app);

module.exports.handler = async (event, context) => {
    // Configurar context para reutilizar conexión
    context.callbackWaitsForEmptyEventLoop = false;
    
    // Conectar a la base de datos antes de procesar la request
    await connectDB();
    
    // Procesar la request
    return handler(event, context);
};
