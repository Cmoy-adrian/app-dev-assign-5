// Import packages, initialize an express app, and define the port you will use
const { body, validationResult } = require('express-validator');

const express = require('express');
const app = express();
const port = 3000;


// Data for the server
const menuItems = [
  {
    id: 1,
    name: "Classic Burger",
    description: "Beef patty with lettuce, tomato, and cheese on a sesame seed bun",
    price: 12.99,
    category: "entree",
    ingredients: ["beef", "lettuce", "tomato", "cheese", "bun"],
    available: true
  },
  {
    id: 2,
    name: "Chicken Caesar Salad",
    description: "Grilled chicken breast over romaine lettuce with parmesan and croutons",
    price: 11.50,
    category: "entree",
    ingredients: ["chicken", "romaine lettuce", "parmesan cheese", "croutons", "caesar dressing"],
    available: true
  },
  {
    id: 3,
    name: "Mozzarella Sticks",
    description: "Crispy breaded mozzarella served with marinara sauce",
    price: 8.99,
    category: "appetizer",
    ingredients: ["mozzarella cheese", "breadcrumbs", "marinara sauce"],
    available: true
  },
  {
    id: 4,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center, served with vanilla ice cream",
    price: 7.99,
    category: "dessert",
    ingredients: ["chocolate", "flour", "eggs", "butter", "vanilla ice cream"],
    available: true
  },
  {
    id: 5,
    name: "Fresh Lemonade",
    description: "House-made lemonade with fresh lemons and mint",
    price: 3.99,
    category: "beverage",
    ingredients: ["lemons", "sugar", "water", "mint"],
    available: true
  },
  {
    id: 6,
    name: "Fish and Chips",
    description: "Beer-battered cod with seasoned fries and coleslaw",
    price: 14.99,
    category: "entree",
    ingredients: ["cod", "beer batter", "potatoes", "coleslaw", "tartar sauce"],
    available: false
  }
];


// Define routes and implement middleware here
// Middleware functions



// Use middleware
app.use(express.json());


// Routes
app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

app.get('/api/menu/:id', (req, res) => {
  const menuId = parseInt(req.params.id);
  const menu = menuItems.find(m => m.id === menuId);

  if (menu) {
    res.json(menu);
  } else {
    res.status(404).json({ error: "Menu items not found"});
  }

});

app.post('/api/menu', (req, res) => {
  const { name, description, price, category, ingredients} = req.body;

  const newItem = {
    id: menuItems.length + 1,
    name,
    description,
    price,
    category,
    ingredients,
    available: true
  };

  menuItems.push(newItem);
  res.status(201).json(newItem);
});

app.put('api/menu/:id', (req, res) => {
  const menuId = parseInt(req.params.id);
  const { name, description, price, category, ingredients} = req.body;

  const menuIndex = menuItems.findIndex(m => m.id === menuId);

  if (menuIndex === -1) {
    return res.status(404).json({ error: 'Menu item not found'});
  }

  menuItems[menuIndex] = {
    id: menuId,
    name,
    description,
    price,
    category,
    ingredients,
    available
  };

  res.json(menuItems[menuIndex]);
});

app.delete('api/menu/:id', (req, res) => {
  const menuId = parseInt(req.params.id);
  const menuIndex = menuItems.find(m => m.id === menuId);

  if (menuIndex === -1) {
    return res.status(404).json({ error: 'Menu item not found'});
  }

  const deletedItem = menuItems.splice(menuIndex, 1)[0];
  res.json({ message: 'Menu item deleted', menuItems: deletedItem});
});

// Listen for port going live
app.listen(port, () => {
    console.log(`Restaurant API running at http://localhost:${port}`);
});
