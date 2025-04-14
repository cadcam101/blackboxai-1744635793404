const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Importing path module
const { getLocation } = require('./location');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../public')));

// API endpoint to track location
app.post('/track', (req, res) => {
    const { phone } = req.body;
    
    // Validate phone number
    if (!phone || phone.length < 10) {
        return res.status(400).json({ error: 'Invalid phone number' });
    }
    
    // Get mock location data
    const locationData = getLocation(phone);
    res.json(locationData);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
