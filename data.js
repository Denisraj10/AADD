// data.js
// Sample data for Sun Udhayam Catering (menu items and function packages).
// Prices are per plate in rupees. Change them to your real rates.

var menuItems = [
  // Vegetarian
  { name: "South Indian Thali",     type: "Veg",     price: 150, icon: "🍛" },
  { name: "Paneer Butter Masala",   type: "Veg",     price: 140, icon: "🧀" },
  { name: "Veg Biryani",            type: "Veg",     price: 120, icon: "🍚" },
  { name: "Gobi 65",                type: "Veg",     price: 80,  icon: "🥦" },
  { name: "Dosa & Idiyappam",       type: "Veg",     price: 70,  icon: "🥞" },
  { name: "Coconut Payasam",        type: "Veg",     price: 50,  icon: "🥥" },

  // Non-vegetarian
  { name: "Chettinad Chicken",      type: "Non-Veg", price: 200, icon: "🍗" },
  { name: "Mutton Biryani",         type: "Non-Veg", price: 280, icon: "🍖" },
  { name: "Fish Curry",             type: "Non-Veg", price: 180, icon: "🐟" },
  { name: "Prawn Masala",           type: "Non-Veg", price: 250, icon: "🦐" },
  { name: "Pepper Chicken",         type: "Non-Veg", price: 190, icon: "🌶️" },
  { name: "Chicken 65",             type: "Non-Veg", price: 130, icon: "🍗" }
];

var packages = [
  { name: "Pooja & Festival Meals", pricePerPlate: 180, details: "Traditional banana leaf veg meals" },
  { name: "Birthday Party",         pricePerPlate: 250, details: "Starter, biryani, curry and dessert" },
  { name: "Corporate Event",        pricePerPlate: 300, details: "Lunch boxes or buffet setup" },
  { name: "Wedding Feast",          pricePerPlate: 450, details: "Full veg and non-veg banana leaf feast" }
];
