const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

const userId = 'samarth_agarwal_27062002';
const email = 'sh7758@srmist.edu.in';
const rollNumber = 'RA2111003010398';

// POST method endpoint
app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;
        if (!data || !Array.isArray(data)) {
            throw new Error('Invalid input: "data" should be an array.');
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));
        const highestAlphabet = alphabets.length > 0 ? [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)] : [];

        res.json({
            is_success: true,
            user_id: userId,
            email: email,
            roll_number: rollNumber,
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highestAlphabet
        });
    } catch (error) {
        res.status(400).json({
            is_success: false,
            error: error.message,
            user_id: userId,
            email: email,
            roll_number: rollNumber,
            numbers: [],
            alphabets: [],
            highest_alphabet: []
        });
    }
});

// GET method endpoint
app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
