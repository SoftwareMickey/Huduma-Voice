require('dotenv').config();
const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ Successfully connected to MongoDB');
    } catch (error) {
        console.error('❌ Database connection error:', error);
        process.exit(1); // Exit process if DB connection fails
    }
}

module.exports = connectToDatabase;
