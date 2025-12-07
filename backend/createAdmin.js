const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const createAdminUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/seasoncounter');
        console.log('Connected to MongoDB');

        // Verificar si ya existe un admin
        const existingAdmin = await User.findOne({ email: 'admin@seasoncounter.com' });
        
        if (existingAdmin) {
            console.log('❌ El usuario admin ya existe');
            console.log('Email: admin@seasoncounter.com');
            console.log('Si olvidaste la contraseña, elimina el usuario y vuelve a ejecutar este script');
            process.exit(0);
        }

        // Crear usuario admin
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        const adminUser = new User({
            username: 'Admin',
            email: 'admin@seasoncounter.com',
            password: hashedPassword,
            role: 'admin',
            isActive: true
        });

        await adminUser.save();
        
        console.log('✅ Usuario administrador creado exitosamente!');
        console.log('');
        console.log('=================================');
        console.log('📧 Email: admin@seasoncounter.com');
        console.log('🔑 Password: admin123');
        console.log('=================================');
        console.log('');
        console.log('⚠️  IMPORTANTE: Cambia esta contraseña después de iniciar sesión');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdminUser();
