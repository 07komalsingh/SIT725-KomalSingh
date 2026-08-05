# SIT725 - Task 2.2P: Express Web Servers

A simple Express.js server built for Task 2.2P. It serves a static web page and exposes a small REST API for adding two numbers, plus a bonus calculator endpoint.

## What it does

- Serves a static web page (`public/index.html`) with a form to try the endpoints directly from the browser.
- **GET `/add?a=<number>&b=<number>`** — adds two numbers and returns the result (required part of the task).
- **GET `/hello`** — simple test endpoint used in Part 1 to confirm the server is working.
- **POST `/calculate`** — bonus basic calculator supporting add, subtract, multiply, and divide.

## How to run it

1. Install dependencies:
   ```
   npm install
   ```
2. Start the server:
   ```
   npm start
   ```
3. Open your browser at [http://localhost:3000](http://localhost:3000) to use the form, or call the API directly:
   ```
   curl "http://localhost:3000/add?a=5&b=3"
   ```

## Example requests

**Add two numbers (GET):**
```
GET /add?a=5&b=3
-> { "a": 5, "b": 3, "result": 8 }
```

**Calculator (POST):**
```
POST /calculate
Content-Type: application/json

{ "a": 10, "b": 4, "operation": "multiply" }
-> { "a": 10, "b": 4, "operation": "multiply", "result": 40 }
```

Supported operations: `add`, `subtract`, `multiply`, `divide`.

## Tech used

- Node.js
- Express.js
