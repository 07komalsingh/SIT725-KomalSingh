// app.js
// Fetches recipe data from the server's REST endpoint (GET /api/recipes)
// and renders it as Materialize cards on the page.

document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/recipes')
    .then(response => response.json())
    .then(recipes => renderCards(recipes))
    .catch(err => console.error('Failed to load recipes:', err));
});

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
