export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Kashi Banarasi Silk Saree',
    sku: 'AAV-SAR-001',
    category: 'Sarees',
    subcategory: 'Silk Sarees',
    price: 8990,
    mrp: 11990,
    badge: 'HANDLOOM',
    fabric: 'Silk',
    craft: 'Banarasi',
    color: 'Wine',
    colorHex: '#4A0E17',
    occasion: 'Wedding',
    sizes: ['One Size'],
    sareeLength: '5.5 metres',
    blousePiece: '1 metre unstitched silk blouse piece included',
    careInstructions: 'Dry Clean Only. Store wrapped in muslin cloth.',
    stock: 8,
    lowStockThreshold: 10,
    status: 'Active',
    rating: 4.9,
    reviewCount: 38,
    description: 'Woven by master weavers in Varanasi, this luxurious deep wine Banarasi silk saree features gold zari Kadwa floral weaves across the drape and a majestic pallu. Designed to be a heritage heirloom piece for weddings and grand festive celebrations.',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { sku: 'AAV-SAR-001-WINE', color: 'Wine', size: 'One Size', price: 8990, stock: 8 }
    ],
    featured: true,
    festiveEdit: true
  },
  {
    id: 'prod-2',
    name: 'Gulabi Handloom Saree',
    sku: 'AAV-SAR-002',
    category: 'Sarees',
    subcategory: 'Handloom',
    price: 6490,
    mrp: 7990,
    badge: 'BESTSELLER',
    fabric: 'Chanderi',
    craft: 'Handloom',
    color: 'Pink',
    colorHex: '#D87093',
    occasion: 'Festive',
    sizes: ['One Size'],
    sareeLength: '5.5 metres',
    blousePiece: '0.9 metre matching tissue blouse piece',
    careInstructions: 'Gentle dry clean recommended.',
    stock: 15,
    lowStockThreshold: 5,
    status: 'Active',
    rating: 4.8,
    reviewCount: 24,
    description: 'Soft rose pink Chanderi handloom drape woven with silver zari dots and subtle golden borders. Lightweight and breathable, perfect for daytime pujas, intimate festive gatherings, and sangeet celebrations.',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { sku: 'AAV-SAR-002-PNK', color: 'Pink', size: 'One Size', price: 6490, stock: 15 }
    ],
    featured: true,
    festiveEdit: true
  },
  {
    id: 'prod-3',
    name: 'Meher Anarkali Set',
    sku: 'AAV-SET-003',
    category: 'Salwar Sets',
    subcategory: 'Anarkali Suits',
    price: 4990,
    mrp: 6990,
    badge: 'NEW',
    fabric: 'Georgette',
    craft: 'Chikankari',
    color: 'Ivory',
    colorHex: '#FAF6F0',
    occasion: 'Festive',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    careInstructions: 'Dry clean only.',
    stock: 22,
    lowStockThreshold: 8,
    status: 'Active',
    rating: 4.9,
    reviewCount: 19,
    description: 'Flowing floor-length ivory georgette Anarkali detailed with delicate Lucknowi Chikankari embroidery and subtle Mukaish work. Paired with a churidar and a sheer organza dupatta with scalloped borders.',
    images: [
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { sku: 'AAV-SET-003-XS', color: 'Ivory', size: 'XS', price: 4990, stock: 3 },
      { sku: 'AAV-SET-003-S', color: 'Ivory', size: 'S', price: 4990, stock: 5 },
      { sku: 'AAV-SET-003-M', color: 'Ivory', size: 'M', price: 4990, stock: 6 },
      { sku: 'AAV-SET-003-L', color: 'Ivory', size: 'L', price: 4990, stock: 4 },
      { sku: 'AAV-SET-003-XL', color: 'Ivory', size: 'XL', price: 4990, stock: 4 }
    ],
    featured: true,
    festiveEdit: false
  },
  {
    id: 'prod-4',
    name: 'Noor Chikankari Kurta',
    sku: 'AAV-KUR-004',
    category: 'Kurtis',
    subcategory: 'Straight Kurtas',
    price: 2790,
    mrp: 3490,
    badge: 'BESTSELLER',
    fabric: 'Cotton',
    craft: 'Chikankari',
    color: 'Green',
    colorHex: '#163319',
    occasion: 'Office',
    sizes: ['S', 'M', 'L', 'XL'],
    careInstructions: 'Hand wash separately in cold water.',
    stock: 18,
    lowStockThreshold: 6,
    status: 'Active',
    rating: 4.7,
    reviewCount: 42,
    description: 'Deep forest green cotton straight kurta adorned with intricate hand-embroidered Bakhiya and Phanda stitches. Features high side slits and a notched collar neckline, perfect for office and casual elegance.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { sku: 'AAV-KUR-004-GRN-S', color: 'Green', size: 'S', price: 2790, stock: 4 },
      { sku: 'AAV-KUR-004-GRN-M', color: 'Green', size: 'M', price: 2790, stock: 6 },
      { sku: 'AAV-KUR-004-GRN-L', color: 'Green', size: 'L', price: 2790, stock: 5 },
      { sku: 'AAV-KUR-004-GRN-XL', color: 'Green', size: 'XL', price: 2790, stock: 3 }
    ],
    featured: true,
    festiveEdit: false
  },
  {
    id: 'prod-5',
    name: 'Riwaaz Embroidered Lehenga',
    sku: 'AAV-LEH-005',
    category: 'Lehengas',
    subcategory: 'Bridal & Festive Lehengas',
    price: 12990,
    mrp: 17990,
    badge: 'FESTIVE',
    fabric: 'Velvet',
    craft: 'Banarasi',
    color: 'Maroon',
    colorHex: '#4A0E17',
    occasion: 'Wedding',
    sizes: ['S', 'M', 'L', 'XL'],
    careInstructions: 'Professional dry clean only.',
    stock: 4,
    lowStockThreshold: 5,
    status: 'Active',
    rating: 5.0,
    reviewCount: 15,
    description: 'Opulent deep crimson maroon royal velvet lehenga with dense Zardozi hand-embroidery and antique golden threadwork. Accompanied by a padded sweetheart blouse and double net dupatta with embellished borders.',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { sku: 'AAV-LEH-005-MAR-S', color: 'Maroon', size: 'S', price: 12990, stock: 1 },
      { sku: 'AAV-LEH-005-MAR-M', color: 'Maroon', size: 'M', price: 12990, stock: 2 },
      { sku: 'AAV-LEH-005-MAR-L', color: 'Maroon', size: 'L', price: 12990, stock: 1 }
    ],
    featured: true,
    festiveEdit: true
  },
  {
    id: 'prod-6',
    name: 'Tara Organza Dupatta',
    sku: 'AAV-ACC-006',
    category: 'Dupattas',
    subcategory: 'Organza Dupattas',
    price: 1890,
    mrp: 2490,
    badge: 'NEW',
    fabric: 'Organza',
    craft: 'Handloom',
    color: 'Yellow',
    colorHex: '#E6D2A3',
    occasion: 'Festive',
    sizes: ['One Size'],
    careInstructions: 'Dry clean only. Iron on reverse low setting.',
    stock: 30,
    lowStockThreshold: 10,
    status: 'Active',
    rating: 4.6,
    reviewCount: 12,
    description: 'Sunburst marigold yellow organza dupatta hand-painted with botanical floral prints and detailed with delicate cut-dana lace borders. Instantly elevates any minimalist Kurti or Anarkali.',
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { sku: 'AAV-ACC-006-YEL', color: 'Yellow', size: 'One Size', price: 1890, stock: 30 }
    ],
    featured: true,
    festiveEdit: true
  },
  {
    id: 'prod-7',
    name: 'Meera Co-ord Set',
    sku: 'AAV-COD-007',
    category: 'Co-ord Sets',
    subcategory: 'Indo-Western Sets',
    price: 3490,
    mrp: 4490,
    badge: 'LIMITED',
    fabric: 'Linen',
    craft: 'Ikat',
    color: 'Blue',
    colorHex: '#1E3F66',
    occasion: 'Casual',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    careInstructions: 'Machine wash cold inside out.',
    stock: 12,
    lowStockThreshold: 4,
    status: 'Active',
    rating: 4.7,
    reviewCount: 29,
    description: 'Contemporary Pochampally Ikat weave linen tunic paired with wide-leg cropped trousers. Blends ancient artisan Telangana Ikat geometry with modern tailored silhouette for effortless everyday sophistication.',
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { sku: 'AAV-COD-007-BLU-S', color: 'Blue', size: 'S', price: 3490, stock: 3 },
      { sku: 'AAV-COD-007-BLU-M', color: 'Blue', size: 'M', price: 3490, stock: 5 },
      { sku: 'AAV-COD-007-BLU-L', color: 'Blue', size: 'L', price: 3490, stock: 4 }
    ],
    featured: true,
    festiveEdit: false
  },
  {
    id: 'prod-8',
    name: 'Ziya Temple Jewellery Set',
    sku: 'AAV-JWL-008',
    category: 'Jewellery',
    subcategory: 'Necklace Sets',
    price: 2490,
    mrp: 3290,
    badge: 'BESTSELLER',
    fabric: 'Brass / Antique Gold',
    craft: 'Handcrafted',
    color: 'Gold',
    colorHex: '#C5A059',
    occasion: 'Wedding',
    sizes: ['One Size'],
    careInstructions: 'Store in airtight box away from water & perfumes.',
    stock: 25,
    lowStockThreshold: 8,
    status: 'Active',
    rating: 4.9,
    reviewCount: 51,
    description: 'Traditional South Indian antique matte gold temple necklace set featuring Goddess Lakshmi motifs and cluster pearl drops. Includes matching Jhumka earrings with ruby-pink Kemp stone detailing.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { sku: 'AAV-JWL-008-GLD', color: 'Gold', size: 'One Size', price: 2490, stock: 25 }
    ],
    featured: true,
    festiveEdit: true
  },
  {
    id: 'prod-9',
    name: 'Charminar Pearl & Potli Handbag',
    sku: 'AAV-ACC-009',
    category: 'Handbags',
    subcategory: 'Potli Bags',
    price: 1590,
    mrp: 1990,
    badge: 'NEW',
    fabric: 'Silk & Pearls',
    craft: 'Kalamkari',
    color: 'Ivory',
    colorHex: '#FAF6F0',
    occasion: 'Festive',
    sizes: ['One Size'],
    careInstructions: 'Spot clean with soft damp cloth.',
    stock: 20,
    lowStockThreshold: 5,
    status: 'Active',
    rating: 4.8,
    reviewCount: 16,
    description: 'Hand-embroidered silk potli bag encrusted with authentic Hyderabad freshwater pearl tassels and intricate gold zardozi. Features a drawstring closure and soft padded interior.',
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { sku: 'AAV-ACC-009-IVR', color: 'Ivory', size: 'One Size', price: 1590, stock: 20 }
    ],
    featured: false,
    festiveEdit: true
  },
  {
    id: 'prod-10',
    name: 'Avani Kalamkari Printed Saree',
    sku: 'AAV-SAR-010',
    category: 'Sarees',
    subcategory: 'Cotton Sarees',
    price: 4290,
    mrp: 5290,
    badge: 'HANDLOOM',
    fabric: 'Cotton',
    craft: 'Kalamkari',
    color: 'Terracotta',
    colorHex: '#C85A32',
    occasion: 'Casual',
    sizes: ['One Size'],
    sareeLength: '5.5 metres',
    blousePiece: '0.8 metre printed cotton blouse piece',
    careInstructions: 'Hand wash separately with mild liquid soap.',
    stock: 14,
    lowStockThreshold: 6,
    status: 'Active',
    rating: 4.7,
    reviewCount: 22,
    description: 'Authentic Srikalahasti style hand-painted organic cotton saree decorated with peacocks, lotuses and vine motifs in natural vegetable dyes.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { sku: 'AAV-SAR-010-TER', color: 'Terracotta', size: 'One Size', price: 4290, stock: 14 }
    ],
    featured: false,
    festiveEdit: false
  },
  {
    id: 'prod-11',
    name: 'Nizam Pearl Choker Set',
    sku: 'AAV-JWL-011',
    category: 'Jewellery',
    subcategory: 'Chokers',
    price: 3290,
    mrp: 4490,
    badge: 'BESTSELLER',
    fabric: 'Hyderabadi Pearls & Gold Plated',
    craft: 'Handcrafted',
    color: 'Ivory',
    colorHex: '#FAF6F0',
    occasion: 'Wedding',
    sizes: ['One Size'],
    careInstructions: 'Wipe gently after use with clean dry cloth.',
    stock: 9,
    lowStockThreshold: 4,
    status: 'Active',
    rating: 4.9,
    reviewCount: 37,
    description: 'Inspired by the regal heritage of Hyderabad Nizam jewelry, this seven-strand seed pearl choker is anchored with an emerald-green doublet stone pendant.',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { sku: 'AAV-JWL-011-PRL', color: 'Ivory', size: 'One Size', price: 3290, stock: 9 }
    ],
    featured: false,
    festiveEdit: true
  },
  {
    id: 'prod-12',
    name: 'Surya Bandhani Silk Dupatta',
    sku: 'AAV-ACC-012',
    category: 'Dupattas',
    subcategory: 'Silk Dupattas',
    price: 2190,
    mrp: 2990,
    badge: 'HANDLOOM',
    fabric: 'Silk',
    craft: 'Bandhani',
    color: 'Red',
    colorHex: '#A82424',
    occasion: 'Festive',
    sizes: ['One Size'],
    careInstructions: 'Dry clean only to maintain crinkle texture.',
    stock: 16,
    lowStockThreshold: 5,
    status: 'Active',
    rating: 4.8,
    reviewCount: 18,
    description: 'Vibrant crimson red Gajji silk bandhani dupatta hand-tied with classic Rai Bandhej knot dots and finished with broad golden Zari borders.',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: [
      { sku: 'AAV-ACC-012-RED', color: 'Red', size: 'One Size', price: 2190, stock: 16 }
    ],
    featured: false,
    festiveEdit: true
  }
];

