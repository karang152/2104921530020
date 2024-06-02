const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 9876;

// Configuration
const WINDOW_SIZE = 10;
const NUMBER_TYPES = ['p', 'f', 'e', 'r'];
const THIRD_PARTY_URL = "http://localhost:9876/numbers/{type}";
const TIMEOUT = 500; // 500 milliseconds

// Storage for numbers
let numbersStore = [];

// Helper function to fetch a number from the third-party API
const fetchNumber = async (numberType) => {
    try {
        const response = await axios.get(THIRD_PARTY_URL.replace('{type}', numberType), { timeout: TIMEOUT });
        if (response.status === 200) {
            return response.data.number;
        }
    } catch (error) {
        console.error(`Failed to fetch number: ${error.message}`);
    }
    return null;
};

// Endpoint to handle number requests
app.get('/numbers/:numberid', async (req, res) => {
    const numberId = req.params.numberid;

    if (!NUMBER_TYPES.includes(numberId)) {
        return res.status(400).json({ error: "Invalid number ID" });
    }

    // Get current stored numbers
    const numbersBefore = [...numbersStore];

    // Fetch the new number
    const newNumber = await fetchNumber(numberId);
    if (newNumber !== null && !numbersStore.includes(newNumber)) {
        if (numbersStore.length >= WINDOW_SIZE) {
            numbersStore.shift();
        }
        numbersStore.push(newNumber);
    }

    // Get updated stored numbers
    const numbersAfter = [...numbersStore];

    // Calculate the average of stored numbers
    const average = numbersStore.length > 0
        ? numbersStore.reduce((acc, num) => acc + num, 0) / numbersStore.length
        : 0;

    res.json({
        windowPrevState: numbersBefore,
        windowCurrState: numbersAfter,
        numbers: newNumber !== null ? [newNumber] : [],
        avg: parseFloat(average.toFixed(2))
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});