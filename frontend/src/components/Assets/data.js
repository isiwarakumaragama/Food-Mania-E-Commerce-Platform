import p1_img from './product_1.png'
import p2_img from './product_2.png'
import p3_img from './product_3.png'
import p4_img from './product_4.png'

let data_product = [
  {
    id:1,
    name:"Chicken Taco with Garlic Cream",
    image:p1_img,
    new_price:400.00,
    old_price:450.00,
    category:"food",
    description:"Delicious Mexican-style chicken taco topped with creamy garlic sauce, fresh lettuce, and tomatoes",
    rating:4.5,
    reviews:120,
    prepTime:"15 mins",
    servings:1,
    ingredients:["Chicken", "Corn Tortilla", "Garlic Cream", "Lettuce", "Tomato"]
  },
  {
    id:2,
    name:"Extra Cheese Pizza with Masala",
    image:p2_img,
    new_price:2500.00,
    old_price:3000.00,
    category:"food",
    description:"Premium pizza loaded with extra mozzarella cheese and aromatic Indian masala spices",
    rating:4.7,
    reviews:250,
    prepTime:"20 mins",
    servings:2,
    ingredients:["Mozzarella Cheese", "Tomato Sauce", "Masala Spices", "Pizza Dough", "Vegetables"]
  },
  {
    id:3,
    name:"Large Hamburger",
    image:p3_img,
    new_price:600.00,
    old_price:700.00,
    category:"food",
    description:"Juicy flame-grilled burger with fresh beef patty, lettuce, tomato, pickles, and special sauce",
    rating:4.6,
    reviews:180,
    prepTime:"12 mins",
    servings:1,
    ingredients:["Beef Patty", "Burger Bun", "Lettuce", "Tomato", "Pickles", "Special Sauce"]
  },
  {
    id:4,
    name:"Chicken Kottu",
    image:p4_img,
    new_price:750.00,
    old_price:900.00,
    category:"food",
    description:"Traditional Sri Lankan chopped roti with spiced chicken, vegetables, and aromatic spices",
    rating:4.8,
    reviews:320,
    prepTime:"18 mins",
    servings:1,
    ingredients:["Roti", "Chicken", "Egg", "Onion", "Spices", "Vegetables"]
  },
];

export default data_product;
