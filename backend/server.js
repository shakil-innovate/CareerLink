const express = require('express');
require('dotenv').config();
const cors = require('cors');
const db = require('./config/db');
const authRoute = require('./routes/authRoute');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Job Portal API is running...');
});

app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});