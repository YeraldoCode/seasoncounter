const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const resetAdminPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/seasoncounter');
        console.log('Connected to MongoDB');

        // Buscar usuario admin
        let admin = await User.findOne({ email: 'yeramtza@gmail.com' });
        
        if (!admin) {
            console.log('❌ Admin user not found. Creating new admin...');
            
            const hashedPassword = await bcrypt.hash('060887', 10);
            admin = new User({
                username: 'yeramtza',
                email: 'yeramtza@gmail.com',
                password: hashedPassword,
                role: 'admin',
                isActive: true
            });
            
            await admin.save();
            console.log('✅ New Admin user created successfully!');
        } else {
            // Resetear contraseña
            const hashedPassword = await bcrypt.hash('060887', 10);
            admin.password = hashedPassword;
            admin.isActive = true;
            await admin.save();
            console.log('✅ Admin password reset successfully!');
        }
        
        console.log('');
        console.log('=================================');
        console.log('👤 Usuario:', admin.username);
        console.log('📧 Email: yeramtza@gmail.com');
        console.log('🔑 Password: 060887');
        console.log('🎯 Rol:', admin.role);
        console.log('=================================');
        console.log('');
        console.log('You can now login with these credentials');

        process.exit(0);
    } catch (error) {
        console.error('Error resetting password:', error);
        process.exit(1);
    }
};

resetAdminPassword();
