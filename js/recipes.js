const recipeModals = {
    'morning-sunshine': {
        title: 'Morning Sunshine Bowl',
        time: '5 mins',
        servings: 4,
        difficulty: 'Easy',
        ingredients: [
            '1 cup Greek yogurt',
            '1/2 cup Manwaar Dehydrated Mango',
            '1/4 cup Manwaar Golden Honey Almonds',
            '1 tbsp honey'
        ],
        instructions: [
            'In a serving bowl, spread the Greek yogurt as the base',
            'Top with Manwaar Dehydrated Mango pieces',
            'Sprinkle Manwaar Golden Honey Almonds',
            'Drizzle with honey',
            'Serve immediately and enjoy!'
        ]
    },
    'spicy-nut-salad': {
        title: 'Spicy Nut Salad',
        time: '15 mins',
        servings: 2,
        difficulty: 'Medium',
        ingredients: [
            '2 cups mixed greens',
            '1/2 cup cherry tomatoes, halved',
            '1/4 cup cucumber, diced',
            '1/4 cup Manwaar Spicy Masala Cashews',
            '2 tbsp olive oil',
            '1 tbsp lemon juice',
            'Salt and pepper to taste'
        ],
        instructions: [
            'In a large bowl, combine mixed greens, cherry tomatoes, and cucumber',
            'Add Manwaar Spicy Masala Cashews',
            'In a small bowl, whisk together olive oil, lemon juice, salt, and pepper',
            'Pour dressing over the salad and toss gently to combine',
            'Serve immediately while the cashews are crisp'
        ]
    },
    'fruity-nut-bars': {
        title: 'Fruity Nut Bars',
        time: '30 mins',
        servings: 8,
        difficulty: 'Advanced',
        ingredients: [
            '1 cup mixed Manwaar Dehydrated Fruits',
            '1 cup mixed Manwaar nuts (almonds, cashews)',
            '1/2 cup rolled oats',
            '1/3 cup honey or maple syrup',
            '1/4 cup coconut oil',
            '1 tsp vanilla extract',
            'Pinch of salt'
        ],
        instructions: [
            'Line a 8x8 inch baking pan with parchment paper',
            'In a food processor, pulse the nuts until roughly chopped',
            'Mix chopped nuts with rolled oats and dehydrated fruits',
            'In a small saucepan, warm honey and coconut oil until melted',
            'Add vanilla extract and salt to the liquid mixture',
            'Pour the liquid over the dry ingredients and mix well',
            'Press mixture firmly into the prepared pan',
            'Refrigerate for at least 2 hours before cutting into bars'
        ]
    }
};

// Recipe category filtering
const categoryButtons = document.querySelectorAll('.category-tag');
const recipeCards = document.querySelectorAll('.recipe-card');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        
        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter recipes
        recipeCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Recipe modal functionality
function createModal(recipeId) {
    const recipe = recipeModals[recipeId];
    if (!recipe) return;

    const modal = document.createElement('div');
    modal.classList.add('recipe-modal');
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-header">
                <img src="path-to-recipe-image.jpg" alt="${recipe.title}">
            </div>
            <div class="modal-body">
                <h2>${recipe.title}</h2>
                <div class="recipe-meta">
                    <span class="meta-item">
                        <i class="far fa-clock"></i>
                        ${recipe.time}
                    </span>
                    <span class="meta-item">
                        <i class="fas fa-utensils"></i>
                        ${recipe.servings} servings
                    </span>
                    <span class="meta-item">
                        <i class="fas fa-signal"></i>
                        ${recipe.difficulty}
                    </span>
                </div>
                
                <h3>Ingredients</h3>
                <ul class="ingredients-list">
                    ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                
                <h3>Instructions</h3>
                <ol class="instructions-list">
                    ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                </ol>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Add click handlers to recipe view buttons
document.querySelectorAll('.view-recipe').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.recipe-card');
        const recipeId = card.dataset.recipeId;
        createModal(recipeId);
    });
});