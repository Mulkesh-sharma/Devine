// const fetch = require('node-fetch');

async function testSignup() {
    const url = 'http://localhost:5000/api/auth/register';
    const payload = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123',
        phone: '1234567890'
    };

    console.log('Sending payload:', payload);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
}

testSignup();
