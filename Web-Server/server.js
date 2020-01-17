const express = require('express');
const app = express();

const bodyParser = require ('body-parser')
const session = require('express-session')
const path = require('path');

app.use(session({ secret : 'zz', resave: true, saveUninitialized: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../frontend/dist/')));

app.post('/api/auth', (req, res) => {
    const { username, password } = req.body;

    if( username === 'Thorres' && password === 'admin') {
        req.session.auth = true;
        req.session.user = username;
        return res.json({ status: 'ok' });
    }

    return res.json({ status: 'error', data: `Username ${username} is invalid with this password` });
});

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(3000, ()  => {
    console.log('Example');
});