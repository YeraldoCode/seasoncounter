const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const createDefaultAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/seasoncounter');
        console.log('Connected to MongoDB');

        // Delete existing admin if exists
        await Admin.deleteOne({ username: 'admin' });
        console.log('Cleared existing admin');

        // Create default admin
        const admin = new Admin({
            username: 'admin',
            email: 'admin@seasoncounter.com',
            password: 'admin123',
            role: 'superadmin'
        });

        await admin.save();
        console.log('========================');
        console.log('Default admin created!');
        console.log('Username: admin');
        console.log('Password: admin123');
        console.log('========================');

        mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

createDefaultAdmin();