export const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: 'Sarees', description: 'Silk, handloom and contemporary drapes.', icon: 'Shirt', count: 48, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-2', name: 'Kurtis', description: 'Everyday elegance and workwear kurtas.', icon: 'Sparkles', count: 32, image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-3', name: 'Lehengas', description: 'Made for weddings and grand celebrations.', icon: 'Crown', count: 18, image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-4', name: 'Salwar Sets', description: 'Effortless festive Anarkalis and suit sets.', icon: 'Layers', count: 24, image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-5', name: 'Jewellery', description: 'The finishing touch with Hyderabad pearls & temple gold.', icon: 'Gem', count: 36, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-6', name: 'Dupattas', description: 'Handcrafted Bandhani, Organza & Kalamkari drapes.', icon: 'Feather', count: 15, image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-7', name: 'Co-ord Sets', description: 'Contemporary Indo-western silhouettes.', icon: 'Compass', count: 12, image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-8', name: 'Handbags', description: 'Potli bags encrusted with pearls and embroidery.', icon: 'ShoppingBag', count: 14, image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=600&q=80' }
];

export const INITIAL_COUPONS = [
  { id: 'coup-1', code: 'AAVANI10', discountType: 'percentage', discountValue: 10, minOrder: 2000, maxDiscount: 1500, expiry: '2026-12-31', usageLimit: 500, usageCount: 142, status: 'Active' },
  { id: 'coup-2', code: 'FESTIVE15', discountType: 'percentage', discountValue: 15, minOrder: 4999, maxDiscount: 2500, expiry: '2026-11-15', usageLimit: 300, usageCount: 89, status: 'Active' },
  { id: 'coup-3', code: 'WELCOME500', discountType: 'fixed', discountValue: 500, minOrder: 2999, maxDiscount: 500, expiry: '2026-12-31', usageLimit: 1000, usageCount: 420, status: 'Active' }
];

