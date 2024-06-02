import React, { useState } from 'react';
import axios from 'axios';

const AverageCalculator = () => {
    const [numberType, setNumberType] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleNumberTypeChange = (e) => {
        setNumberType(e.target.value);
    };

    const fetchNumbers = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`http://localhost:9876/numbers/${numberType}`);
            setResponse(res.data);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Average Calculator</h1>
            <select value={numberType} onChange={handleNumberTypeChange}>
                <option value="">Select number type</option>
                <option value="p">Prime</option>
                <option value="f">Fibonacci</option>
                <option value="e">Even</option>
                <option value="r">Random</option>
            </select>
            <button onClick={fetchNumbers} disabled={!numberType || loading}>
                {loading ? 'Loading...' : 'Fetch Numbers'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <h2>Response</h2>
                    <p><strong>Window Previous State:</strong> {response.windowPrevState.join(', ')}</p>
                    <p><strong>Window Current State:</strong> {response.windowCurrState.join(', ')}</p>
                    <p><strong>Numbers:</strong> {response.numbers.join(', ')}</p>
                    <p><strong>Average:</strong> {response.avg}</p>
                </div>
            )}
        </div>
    );
};

export default AverageCalculator;
