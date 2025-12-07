const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const createSpecificAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/seasoncounter');
        console.log('Connected to MongoDB');

        // Check if user already exists
        const existingUser = await User.findOne({ email: 'yeramtza@gmail.com' });

        if (existingUser) {
            console.log('⚠️  User already exists with email: yeramtza@gmail.com');
            console.log('Updating user to admin role and setting new password...');

            // Update existing user
            existingUser.username = 'Yeraltza';
            existingUser.password = '060887'; // Will be hashed by pre-save hook
            existingUser.role = 'admin';
            existingUser.isActive = true;

            await existingUser.save();
            console.log('✅ User updated successfully!');
        } else {
            // Create new admin user
            const adminUser = new User({
                username: 'Yeraltza',
                email: 'yeramtza@gmail.com',
                password: '060887', // Will be hashed by pre-save hook
                role: 'admin',
                isActive: true
            });

            await adminUser.save();
            console.log('✅ Admin user created successfully!');
        }

        console.log('');
        console.log('=================================');
        console.log('📧 Email: yeramtza@gmail.com');
        console.log('🔑 Password: 060887');
        console.log('👑 Role: Admin');
        console.log('=================================');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createSpecificAdmin();
