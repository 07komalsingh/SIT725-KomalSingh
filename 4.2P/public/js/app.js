// app.js
// Fetches recipe data from the server's REST endpoint (GET /api/recipes),
// which is now backed by MongoDB, and renders it as Materialize cards.
// Also handles submitting the "Add a Recipe" form (POST /api/recipes).

document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('difficulty');
  if (select && window.M) M.FormSelect.init(select);

  loadRecipes();

  const form = document.getElementById('recipe-form');
  form.addEventListener('submit', handleAddRecipe);
});

function loadRecipes() {
  fetch('/api/recipes')
    .then(response => response.json())
    .then(result => {
      const container = document.getElementById('recipe-cards');
      container.innerHTML = ''; // clear before re-render
      if (result.statusCode === 200) {
        renderCards(result.data);
      } else {
        console.error('Failed to load recipes:', result.message);
      }
    })
    .catch(err => console.error('Failed to load recipes:', err));
}

function renderCards(recipes) {
  const container = document.getElementById('recipe-cards');

  recipes.forEach(recipe => {
    const difficultyClass = `difficulty-${recipe.difficulty.toLowerCase()}`;

    const cardHTML = `
      <div class="col s12 m6 l3">
        <div class="card">
          <div class="card-image">
            <img src="${recipe.image}" alt="${recipe.title}">
          </div>
          <div class="card-content">
            <span class="card-title">${recipe.title}</span>
            <p>${recipe.description}</p>
            <div class="chip ${difficultyClass}">${recipe.difficulty}</div>
            <div class="chip cuisine-chip">${recipe.cuisine}</div>
          </div>
          <div class="card-action">
            <span><i class="material-icons tiny">schedule</i> ${recipe.time}</span>
          </div>
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', cardHTML);
  });
}

function handleAddRecipe(event) {
  event.preventDefault();

  const form = event.target;
  const messageEl = document.getElementById('form-message');
  messageEl.textContent = '';

  const payload = {
    title: form.title.value,
    description: form.description.value,
    time: form.time.value,
    difficulty: form.difficulty.value,
    cuisine: form.cuisine.value,
    image: form.image.value,
  };

  fetch('/api/recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then(response => response.json().then(result => ({ ok: response.ok, result })))
    .then(({ ok, result }) => {
      if (!ok) {
        throw new Error(result.message || 'Failed to add recipe');
      }
      form.reset();
      if (window.M) M.FormSelect.init(document.getElementById('difficulty'));
      loadRecipes(); // refresh cards from the database
    })
    .catch(err => {
      messageEl.textContent = err.message;
    });
}
