// SIT725 Task 2.2P - Express Web Servers
// Simple Express server that:
//  - serves a static web page from the "public" folder (Part 1)
//  - exposes a GET endpoint to add two numbers via the URL (Part 2, required)
//  - exposes a POST-based basic calculator: add/subtract/multiply/divide (Part 2, bonus)

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (index.html, css, js) from the public folder
app.use(express.static('public'));

// Needed so the server can read JSON bodies sent by the POST calculator
app.use(express.json());

// ---- Part 1: simple test endpoint ----
// Example: GET /hello
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from the Express server!' });
});

// ---- Part 2 (required): GET endpoint that adds two numbers ----
// Example: GET /add?a=5&b=3  ->  { "a": 5, "b": 3, "result": 8 }
app.get('/add', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: 'Please provide valid numbers for both a and b, e.g. /add?a=5&b=3' });
  }

  res.json({ a, b, result: a + b });
});

// ---- Part 2 (bonus): POST-based basic calculator ----
// Example: POST /calculate  body: { "a": 10, "b": 4, "operation": "multiply" }
app.post('/calculate', (req, res) => {
  const { a, b, operation } = req.body;
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (Number.isNaN(numA) || Number.isNaN(numB)) {
    return res.status(400).json({ error: 'Please provide valid numbers for both a and b.' });
  }

  let result;
  switch (operation) {
    case 'add':
      result = numA + numB;
      break;
    case 'subtract':
      result = numA - numB;
      break;
    case 'multiply':
      result = numA * numB;
      break;
    case 'divide':
      if (numB === 0) {
        return res.status(400).json({ error: 'Cannot divide by zero.' });
      }
      result = numA / numB;
      break;
    default:
      return res.status(400).json({ error: 'operation must be one of: add, subtract, multiply, divide' });
  }

  res.json({ a: numA, b: numB, operation, result });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
