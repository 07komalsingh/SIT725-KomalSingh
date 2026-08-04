# SIT725 4.2P – Add a Database (Recipe Box)

Builds on 3.2P by adding a real database and organising the app with an
**MVC (Model–View–Controller)** architecture. The Express server stores and
serves recipe data from MongoDB (via Mongoose), and both reading and writing
happen server-side.

## MVC structure

```
4.2P/
├── models/
│   └── Recipe.js              # MODEL — Mongoose schema & DB access
├── controllers/
│   └── recipeController.js    # CONTROLLER — request/response logic
├── routes/
│   └── recipeRoutes.js        # Routes map URLs → controller methods
├── public/                    # VIEW — HTML, CSS, client-side JS
│   ├── index.html
│   ├── css/style.css
│   └── js/app.js
├── server.js                  # App entry — wires MVC + MongoDB
└── seed.js                    # Sample data seeder
```

| Layer        | Role |
|--------------|------|
| **Model**    | `models/Recipe.js` — defines the Recipe schema and talks to MongoDB |
| **View**     | `public/` — the browser UI (Materialize cards + add-recipe form) |
| **Controller** | `controllers/recipeController.js` — handles GET/POST, uses the model, returns JSON |
| **Routes**   | `routes/recipeRoutes.js` — maps `/api/recipes` to controller functions |

Request flow: **Client (View) → Route → Controller → Model → MongoDB**, then
JSON back to the View for rendering.

## What changed from 3.2P
- Organised into **MVC folders** (models / controllers / routes / public).
- Added **MongoDB + Mongoose** (`models/Recipe.js`) with schema validation
  (required fields, min/max length, enum for difficulty).
- `GET /api/recipes` now queries the database instead of returning a static array.
- Added `POST /api/recipes` — a "safe write" endpoint that only accepts an
  allowlist of fields and validates them against the schema before saving.
- Added a new `cuisine` field (not present in the original 3.2P data or in
  the Prac 4 example) and a small "Add a Recipe" form on the page to
  demonstrate the POST endpoint.
- `seed.js` populates the database with its own sample recipes.

## Run it

1. Make sure MongoDB is running locally (`mongosh` should connect successfully).
2. Install dependencies:
   ```
   npm install
   ```
3. Seed the database with sample data:
   ```
   npm run seed
   ```
4. Start the server:
   ```
   npm start
   ```
5. Open http://localhost:3000

## Verify the data in MongoDB
```
mongosh
use recipeBoxDB
db.recipes.find().pretty()
```
Or use MongoDB Compass, connect to `mongodb://localhost:27017`, and open the
`recipeBoxDB` database → `recipes` collection.
