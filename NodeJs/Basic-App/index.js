const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json([
        {
            id: 1,
            name: 'John Doe',
            age: 23
        },
        {
            id: 2,
            name: 'Nick',
            age: 24
        },
        {
            id: 3,
            name: 'Carter',
            age: 27
        }
    ])
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});