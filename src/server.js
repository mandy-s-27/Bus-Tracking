// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let users = [];

app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ message: 'Email already exists' });
  }
  
  users.push({ id: Date.now(), name, email, password });
  res.status(201).json({ message: 'Signup successful' });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));