export const INITIAL_ORDERS = [
  {
    id: 'AAV-2026-1048',
    customer: {
      name: 'Ananya Reddy',
      email: 'ananya.reddy@example.com',
      phone: '+91 98490 12345',
      address: 'Plot 42, Road No. 10, Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pin: '500033'
    },
    items: [
      { id: 'prod-1', name: 'Kashi Banarasi Silk Saree', price: 8990, quantity: 1, color: 'Wine', size: 'One Size', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80' },
      { id: 'prod-8', name: 'Ziya Temple Jewellery Set', price: 2490, quantity: 1, color: 'Gold', size: 'One Size', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=200&q=80' }
    ],
    subtotal: 11480,
    discount: 1148,
    couponCode: 'AAVANI10',
    shipping: 0,
    tax: 574,
    total: 10906,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'Confirmed',
    createdAt: '2026-09-24T14:32:00.000Z',
    timeline: [
      { title: 'Order Placed', time: 'Sep 24, 2:32 PM', done: true },
      { title: 'Order Confirmed', time: 'Sep 24, 2:45 PM', done: true },
      { title: 'Packed at Jubilee Hills Boutique', time: 'Sep 25, 10:00 AM', done: false },
      { title: 'Shipped via Express Courier', time: 'Pending', done: false },
      { title: 'Delivered', time: 'Pending', done: false }
    ]
  },
  {
    id: 'AAV-2026-1047',
    customer: {
      name: 'Priyanka Rao',
      email: 'priyanka.rao@example.com',
      phone: '+91 98851 67890',
      address: 'Flat 302, Cyber Towers Lane, Madhapur',
      city: 'Hyderabad',
      state: 'Telangana',
      pin: '500081'
    },
    items: [
      { id: 'prod-3', name: 'Meher Anarkali Set', price: 4990, quantity: 1, color: 'Ivory', size: 'M', image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=200&q=80' }
    ],
    subtotal: 4990,
    discount: 500,
    couponCode: 'WELCOME500',
    shipping: 0,
    tax: 249,
    total: 4739,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    status: 'Shipped',
    createdAt: '2026-09-23T11:15:00.000Z',
    timeline: [
      { title: 'Order Placed', time: 'Sep 23, 11:15 AM', done: true },
      { title: 'Order Confirmed', time: 'Sep 23, 11:30 AM', done: true },
      { title: 'Packed at Jubilee Hills Boutique', time: 'Sep 24, 09:15 AM', done: true },
      { title: 'Shipped via Express Courier', time: 'Sep 24, 02:00 PM', done: true },
      { title: 'Out for Delivery', time: 'Sep 25, 09:00 AM', done: true }
    ]
  }
];

export const INITIAL_CUSTOMERS = [
  {
    id: 'cust-1',
    name: 'Ananya Reddy',
    email: 'ananya.reddy@example.com',
    phone: '+91 98490 12345',
    location: 'Hyderabad, Telangana',
    ordersCount: 4,
    totalSpent: 42850,
    lastOrderDate: '2026-09-24',
    status: 'VIP'
  },
  {
    id: 'cust-2',
    name: 'Priyanka Rao',
    email: 'priyanka.rao@example.com',
    phone: '+91 98851 67890',
    location: 'Hyderabad, Telangana',
    ordersCount: 2,
    totalSpent: 12490,
    lastOrderDate: '2026-09-23',
    status: 'Active'
  },
  {
    id: 'cust-3',
    name: 'Meera Sharma',
    email: 'meera.s@example.com',
    phone: '+91 98112 34567',
    location: 'Bengaluru, Karnataka',
    ordersCount: 3,
    totalSpent: 28900,
    lastOrderDate: '2026-09-18',
    status: 'Active'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    productName: 'Kashi Banarasi Silk Saree',
    customerName: 'Kavitha N.',
    rating: 5,
    date: '2026-09-15',
    review: 'The drape and sheen of this Banarasi silk saree surpassed my expectations. Wore it for my niece’s wedding in Hyderabad and received endless compliments! Premium packaging too.',
    verified: true,
    status: 'Published'
  },
  {
    id: 'rev-2',
    productId: 'prod-4',
    productName: 'Noor Chikankari Kurta',
    customerName: 'Deepa V.',
    rating: 5,
    date: '2026-09-10',
    review: 'The embroidery is so delicate and pure. Perfect fabric weight for Hyderabad summers. Sizing was exact.',
    verified: true,
    status: 'Published'
  },
  {
    id: 'rev-3',
    productId: 'prod-8',
    productName: 'Ziya Temple Jewellery Set',
    customerName: 'Sunita Rao',
    rating: 4,
    date: '2026-09-02',
    review: 'Very authentic antique finish without looking overly heavy. Pairs beautifully with my Kanchipuram sarees.',
    verified: true,
    status: 'Published'
  }
];

export const INITIAL_BANNERS = [
  {
    id: 'ban-1',
    title: 'THE FESTIVE EDIT 2026',
    subtitle: 'Celebration begins with what you wear.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'SHOP FESTIVE',
    ctaLink: '/shop?occasion=Festive',
    status: 'Active'
  },
  {
    id: 'ban-2',
    title: 'THE WEDDING COLLECTION',
    subtitle: 'Timeless Banarasi brocades & heavy Zardozi lehengas.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'EXPLORE BRIDAL',
    ctaLink: '/shop?occasion=Wedding',
    status: 'Active'
  }
];

export const BLOG_POSTS = [
  {
    id: 'blog-1',
    slug: 'how-to-choose-saree-for-wedding',
    title: 'How to Choose the Right Saree for an Indian Wedding',
    category: 'Guide',
    date: 'Sep 18, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Navigating Banarasi zari, heavy Kanchipuram drapes, and featherlight Organza for wedding rituals.',
    content: `Choosing the right saree for an Indian wedding requires balancing comfort, ceremony decorum, and timeless grandeur. Whether you are the bride, sister of the bride, or a cherished guest, each ceremony demands a tailored drape.

1. The Muhurtham or Pheras: Heavy Kanchipuram or Banarasi Silk
For the main morning ceremony, pure silk with real gold zari weaves remains unbeatable. Rich deep wines, traditional temple reds, and mustard golds symbolize prosperity and tradition.

2. The Sangeet & Cocktail Night: Fluid Georgette or Organza
Evening celebrations are meant for dance and joyful movements. Opt for organza sarees adorned with cut-dana lace or pre-draped georgette drapes that stay effortlessly in place.

3. The Mehendi & Haldi: Chanderi or Bandhani
Sunlit outdoor events call for bright marigold yellows, pistachios, and soft pinks. Chanderi handloom sarees offer a featherlight shine that feels cool even in warm afternoon weather.`
  },
  {
    id: 'blog-2',
    slug: 'banarasi-vs-kanchipuram-difference',
    title: 'Banarasi vs Kanchipuram: Understanding the Heritage Difference',
    category: 'Craft Heritage',
    date: 'Sep 12, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'A deep dive into Northern brocade art versus Southern Korvai weaving techniques.',
    content: `While both Banarasi and Kanchipuram sarees hold sacred status in an Indian woman's wedding trousseau, their weaving origins, motifs, and silk weights are distinct.

Banarasi Silk (Varanasi, North India):
Banarasi weaving was heavily influenced by Persian and Mughal artistry. Motifs include delicate floral vines (Jaal), Paisleys (Kalka), and architectural arches woven into fine mulberry or katan silk.

Kanchipuram Silk (Tamil Nadu, South India):
Kanchipuram sarees are woven using heavy 3-ply twisted silk yarn, making them naturally heavier and durable. The defining feature is 'Korvai' weaving, where the contrast body, border, and pallu are woven separately and interlocking joined by hand.`
  },
  {
    id: 'blog-3',
    slug: '5-ways-to-style-a-kurti',
    title: '5 Modern Ways to Style an Indian Kurti for Work & Weekends',
    category: 'Styling',
    date: 'Aug 28, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Transform your daily Chikankari and cotton kurtas into versatile contemporary outfits.',
    content: `Kurtis are the cornerstone of modern Indian wardrobes. Here is how to style your AAVANI straight kurtas for maximum versatility:

1. With Tailored Cropped Trousers for Executive Meetings
Pair a dark green or navy Chikankari straight kurta with ivory ankle-length trousers and leather juttis for crisp boardroom authority.

2. Layered with an Embellished Dupatta for Festive Dinners
Transform a solid cotton kurta instantly by draping a rich organza or Bandhani dupatta across one shoulder.

3. Belted over Wide-Leg Denim for Fusion Casuals
Cinch a straight-cut A-line kurta at the waist with a thin tan leather belt and blue jeans for an effortless weekend lunch outfit.`
  }
];
