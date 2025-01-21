const categories = [
    { name: "Breakfast" },
    { name: "Lunch" },
    { name: "Dinner" },
    { name: "Appetizers" },
    { name: "Snacks" },
    { name: "Desserts" },
    { name: "Drinks" },
    { name: "Salads" },
    { name: "Soups" },
    { name: "Vegetarian" }
  ]

const recipes = [
    {
        name: "Classic Pancakes",
        description: "Fluffy and delicious pancakes for a perfect morning.",
        servings: "4",
        time: "30 minutes",
        ingredients: [
            "2 cups all-purpose flour",
            "2 tbsp sugar",
            "2 tsp baking powder",
            "1/2 tsp baking soda",
            "1/2 tsp salt",
            "2 cups buttermilk",
            "2 large eggs",
            "1/4 cup melted butter"
        ],
        directions: [
            "In a large bowl, mix dry ingredients: flour, sugar, baking powder, baking soda, and salt.",
            "In another bowl, whisk wet ingredients: buttermilk, eggs, and melted butter.",
            "Combine wet and dry ingredients until just mixed. Do not overmix.",
            "Heat a griddle or skillet over medium heat and lightly grease it.",
            "Pour 1/4 cup batter for each pancake and cook until bubbles appear, then flip.",
            "Serve warm with syrup and butter."
        ]
    },
    {
        name: "Spaghetti Carbonara",
        description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
        servings: "4",
        time: "25 minutes",
        ingredients: [
            "400g spaghetti",
            "200g pancetta, diced",
            "2 large eggs",
            "1 cup grated Parmesan cheese",
            "2 cloves garlic, minced",
            "Salt and black pepper to taste",
            "2 tbsp olive oil"
        ],
        directions: [
            "Cook spaghetti in salted boiling water until al dente. Reserve 1 cup pasta water before draining.",
            "In a large skillet, heat olive oil and cook pancetta until crisp.",
            "In a bowl, whisk eggs and Parmesan cheese together.",
            "Add drained spaghetti to the skillet with pancetta and toss.",
            "Remove from heat and quickly mix in egg-cheese mixture, adding pasta water as needed to create a creamy sauce.",
            "Season with salt and pepper. Serve immediately."
        ]
    }
]

export default {categories, recipes}
