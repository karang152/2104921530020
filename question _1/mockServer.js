// mock-third-party-server/mockServer.js
const express = require('express');
const app = express();
const PORT = 5000;

// Helper functions to generate numbers
const isPrime = (num) => {
    for (let i = 2; i < num; i++)
        if (num % i === 0) return false;
    return num > 1;
};

const generatePrime = () => {
    let num = Math.floor(Math.random() * 100) + 2;
    while (!isPrime(num)) {
        num = Math.floor(Math.random() * 100) + 2;
    }
    return num;
};

const generateFibonacci = () => {
    const fib = [0, 1];
    while (fib[fib.length - 1] < 100) {
        fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
    }
    return fib[Math.floor(Math.random() * fib.length)];
};

const generateEven = () => {
    return Math.floor(Math.random() * 50) * 2;
};

const generateRandom = () => {
    return Math.floor(Math.random() * 100);
};

app.get('/numbers/:type', (req, res) => {
    const { type } = req.params;
    let number;

    switch (type) {
        case 'p':
            number = generatePrime();
            break;
        case 'f':
            number = generateFibonacci();
            break;
        case 'e':
            number = generateEven();
            break;
        case 'r':
            number = generateRandom();
            break;
        default:
            return res.status(400).json({ error: "Invalid number type" });
    }

    res.json({ number });
});

app.listen(PORT, () => {
    console.log(`Mock third-party server is running on port ${PORT}`);
});
