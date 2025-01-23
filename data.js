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
    { name: "Vegetarian" },
    { name: "Other" },
    { name: "Seafood" }
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
        description: "A creamy, flavorful pasta dish with bacon and parmesan cheese.",
        servings: "4",
        time: "25 minutes",
        ingredients: [
            "400g spaghetti",
            "4 large eggs",
            "1 cup grated parmesan cheese",
            "200g pancetta or bacon, diced",
            "3 cloves garlic, minced",
            "Salt and black pepper to taste",
            "2 tbsp olive oil"
        ],
        directions: [
            "Cook spaghetti in salted water until al dente, then drain and reserve 1 cup of pasta water.",
            "Whisk eggs and parmesan together in a bowl.",
            "Heat olive oil in a pan, cook diced pancetta until crispy, then add minced garlic.",
            "Toss the cooked spaghetti into the pan with pancetta and garlic.",
            "Remove from heat and quickly mix in the egg and parmesan mixture.",
            "Add reserved pasta water as needed for a creamy texture.",
            "Season with salt and pepper, and serve immediately."
        ]
    },
    {
        name: "Caesar Salad",
        description: "A classic salad with a tangy dressing and crunchy croutons.",
        servings: "4",
        time: "15 minutes",
        ingredients: [
            "1 head romaine lettuce, chopped",
            "1/2 cup grated parmesan cheese",
            "1 cup croutons",
            "1/2 cup Caesar dressing",
            "Salt and black pepper to taste"
        ],
        directions: [
            "Wash and dry the romaine lettuce.",
            "In a large bowl, toss lettuce with Caesar dressing.",
            "Add croutons and grated parmesan cheese.",
            "Season with salt and black pepper to taste.",
            "Serve immediately."
        ]
    },
    {
        name: "Grilled Cheese Sandwich",
        description: "A buttery, crispy sandwich with melted cheese.",
        servings: "2",
        time: "10 minutes",
        ingredients: [
            "4 slices of bread",
            "4 slices of cheese (cheddar, mozzarella, or your choice)",
            "2 tbsp butter"
        ],
        directions: [
            "Butter one side of each slice of bread.",
            "Place a slice of cheese between two bread slices, buttered sides facing out.",
            "Heat a skillet over medium heat and cook the sandwich until golden brown on both sides.",
            "Serve warm."
        ]
    },
    {
        name: "Beef Tacos",
        description: "Tacos filled with seasoned ground beef and fresh toppings.",
        servings: "4",
        time: "20 minutes",
        ingredients: [
            "1 lb ground beef",
            "1 packet taco seasoning",
            "8 small taco shells",
            "1 cup shredded lettuce",
            "1 cup diced tomatoes",
            "1 cup shredded cheese",
            "1/2 cup sour cream",
            "1/2 cup salsa"
        ],
        directions: [
            "Cook ground beef in a skillet over medium heat until browned.",
            "Add taco seasoning and water according to package instructions.",
            "Warm taco shells in a skillet or microwave.",
            "Fill taco shells with ground beef and top with lettuce, tomatoes, cheese, sour cream, and salsa.",
            "Serve immediately."
        ]
    },
    {
        name: "Chicken Stir Fry",
        description: "A quick and healthy dish with chicken and colorful veggies.",
        servings: "4",
        time: "25 minutes",
        ingredients: [
            "2 chicken breasts, sliced",
            "2 cups mixed vegetables (bell peppers, broccoli, carrots)",
            "3 tbsp soy sauce",
            "1 tbsp sesame oil",
            "2 cloves garlic, minced",
            "1 tsp ginger, minced",
            "1 tbsp cornstarch (optional, for thickening)",
            "2 tbsp water (optional, for thickening)"
        ],
        directions: [
            "Heat sesame oil in a pan over medium heat.",
            "Add chicken and cook until no longer pink.",
            "Add garlic and ginger, and cook for 1 minute.",
            "Add mixed vegetables and cook until tender-crisp.",
            "Stir in soy sauce and cook for 2-3 minutes.",
            "For a thicker sauce, mix cornstarch with water and add to the pan.",
            "Serve hot with rice or noodles."
        ]
    },
    {
        name: "Banana Bread",
        description: "A moist and sweet loaf perfect for breakfast or dessert.",
        servings: "8",
        time: "1 hour",
        ingredients: [
            "3 ripe bananas, mashed",
            "1/3 cup melted butter",
            "1 cup sugar",
            "1 large egg, beaten",
            "1 tsp vanilla extract",
            "1 tsp baking soda",
            "1/4 tsp salt",
            "1 1/2 cups all-purpose flour"
        ],
        directions: [
            "Preheat oven to 350°F (175°C) and grease a loaf pan.",
            "In a bowl, mix mashed bananas and melted butter.",
            "Add sugar, beaten egg, and vanilla extract, and mix well.",
            "Stir in baking soda, salt, and flour until combined.",
            "Pour batter into the prepared loaf pan.",
            "Bake for 50-60 minutes, or until a toothpick comes out clean.",
            "Let cool before slicing."
        ]
    },
    {
        name: "Vegetable Soup",
        description: "A hearty and nutritious soup with seasonal vegetables.",
        servings: "6",
        time: "40 minutes",
        ingredients: [
            "1 tbsp olive oil",
            "1 onion, diced",
            "2 carrots, sliced",
            "2 celery stalks, diced",
            "3 cloves garlic, minced",
            "4 cups vegetable broth",
            "2 cups diced tomatoes",
            "1 cup green beans",
            "1 cup corn kernels",
            "Salt and pepper to taste"
        ],
        directions: [
            "Heat olive oil in a large pot over medium heat.",
            "Add onion, carrots, celery, and garlic, and cook until softened.",
            "Pour in vegetable broth and diced tomatoes.",
            "Bring to a boil, then reduce heat and simmer for 20 minutes.",
            "Add green beans and corn, and cook for another 10 minutes.",
            "Season with salt and pepper to taste.",
            "Serve hot."
        ]
    },
    {
        name: "Homemade Pizza",
        description: "A customizable pizza with a homemade crust and toppings.",
        servings: "4",
        time: "1 hour",
        ingredients: [
            "1 pizza dough (store-bought or homemade)",
            "1/2 cup pizza sauce",
            "1 cup shredded mozzarella cheese",
            "Toppings of your choice (pepperoni, mushrooms, bell peppers, etc.)"
        ],
        directions: [
            "Preheat oven to 475°F (245°C).",
            "Roll out pizza dough on a floured surface.",
            "Spread pizza sauce over the dough.",
            "Sprinkle shredded mozzarella cheese over the sauce.",
            "Add your favorite toppings.",
            "Bake for 12-15 minutes, or until the crust is golden and the cheese is bubbly.",
            "Slice and serve."
        ]
    },
    {
        name: "Chocolate Chip Cookies",
        description: "Chewy and delicious cookies with melty chocolate chips.",
        servings: "24 cookies",
        time: "30 minutes",
        ingredients: [
            "1 cup unsalted butter, softened",
            "1 cup brown sugar",
            "1/2 cup granulated sugar",
            "2 large eggs",
            "1 tsp vanilla extract",
            "2 1/4 cups all-purpose flour",
            "1 tsp baking soda",
            "1/2 tsp salt",
            "2 cups chocolate chips"
        ],
        directions: [
            "Preheat oven to 375°F (190°C) and line baking sheets with parchment paper.",
            "In a bowl, cream together butter, brown sugar, and granulated sugar.",
            "Beat in eggs and vanilla extract.",
            "In another bowl, mix flour, baking soda, and salt.",
            "Gradually add the dry ingredients to the wet ingredients.",
            "Stir in chocolate chips.",
            "Drop spoonfuls of dough onto the prepared baking sheets.",
            "Bake for 8-10 minutes, or until golden brown.",
            "Cool on a wire rack before serving."
        ]
    }
];


export default { categories, recipes }
