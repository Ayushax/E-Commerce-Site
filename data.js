const shopItemsData = [
  {
    id: "item1",
    name: "HP OMEN Gaming Laptop",
    price: 45000,
    desc: "High-performance gaming laptop with 14\" IPS Brightview QHD display, 12th Gen Intel Core i5, 8GB RAM, advanced cooling, and multiple connectivity ports.",
    img: "images/hp-omen.jpg"
  },
  {
    id: "item2",
    name: "Lenovo ThinkPad X1 Carbon",
    price: 39000,
    desc: "Ultra-light 14\" business laptop featuring Intel Core i7, 16GB RAM, 1TB SSD, durability, security features, and long battery life for professionals on the move.",
    img: "images/lenovo-x1-carbon.jpg"
  },
  {
    id: "item3",
    name: "Logitech K980 Wireless Keyboard",
    price: 1300,
    desc: "Solar-powered wireless keyboard with Bluetooth, customizable keys, and long battery life for comfortable typing at work or home.",
    img: "images/logitech-k980.jpg"
  },
  {
    id: "item4",
    name: "Yamaha PSR-EW410 Portable Keyboard",
    price: 999,
    desc: "76-key portable keyboard with touch-sensitive keys, multiple instrument sounds, and lesson functions ideal for beginners and performers.",
    img: "images/yamaha-psr-ew410.jpg"
  },
  {
    id: "item5",
    name: "Apple Magic Mouse (USB-C)",
    price: 4999,
    desc: "Wireless rechargeable mouse with smooth Multi-Touch surface supporting gestures like swiping and scrolling, pairs seamlessly with Mac devices.",
    img: "images/apple-magic-mouse.jpg"
  },
  {
    id: "item6",
    name: "Razer Basilisk Wireless Gaming Mouse",
    price: 150,
    desc: "Gaming mouse with customizable 12-button thumb grid, RGB lighting, ergonomic design, and high-precision optical sensor for FPS and MMO gamers.",
    img: "images/razer-basilisk.jpg"
  },
  {
    id: "item7",
    name: "Xiaomi Bluetooth Speaker",
    price: 700,
    desc: "Portable outdoor speaker delivering 360° omnidirectional sound at 93dB, RGB lighting effects, IP67 water/dust resistance, and 17 hours battery life.",
    img: "images/xiaomi-bluetooth-speaker.jpg"
  },
  {
    id: "item8",
    name: "Marshall Acton III Bluetooth Speaker",
    price: 30000,
    desc: "Compact home speaker with re-engineered Marshall sound, 30W woofer, two 15W tweeters, and top panel controls for volume, bass, treble, and playback.",
    img: "images/marshall-acton-iii.jpg"
  },
  {
    id: "item9",
    name: "Apple Beats Studio Buds",
    price: 1500,
    desc: "True wireless earbuds with Active Noise Cancellation, Transparency mode, custom acoustic platform for rich sound, multiple ear tip sizes, 8 hours playtime.",
    img: "images/apple-beats-studio-buds.jpg"
  },
  {
    id: "item10",
    name: "JBL Tune 230NC",
    price: 10000,
    desc: "Wireless earbuds with advanced noise cancellation, 4 microphones, 40 hours total playtime, clear call quality, and compact design for all-day use.",
    img: "images/jbl-tune-230nc.jpg"
  },
  {
    id: "item11",
    name: "Jabra Elite 75t",
    price: 14000,
    desc: "Small true wireless earbuds featuring MultiSensor Voice technology with 4 microphones, adjustable ANC, and 7.5 hours battery on a single charge.",
    img: "images/jabra-elite-75t.jpg"
  },
  {
    id: "item12",
    name: "HP Spectre x360 Convertible",
    price: 2000,
    desc: "Versatile 2-in-1 laptop with 13.5\" OLED display, 13th Gen Intel Core i7, 16GB RAM, 1TB SSD, convertible design for professionals and creatives.",
    img: "images/hp-spectre-x360.jpg"
  }
];

// --- NEW DATA ADDITIONS ---

const categoriesData = [
    { name: "Smartphones", icon: "fa-mobile-screen-button" },
    { name: "Laptops & PCs", icon: "fa-laptop" },
    { name: "Audio Gear", icon: "fa-headphones" },
    
    // --- REPLACED ICON: Use 'fa-clock' or 'fa-watch' if available ---
    { name: "Wearables", icon: "fa-clock" }, // Using a widely available clock icon ⌚
    // OR try 'fa-watch' if your current FA version supports it
    
    { name: "Drones & Toys", icon: "fa-gamepad" },
    { name: "Home Automation", icon: "fa-lightbulb" }
];

const dealsData = [
    { title: "Flat 50% Off", text: "On all accessories!", color: "#4CAF50" },
    { title: "Free Shipping", text: "On orders above ₹1500", color: "#2196F3" },
    { title: "20% Cashback", text: "Using HDFC Cards", color: "#FF9800" }
];
// --- END NEW DATA ADDITIONS ---
// ... (Your existing shopItemsData array follows)
