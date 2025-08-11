// seedProducts.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const products = [
  {
    name: "Banana-Choco Festive Cake",
    category: "No-Bake",
    price: 29.49,
    stock: 4,
    image: "/image/no-baking4.webp",
    sugarFree: true,
    noBake: true
  },
  {
    name: "Mocha Walnut Temptation",
    category: "Cake",
    price: 29.99,
    stock: 5,
    image: "/image/cake23.jpeg"
  },
  {
    name: "Strawberry-Matcha Mousse Cake",
    category: "No-Bake",
    price: 26.49,
    stock: 5,
    image: "/image/no-baking2.webp",
    sugarFree: true,
    noBake: true
  },
  {
    name: "Pistachio Delight with Raspberry",
    category: "No-Bake",
    price: 27.99,
    stock: 5,
    image: "/image/no-baking3.jpg",
    sugarFree: true,
    noBake: true
  },
  {
    name: "Festive Cupcake 27",
    category: "Cupcake",
    price: 24.99,
    stock: 5,
    image: "/image/capcake2.jpeg"
  },
  {
    name: "Berry Heart Mousse Fantasy",
    category: "No-Bake",
    price: 23.49,
    stock: 7,
    image: "/image/no-baking5.jpg",
    sugarFree: true,
    noBake: true
  },
  {
    name: "Mini Fruit Collection Set",
    category: "No-Bake",
    price: 21.99,
    stock: 6,
    image: "/image/no-baking6.jpeg",
    sugarFree: true,
    noBake: true
  },
  {
    name: "Layered Cup Mousse with Flowers",
    category: "No-Bake",
    price: 25.49,
    stock: 5,
    image: "/image/no-baking7.jpeg",
    sugarFree: true,
    noBake: true
  },
  {
    name: "Poppy-Blueberry Celebration Cake",
    category: "No-Bake",
    price: 27.99,
    stock: 4,
    image: "/image/no-baking8.jpeg",
    sugarFree: true,
    noBake: true
  },
  {
    name: "Creative Kids Cake 3D Design",
    category: "No-Bake",
    price: 28.49,
    stock: 6,
    image: "/image/no-baking9.jpeg",
    sugarFree: true,
    noBake: true
  },
  {
    name: "Lemon Mousse with Vanilla",
    category: "Cake",
    price: 24.99,
    stock: 7,
    image: "/image/cake10.jpeg"
  },
  {
    name: "Strawberry Yogurt Bliss",
    category: "Cake",
    price: 27.49,
    stock: 5,
    image: "/image/cake13.jpeg"
  },
  {
    name: "Oat-Carrot Healthy Delight",
    category: "Cake",
    price: 29.99,
    stock: 6,
    image: "/image/cake15.jpeg"
  },
  {
    name: "Beet-Carrot Party Cake",
    category: "Cake",
    price: 19.99,
    stock: 7,
    image: "/image/cake17.jpeg"
  },
  {
    name: "White Chocolate & Raspberry Dream",
    category: "Cake",
    price: 22.49,
    stock: 5,
    image: "/image/cake18.jpeg"
  },
  {
    name: "Cherry & Almond Fantasy",
    category: "Cake",
    price: 24.99,
    stock: 6,
    image: "/image/cake19.jpeg"
  },
  {
    name: "Creamy Mango Coconut",
    category: "Cake",
    price: 27.49,
    stock: 7,
    image: "/image/cake21.jpeg"
  },
  {
    name: "Citrus Harmony with Berries",
    category: "No-Bake",
    price: 24.99,
    stock: 6,
    image: "/image/no-baking1.jpg",
    sugarFree: true,
    noBake: true
  },
  {
    name: "Apricot-Honey Celebration",
    category: "Cake",
    price: 19.99,
    stock: 6,
    image: "/image/cake24.jpeg"
  },
  {
    name: "Pineapple-Mint Miracle",
    category: "Cake",
    price: 22.49,
    stock: 7,
    image: "/image/capcake1.jpeg"
  },
  {
    name: "Blueberry Celebration",
    category: "Fruit",
    price: 22.49,
    stock: 7,
    image: "/image/blueberry-cake.jpeg"
  },
  {
    name: "Festive Cupcake 28",
    category: "Cupcake",
    price: 27.49,
    stock: 6,
    image: "/image/capcake3.jpeg"
  },
  {
    name: "Festive Cupcake 29",
    category: "Cupcake",
    price: 29.99,
    stock: 7,
    image: "/image/capcake4.jpeg"
  },
  {
    name: "Kiwi & Pistachio Mousse",
    category: "Fruit",
    price: 19.99,
    stock: 5,
    image: "/image/kiwi-cake.jpeg"
  },
  {
    name: "Kyiv Chestnut Cake",
    category: "Cake",
    price: 22.49,
    stock: 6,
    image: "/image/kyiv.jpeg"
  },
  {
    name: "Lemon Zest Delight",
    category: "Fruit",
    price: 24.99,
    stock: 7,
    image: "/image/lemon-cake.jpeg"
  },
  {
    name: "Nuts & Blueberry Gold",
    category: "Chocolate",
    price: 27.49,
    stock: 5,
    image: "/image/nuts and blueberry-cake.jpeg"
  },
  {
    name: "Raspberry Velvet",
    category: "Fruit",
    price: 29.99,
    stock: 6,
    image: "/image/raspberry-cake.jpeg"
  },
  {
    name: "Roblox Birthday Cake",
    category: "Cake",
    price: 19.99,
    stock: 7,
    image: "/image/roblox-cake.jpeg"
  },
  {
    name: "Strawberry Fantasy",
    category: "Fruit",
    price: 22.49,
    stock: 5,
    image: "/image/strawberries-cake.jpeg"
  },
  {
    name: "Elegant Strawberry Cream",
    category: "Cake",
    price: 24.99,
    stock: 6,
    image: "/image/strawberry-cake.jpeg"
  },
  {
    name: "Pistachio-Strawberry Layer Cake",
    category: "Cake",
    price: 22.49,
    stock: 7,
    image: "/image/cake23.jpg"
  },
  {
    name: "Football Theme Cake",
    category: "Cake",
    price: 24.99,
    stock: 5,
    image: "/image/football-cake.jpg"
  },
];

(async () => {
  for (const product of products) {
    try {
      const res = await fetch('http://localhost:10000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      const data = await res.json();
      console.log(`✅ Added: ${data.name || product.name}`);
    } catch (err) {
      console.error(`❌ Error adding ${product.name}:`, err.message);
    }
  }
})();
