export const CATEGORIES = [
  { id: 'all', name: 'All Produce', urdu: 'تمام اشیاء', icon: 'Sparkles', count: 32 },
  { id: 'vegetables', name: 'Fresh Vegetables', urdu: 'تازہ سبزیاں', icon: 'Carrot', count: 12 },
  { id: 'greens', name: 'Leafy Greens & Herbs', urdu: 'پتے والی سبزیاں', icon: 'Salad', count: 6 },
  { id: 'fruits', name: 'Seasonal Fruits', urdu: 'تازہ پھل', icon: 'Apple', count: 8 },
  { id: 'aromatics', name: 'Aromatics & Masalay', urdu: 'ادرک، لہسن و مصالحہ', icon: 'Flame', count: 4 },
  { id: 'bundles', name: 'Bachat Bundles', urdu: 'بچت پیکجز', icon: 'Package', count: 4 },
  { id: 'dryfruits', name: 'Dry Fruits & Honey', urdu: 'خشک میوہ جات', icon: 'Nut', count: 4 },
];

export const PRODUCTS = [
  // FRESH VEGETABLES
  {
    id: 'potato-new-crop',
    name: 'Fresh Potatoes (Aloo)',
    urduName: 'تازہ آلو (نئی فصل)',
    category: 'vegetables',
    badge: 'Mandi Direct',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    basePrice: 95,
    originalPrice: 120,
    baseUnit: '1 kg',
    rating: 4.9,
    reviewsCount: 142,
    weightOptions: [
      { label: '1 kg', multiplier: 1, isDefault: true },
      { label: '2.5 kg', multiplier: 2.4 },
      { label: '5 kg (Bachat Bag)', multiplier: 4.6 }
    ],
    description: 'Thin-skinned, golden farm-fresh potatoes sourced directly from Okara & Depalpur fields via Mandi. Cleaned of heavy soil and digitally weighed.',
    mandiGrade: 'Grade A+ (Premium Large)',
    nutrition: 'Rich in Potassium, Vitamin B6, Dietary Fiber',
    inStock: true
  },
  {
    id: 'red-onion-desi',
    name: 'Desi Red Onions (Pyaz)',
    urduName: 'دیسی لال پیاز',
    category: 'vegetables',
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    basePrice: 180,
    originalPrice: 210,
    baseUnit: '1 kg',
    rating: 4.8,
    reviewsCount: 188,
    weightOptions: [
      { label: '1 kg', multiplier: 1, isDefault: true },
      { label: '2.5 kg', multiplier: 2.4 },
      { label: '5 kg (Bachat Bag)', multiplier: 4.7 }
    ],
    description: 'Firm, dry-skinned, aromatic red onions from Sindh / Swat crops. Essential for daily handi and curries. No moist or hollow bulbs.',
    mandiGrade: 'Grade A (Tight Layers)',
    nutrition: 'High Quercetin, Vitamin C, Immune Support',
    inStock: true
  },
  {
    id: 'farm-tomatoes-red',
    name: 'Ripe Red Tomatoes (Tamatar)',
    urduName: 'سرخ رسیلے ٹماٹر',
    category: 'vegetables',
    badge: 'Today Special',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    basePrice: 140,
    originalPrice: 170,
    baseUnit: '1 kg',
    rating: 4.9,
    reviewsCount: 210,
    weightOptions: [
      { label: '500 g', multiplier: 0.55 },
      { label: '1 kg', multiplier: 1, isDefault: true },
      { label: '2 kg', multiplier: 1.95 }
    ],
    description: 'Crisp, bright red, firm salad and gravy tomatoes. Sourced early morning from central Punjab farms. Perfectly ripened on vine.',
    mandiGrade: 'Grade A+ (Farm Fresh)',
    nutrition: 'High Lycopene, Vitamin C & K',
    inStock: true
  },
  {
    id: 'lady-finger-bhindi',
    name: 'Tender Okra / Ladyfinger (Bhindi)',
    urduName: 'تازہ بھنڈی',
    category: 'vegetables',
    badge: 'Tender & Fresh',
    image: 'https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&w=600&q=80',
    basePrice: 160,
    originalPrice: 190,
    baseUnit: '1 kg',
    rating: 4.7,
    reviewsCount: 94,
    weightOptions: [
      { label: '500 g', multiplier: 0.55 },
      { label: '1 kg', multiplier: 1, isDefault: true },
      { label: '2 kg', multiplier: 1.9 }
    ],
    description: 'Small to medium tender green bhindi, snapped at tip to guarantee no hard seeds or fiber. Washed and dried carefully.',
    mandiGrade: 'Grade A (Small Tender)',
    nutrition: 'Folates, Fiber, Vitamin A & Calcium',
    inStock: true
  },
  {
    id: 'fresh-cauliflower-gobi',
    name: 'Fresh Cauliflower (Phool Gobi)',
    urduName: 'پھول گوبھی',
    category: 'vegetables',
    badge: null,
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=600&q=80',
    basePrice: 110,
    originalPrice: 140,
    baseUnit: '1 kg',
    rating: 4.8,
    reviewsCount: 76,
    weightOptions: [
      { label: '1 kg (approx 1 flower)', multiplier: 1, isDefault: true },
      { label: '2 kg', multiplier: 1.9 }
    ],
    description: 'Compact, snow-white curds with fresh crisp green leaves intact. Zero blemishes, worm-inspected.',
    mandiGrade: 'Grade A Snow White',
    nutrition: 'Sulforaphane, Vitamin C & B-complex',
    inStock: true
  },
  {
    id: 'green-capsicum-shimla',
    name: 'Crisp Bell Pepper / Shimla Mirch',
    urduName: 'شملہ مرچ',
    category: 'vegetables',
    badge: 'Crunchy',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80',
    basePrice: 220,
    originalPrice: 260,
    baseUnit: '1 kg',
    rating: 4.8,
    reviewsCount: 88,
    weightOptions: [
      { label: '500 g', multiplier: 0.55 },
      { label: '1 kg', multiplier: 1, isDefault: true },
      { label: '2 kg', multiplier: 1.9 }
    ],
    description: 'Deep glossy green capsicums with thick juicy walls. Ideal for Chinese rice, jalfrezi, or fresh salads.',
    mandiGrade: 'Grade A+ Greenhouse',
    nutrition: 'Extreme Vitamin C, Beta-Carotene',
    inStock: true
  },
  {
    id: 'desi-cucumber-kheera',
    name: 'Farm Fresh Cucumber (Desi Kheera)',
    urduName: 'دیسی کھیرا',
    category: 'vegetables',
    badge: 'Cool & Crisp',
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=600&q=80',
    basePrice: 90,
    originalPrice: 110,
    baseUnit: '1 kg',
    rating: 4.9,
    reviewsCount: 112,
    weightOptions: [
      { label: '500 g', multiplier: 0.55 },
      { label: '1 kg', multiplier: 1, isDefault: true },
      { label: '2 kg', multiplier: 1.9 }
    ],
    description: 'Straight, thin-skinned desi cucumbers picked at peak crispness. Hydrating and never bitter.',
    mandiGrade: 'Grade A Desi Tender',
    nutrition: '95% Water Content, Silica, Potassium',
    inStock: true
  },
  {
    id: 'bitter-gourd-karela',
    name: 'Desi Bitter Gourd (Karela)',
    urduName: 'دیسی کریلے',
    category: 'vegetables',
    badge: 'Health Choice',
    image: 'https://images.unsplash.com/photo-1764415438484-b5b28e5234be?auto=format&fit=crop&w=800&q=80',
    basePrice: 130,
    originalPrice: 160,
    baseUnit: '1 kg',
    rating: 4.6,
    reviewsCount: 65,
    weightOptions: [
      { label: '500 g', multiplier: 0.55 },
      { label: '1 kg', multiplier: 1, isDefault: true }
    ],
    description: 'Medium-sized dark green karelay with sharp ridges. Perfect for stuffed qeema karela or pan fry.',
    mandiGrade: 'Grade A Desi',
    nutrition: 'Blood Sugar Regulation, Polypeptide-p',
    inStock: true
  },
  {
    id: 'fresh-round-eggplant-baingan',
    name: 'Purple Eggplant / Baingan',
    urduName: 'گول بینگن',
    category: 'vegetables',
    badge: null,
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80',
    basePrice: 120,
    originalPrice: 150,
    baseUnit: '1 kg',
    rating: 4.7,
    reviewsCount: 54,
    weightOptions: [
      { label: '1 kg', multiplier: 1, isDefault: true },
      { label: '2 kg', multiplier: 1.9 }
    ],
    description: 'Glossy dark violet skin, soft seedless flesh. Ideal for authentic Baingan Bharta or Aloo Baingan.',
    mandiGrade: 'Grade A Round',
    nutrition: 'Nasunin Antioxidants, Fiber',
    inStock: true
  },
  {
    id: 'sweet-red-carrots-gajar',
    name: 'Punjab Red Carrots (Desi Gajar)',
    urduName: 'دیسی لال گاجر',
    category: 'vegetables',
    badge: 'Juicy Sweet',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80',
    basePrice: 110,
    originalPrice: 135,
    baseUnit: '1 kg',
    rating: 4.9,
    reviewsCount: 134,
    weightOptions: [
      { label: '1 kg', multiplier: 1, isDefault: true },
      { label: '2.5 kg (Juicing Pack)', multiplier: 2.3 }
    ],
    description: 'Naturally sweet deep red Pakistani carrots, washed of mud. Best for fresh morning juice and Gajar ka Halwa.',
    mandiGrade: 'Grade A+ Red Farm',
    nutrition: 'Vitamin A, Beta-Carotene, Eye Health',
    inStock: true
  },
  {
    id: 'green-peas-matar',
    name: 'Fresh Sweet Green Peas (Matar Pods)',
    urduName: 'تازہ میٹھے مٹر',
    category: 'vegetables',
    badge: 'Pod Fresh',
    image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=600&q=80',
    basePrice: 240,
    originalPrice: 290,
    baseUnit: '1 kg',
    rating: 4.9,
    reviewsCount: 160,
    weightOptions: [
      { label: '1 kg (in pods)', multiplier: 1, isDefault: true },
      { label: '2 kg (in pods)', multiplier: 1.9 }
    ],
    description: 'Fat pods packed with sweet, tender green peas from high-altitude Sahiwal and KP harvests.',
    mandiGrade: 'Grade A Pods',
    nutrition: 'Plant Protein, Iron, Vitamin C',
    inStock: true
  },
  {
    id: 'white-radish-mooli',
    name: 'Fresh White Radish (Desi Mooli)',
    urduName: 'دیسی مولی (پتوں سمیت)',
    category: 'vegetables',
    badge: null,
    image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=600&q=80',
    basePrice: 70,
    originalPrice: 90,
    baseUnit: '1 kg',
    rating: 4.7,
    reviewsCount: 45,
    weightOptions: [
      { label: '1 kg', multiplier: 1, isDefault: true },
      { label: '2 kg', multiplier: 1.85 }
    ],
    description: 'Crisp white radish with vibrant tender greens. Perfect for crunchy winter salads and mooli parathas.',
    mandiGrade: 'Grade A Crisp',
    nutrition: 'Digestive Enzymes, Vitamin C',
    inStock: true
  },

  // LEAFY GREENS & HERBS
  {
    id: 'fresh-spinach-palak',
    name: 'Farm Fresh Spinach (Desi Palak)',
    urduName: 'دیسی پالک (صاف شدہ)',
    category: 'greens',
    badge: 'Iron Rich',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80',
    basePrice: 80,
    originalPrice: 100,
    baseUnit: '1 kg',
    rating: 4.8,
    reviewsCount: 120,
    weightOptions: [
      { label: '500 g', multiplier: 0.55 },
      { label: '1 kg', multiplier: 1, isDefault: true }
    ],
    description: 'Broad leaf succulent green spinach, trimmed roots, and pre-sorted to eliminate yellow leaves. 100% soil washed.',
    mandiGrade: 'Grade A Tender Broadleaf',
    nutrition: 'Rich in Iron, Magnesium & Folate',
    inStock: true
  },
  {
    id: 'fresh-coriander-dhaniya',
    name: 'Green Coriander (Hara Dhaniya)',
    urduName: 'تازہ ہرا دھنیا',
    category: 'greens',
    badge: 'Fragrant',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
    basePrice: 40,
    originalPrice: 50,
    baseUnit: '1 Bundle (Gaddi)',
    rating: 4.9,
    reviewsCount: 230,
    weightOptions: [
      { label: '1 Bundle', multiplier: 1, isDefault: true },
      { label: '3 Bundles', multiplier: 2.7 }
    ],
    description: 'Crisp, intensely fragrant coriander with delicate leaves and clean stems. Essential garnish for every Pakistani meal.',
    mandiGrade: 'Grade A Aromatic',
    nutrition: 'Antioxidants, Vitamin A & K',
    inStock: true
  },
  {
    id: 'fresh-mint-podina',
    name: 'Wild Garden Mint (Pudina)',
    urduName: 'خوشبودار پودینہ',
    category: 'greens',
    badge: 'Super Fresh',
    image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=600&q=80',
    basePrice: 40,
    originalPrice: 50,
    baseUnit: '1 Bundle (Gaddi)',
    rating: 4.9,
    reviewsCount: 198,
    weightOptions: [
      { label: '1 Bundle', multiplier: 1, isDefault: true },
      { label: '3 Bundles', multiplier: 2.7 }
    ],
    description: 'Handpicked aromatic mint leaves. Perfect for zesty raita, mint lemonade, or refreshing desi chutneys.',
    mandiGrade: 'Grade A Mint',
    nutrition: 'Menthol, Digestive Soother',
    inStock: true
  },
  {
    id: 'fenugreek-leaves-methi',
    name: 'Fresh Fenugreek (Kasturi Methi)',
    urduName: 'تازہ قصوری میتھی',
    category: 'greens',
    badge: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    basePrice: 90,
    originalPrice: 115,
    baseUnit: '1 kg',
    rating: 4.7,
    reviewsCount: 78,
    weightOptions: [
      { label: '500 g', multiplier: 0.55 },
      { label: '1 kg', multiplier: 1, isDefault: true }
    ],
    description: 'Fragrant Kasur-origin methi leaves with distinct aromatic bitterness. Great for Aloo Methi and parathas.',
    mandiGrade: 'Grade A Kasuri Crop',
    nutrition: 'Galactomannan, Fiber, Iron',
    inStock: true
  },
  {
    id: 'mustard-greens-sarson-saag',
    name: 'Pure Desi Sarson Ka Saag',
    urduName: 'دیسی سرسوں کا ساگ',
    category: 'greens',
    badge: 'Winter Special',
    image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
    basePrice: 95,
    originalPrice: 120,
    baseUnit: '1 kg',
    rating: 4.9,
    reviewsCount: 154,
    weightOptions: [
      { label: '1 kg', multiplier: 1, isDefault: true },
      { label: '2.5 kg (Pot Sized)', multiplier: 2.3 }
    ],
    description: 'Tender Gandlan (shoots) of desi yellow mustard plants from Punjab villages. Pre-trimmed for quick cooking.',
    mandiGrade: 'Grade A Tender Gandlan',
    nutrition: 'Vitamin C, Calcium, Minerals',
    inStock: true
  },
  {
    id: 'iceberg-salad-lettuce',
    name: 'Crispy Iceberg Lettuce',
    urduName: 'سلاد پتہ (کرسپی)',
    category: 'greens',
    badge: 'Gourmet',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80',
    basePrice: 130,
    originalPrice: 160,
    baseUnit: '1 Head',
    rating: 4.8,
    reviewsCount: 62,
    weightOptions: [
      { label: '1 Head (approx 400g)', multiplier: 1, isDefault: true },
      { label: '2 Heads', multiplier: 1.9 }
    ],
    description: 'Tight, ultra-crunchy heads of iceberg lettuce grown under climate control. Sweet and refreshing for gourmet sandwiches and burgers.',
    mandiGrade: 'Grade A Hydroponic / Greenhouse',
    nutrition: 'Folate, Low Calorie, Hydration',
    inStock: true
  },

  // SEASONAL FRUITS
  {
    id: 'chaunsa-mango-special',
    name: 'Multani Special Chaunsa Mango',
    urduName: 'ملتانی چونسہ آم (شیریں)',
    category: 'fruits',
    badge: 'King of Fruits',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    basePrice: 380,
    originalPrice: 450,
    baseUnit: '1 kg',
    rating: 5.0,
    reviewsCount: 310,
    weightOptions: [
      { label: '1 kg', multiplier: 1, isDefault: true },
      { label: '2.5 kg', multiplier: 2.4 },
      { label: '5 kg (Gift Box)', multiplier: 4.6 }
    ],
    description: 'The world-famous Multani Chaunsa. Tree-ripened, intensely sweet aroma, zero fibers, and dripping with natural nectar.',
    mandiGrade: 'Grade A+ Multan Orchards',
    nutrition: 'Vitamin C, Beta-Carotene, Natural Sugars',
    inStock: true
  },
  {
    id: 'kala-kullu-apples',
    name: 'Crispy Swat Kala Kullu Apples',
    urduName: 'سوات کالا کلو سیب',
    category: 'fruits',
    badge: 'Sweet & Crunchy',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
    basePrice: 280,
    originalPrice: 340,
    baseUnit: '1 kg',
    rating: 4.9,
    reviewsCount: 165,
    weightOptions: [
      { label: '1 kg', multiplier: 1, isDefault: true },
      { label: '2 kg', multiplier: 1.95 }
    ],
    description: 'Deep red, crisp and juicy apples directly from high mountain Swat valleys. Wax-free, naturally polished.',
    mandiGrade: 'Grade A Mountain Harvest',
    nutrition: 'Pectin Fiber, Quercetin, Vitamin C',
    inStock: true
  },
  {
    id: 'farm-bananas-dozen',
    name: 'Sindh Sweet Bananas (Dozen)',
    urduName: 'سندھ کے میٹھے کیلے (درجن)',
    category: 'fruits',
    badge: 'Daily Favorite',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80',
    basePrice: 160,
    originalPrice: 190,
    baseUnit: '1 Dozen',
    rating: 4.8,
    reviewsCount: 220,
    weightOptions: [
      { label: '1 Dozen (12 pcs)', multiplier: 1, isDefault: true },
      { label: '2 Dozen (24 pcs)', multiplier: 1.9 }
    ],
    description: 'Golden yellow Cavendish bananas sourced from Thatta and Hyderabad orchards. Free of chemical ripening, naturally sweet.',
    mandiGrade: 'Grade A Natural Yellow',
    nutrition: 'Potassium, Vitamin B6, Instant Energy',
    inStock: true
  },
  {
    id: 'kandhari-pomegranate-anar',
    name: 'Juicy Kandhari Pomegranate (Anar)',
    urduName: 'قندھاری انار (سرخ موتی)',
    category: 'fruits',
    badge: 'Premium Ruby',
    image: 'https://images.unsplash.com/photo-1541344999736-83eca872f242?auto=format&fit=crop&w=600&q=80',
    basePrice: 420,
    originalPrice: 490,
    baseUnit: '1 kg',
    rating: 4.9,
    reviewsCount: 140,
    weightOptions: [
      { label: '1 kg', multiplier: 1, isDefault: true },
      { label: '2 kg', multiplier: 1.9 }
    ],
    description: 'Deep crimson ruby seeds burst with sweet-tart juice. Soft seeds, easy to eat or press into antioxidant juice.',
    mandiGrade: 'Grade A+ Kandhar Ruby',
    nutrition: 'Punicalagins, Heart Health, Iron Booster',
    inStock: true
  },
  {
    id: 'sargodha-kinnow-mandarin',
    name: 'Sargodha Juicy Kinnow / Mandarin',
    urduName: 'سرگودھا کا رسیلا کنو',
    category: 'fruits',
    badge: 'Juicy King',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=600&q=80',
    basePrice: 180,
    originalPrice: 220,
    baseUnit: '1 Dozen',
    rating: 4.8,
    reviewsCount: 195,
    weightOptions: [
      { label: '1 Dozen', multiplier: 1, isDefault: true },
      { label: '2 Dozen', multiplier: 1.9 }
    ],
    description: 'World-renowned Sargodha Kinnow. Thin glossy skin, explosive sweet citrus juice, and refreshing tang.',
    mandiGrade: 'Grade A Export Quality',
    nutrition: '100% Daily Vitamin C, Bioflavonoids',
    inStock: true
  },
  {
    id: 'fresh-guava-amrood',
    name: 'Sharqpur White Guava (Amrood)',
    urduName: 'شرقپور کا سفید امرود',
    category: 'fruits',
    badge: 'Fragrant',
    image: 'https://images.unsplash.com/photo-1536511135899-73600f952f4c?auto=format&fit=crop&w=600&q=80',
    basePrice: 150,
    originalPrice: 180,
    baseUnit: '1 kg',
    rating: 4.7,
    reviewsCount: 89,
    weightOptions: [
      { label: '1 kg', multiplier: 1, isDefault: true },
      { label: '2 kg', multiplier: 1.9 }
    ],
    description: 'Famous Sharqpur guavas known for smooth creamy flesh, minimum seeds, and intoxicating sweet scent.',
    mandiGrade: 'Grade A Sharqpuri',
    nutrition: '4x Vitamin C of Oranges, High Fiber',
    inStock: true
  },
  {
    id: 'desi-papaya-papeeta',
    name: 'Sweet Golden Papaya (Papeeta)',
    urduName: 'پکا ہوا سنہری پپیتا',
    category: 'fruits',
    badge: 'Digestive',
    image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=600&q=80',
    basePrice: 210,
    originalPrice: 260,
    baseUnit: '1 kg',
    rating: 4.6,
    reviewsCount: 64,
    weightOptions: [
      { label: '1 kg (approx 1 fruit)', multiplier: 1, isDefault: true },
      { label: '2 kg', multiplier: 1.9 }
    ],
    description: 'Sweet orange flesh with mild sweetness and delicate texture. Renowned for gut health and detox.',
    mandiGrade: 'Grade A Tree-Ripened',
    nutrition: 'Papain Enzymes, Beta-Carotene',
    inStock: true
  },
  {
    id: 'sweet-grapes-sundarkhani',
    name: 'Balochistan Sundarkhani Grapes',
    urduName: 'بلوچستان کے سندرخانی انگور',
    category: 'fruits',
    badge: 'Seedless Nectar',
    image: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=600&q=80',
    basePrice: 340,
    originalPrice: 400,
    baseUnit: '1 kg',
    rating: 4.9,
    reviewsCount: 110,
    weightOptions: [
      { label: '500 g', multiplier: 0.55 },
      { label: '1 kg', multiplier: 1, isDefault: true }
    ],
    description: 'Long slender Sundarkhani grapes from Quetta and Pishin. Crisp, thin-skinned, and intensely sweet.',
    mandiGrade: 'Grade A+ Sundarkhani',
    nutrition: 'Resveratrol, Antioxidants, Vitamin K',
    inStock: true
  },

  // AROMATICS & MASALAY
  {
    id: 'desi-ginger-adrak',
    name: 'Chinese / Desi Clean Ginger (Adrak)',
    urduName: 'دیسی ادرک (صاف دھلی ہوئی)',
    category: 'aromatics',
    badge: 'Essential',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=600&q=80',
    basePrice: 460,
    originalPrice: 530,
    baseUnit: '1 kg',
    rating: 4.9,
    reviewsCount: 145,
    weightOptions: [
      { label: '250 g', multiplier: 0.3 },
      { label: '500 g', multiplier: 0.55 },
      { label: '1 kg', multiplier: 1, isDefault: true }
    ],
    description: 'Plump, fiber-light ginger roots. Washed free of clay, ensuring you only pay for usable weight, not mud.',
    mandiGrade: 'Grade A Washed Plump',
    nutrition: 'Gingerol, Anti-inflammatory, Immunity',
    inStock: true
  },
  {
    id: 'desi-garlic-lehsan',
    name: 'Desi White Garlic Bulbs (Lehsan)',
    urduName: 'دیسی سفید لہسن',
    category: 'aromatics',
    badge: 'Pungent & Pure',
    image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=600&q=80',
    basePrice: 480,
    originalPrice: 550,
    baseUnit: '1 kg',
    rating: 4.8,
    reviewsCount: 172,
    weightOptions: [
      { label: '250 g', multiplier: 0.3 },
      { label: '500 g', multiplier: 0.55 },
      { label: '1 kg', multiplier: 1, isDefault: true }
    ],
    description: 'Solid dry cloves of desi garlic. High natural oil content, strong aroma, and zero hollow cloves.',
    mandiGrade: 'Grade A Desi Dry',
    nutrition: 'Allicin, Blood Pressure & Cholesterol Support',
    inStock: true
  },
  {
    id: 'spicy-green-chillies-mirch',
    name: 'Spicy Green Chillies (Hari Mirch)',
    urduName: 'تیز ہری مرچ',
    category: 'aromatics',
    badge: 'Hot & Fresh',
    image: 'https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?auto=format&fit=crop&w=600&q=80',
    basePrice: 140,
    originalPrice: 170,
    baseUnit: '1 kg',
    rating: 4.9,
    reviewsCount: 204,
    weightOptions: [
      { label: '250 g', multiplier: 0.3 },
      { label: '500 g', multiplier: 0.55 },
      { label: '1 kg', multiplier: 1, isDefault: true }
    ],
    description: 'Crunchy, shiny green chillies picked early morning. Packed with spicy flavor and vibrant zest.',
    mandiGrade: 'Grade A Farm Fresh',
    nutrition: 'Capsaicin, Vitamin C & Metabolic Boost',
    inStock: true
  },
  {
    id: 'fresh-yellow-lemons-neembu',
    name: 'Juicy Yellow Lemons (Desi Neembu)',
    urduName: 'رسیلے دیسی لیموں',
    category: 'aromatics',
    badge: 'Juice Loaded',
    image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=600&q=80',
    basePrice: 200,
    originalPrice: 240,
    baseUnit: '1 kg',
    rating: 4.9,
    reviewsCount: 180,
    weightOptions: [
      { label: '250 g', multiplier: 0.3 },
      { label: '500 g', multiplier: 0.55 },
      { label: '1 kg', multiplier: 1, isDefault: true }
    ],
    description: 'Thin-skinned, seedless or low-seed juicy desi lemons. One squeeze gives generous citrus juice.',
    mandiGrade: 'Grade A Thin Skin',
    nutrition: 'Citric Acid, Vitamin C, Alkaline Balance',
    inStock: true
  },

  // BACHAT BUNDLES & BOXES
  {
    id: 'bundle-weekly-family-box',
    name: 'Engineer Weekly Family Sabzi Box',
    urduName: 'ہفتہ وار فیملی سبزی باکس (بچت ڈیل)',
    category: 'bundles',
    badge: 'Save 22%',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
    basePrice: 1490,
    originalPrice: 1890,
    baseUnit: '1 Full Box (Approx 12 kg)',
    rating: 5.0,
    reviewsCount: 280,
    weightOptions: [
      { label: '1 Family Box (12 kg items)', multiplier: 1, isDefault: true }
    ],
    description: 'Complete weekly vegetable solution curated by the Engineer. Includes: 3kg Aloo, 2kg Pyaz, 1.5kg Tamatar, 1kg Bhindi/Gobi, 500g Shimla Mirch, 500g Kheera, 250g Adrak, 250g Lehsan, 250g Hari Mirch + FREE Dhaniya & Podina!',
    mandiGrade: 'All Grade A Handpicked Produce',
    nutrition: 'Balanced nutritional spectrum for 4-6 members',
    inStock: true
  },
  {
    id: 'bundle-kitchen-starter-essentials',
    name: 'Daily Kitchen Essentials Tri-Pack',
    urduName: 'کچن ضروریات بنڈل (آلو، پیاز، ٹماٹر)',
    category: 'bundles',
    badge: 'Hot Seller',
    image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80',
    basePrice: 880,
    originalPrice: 1050,
    baseUnit: '1 Combo Pack',
    rating: 4.9,
    reviewsCount: 340,
    weightOptions: [
      { label: '1 Combo (3kg Aloo + 2kg Pyaz + 1.5kg Tamatar)', multiplier: 1, isDefault: true }
    ],
    description: 'The foundation of every Pakistani kitchen. Sourced fresh at dawn from the wholesale market and delivered dirt-free.',
    mandiGrade: 'Grade A Wholesale Direct',
    nutrition: 'Essential culinary staples',
    inStock: true
  },
  {
    id: 'bundle-immunity-fruit-basket',
    name: 'Immunity & Energy Fresh Fruit Box',
    urduName: 'امیوئنٹی تازہ پھل باسکٹ',
    category: 'bundles',
    badge: 'Healthy Gift',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80',
    basePrice: 1650,
    originalPrice: 2100,
    baseUnit: '1 Gift Basket',
    rating: 4.9,
    reviewsCount: 92,
    weightOptions: [
      { label: 'Standard Basket (5 varieties)', multiplier: 1, isDefault: true }
    ],
    description: 'Premium curated basket featuring: 1kg Swat Apples, 1 Dozen Sindh Bananas, 1kg Pomegranate / Chaunsa Mango, 1 Dozen Kinnows/Guavas, beautifully packed in an eco-friendly box.',
    mandiGrade: 'Premium Grade A+',
    nutrition: 'Complete daily vitamins & antioxidants',
    inStock: true
  },
  {
    id: 'bundle-green-salad-cleansing-kit',
    name: 'Daily Detox Salad & Chutney Kit',
    urduName: 'ڈیٹوکس سلاد و چٹنی کٹ',
    category: 'bundles',
    badge: 'Diet Choice',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    basePrice: 420,
    originalPrice: 520,
    baseUnit: '1 Kit',
    rating: 4.8,
    reviewsCount: 84,
    weightOptions: [
      { label: '1 Kit', multiplier: 1, isDefault: true }
    ],
    description: 'Includes: 1kg Crisp Kheera, 500g Sweet Gajar, 1 Iceberg Lettuce, 2 Bundles Pudina, 2 Bundles Dhaniya, 250g Lemon & Green Chillies.',
    mandiGrade: 'Crisp & Clean Greens',
    nutrition: 'High hydration, prebiotic fibers',
    inStock: true
  },

  // DRY FRUITS & HONEY
  {
    id: 'american-almonds-giri-badam',
    name: 'Premium California Almonds (Badam Giri)',
    urduName: 'کیلیفورنیا بادام گری',
    category: 'dryfruits',
    badge: 'Brain Food',
    image: 'https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?auto=format&fit=crop&w=600&q=80',
    basePrice: 850,
    originalPrice: 990,
    baseUnit: '250 g',
    rating: 4.9,
    reviewsCount: 110,
    weightOptions: [
      { label: '250 g', multiplier: 1, isDefault: true },
      { label: '500 g', multiplier: 1.95 },
      { label: '1 kg', multiplier: 3.8 }
    ],
    description: 'Crunchy, sweet, non-bitter almond kernels. Hand-sorted to remove broken pieces. High oil content.',
    mandiGrade: 'Jumbo Size Kernel',
    nutrition: 'Vitamin E, Healthy Monounsaturated Fats, Protein',
    inStock: true
  },
  {
    id: 'kashmiri-walnuts-akhrot',
    name: 'Kashmiri Organic Walnuts (Akhrot Giri)',
    urduName: 'کشمیری اخروٹ گری',
    category: 'dryfruits',
    badge: 'Omega-3 Rich',
    image: 'https://images.unsplash.com/photo-1568284478142-3715d39eaae0?auto=format&fit=crop&w=600&q=80',
    basePrice: 790,
    originalPrice: 920,
    baseUnit: '250 g',
    rating: 4.8,
    reviewsCount: 95,
    weightOptions: [
      { label: '250 g', multiplier: 1, isDefault: true },
      { label: '500 g', multiplier: 1.95 },
      { label: '1 kg', multiplier: 3.8 }
    ],
    description: 'Light golden Kashmiri walnut halves. Fresh buttery taste with zero rancidity. Excellent for memory and cardiovascular health.',
    mandiGrade: 'Extra Light Halves',
    nutrition: 'High ALA Omega-3, Neuroprotective polyphenols',
    inStock: true
  },
  {
    id: 'roasted-salted-pistachios-pista',
    name: 'Iranian Roasted Salted Pistachios (Pista)',
    urduName: 'ایرانی بھنا ہوا نمکین پستہ',
    category: 'dryfruits',
    badge: 'Crunchy Gourmet',
    image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80',
    basePrice: 980,
    originalPrice: 1150,
    baseUnit: '250 g',
    rating: 4.9,
    reviewsCount: 130,
    weightOptions: [
      { label: '250 g', multiplier: 1, isDefault: true },
      { label: '500 g', multiplier: 1.95 }
    ],
    description: 'Jumbo open-mouth Iranian pistachios lightly roasted with Himalayan pink salt. Crisp crunch in every bite.',
    mandiGrade: 'Grade A+ Akbari Pistachio',
    nutrition: 'Lutein, Zeaxanthin, Plant Sterols',
    inStock: true
  },
  {
    id: 'pure-sidr-berry-honey',
    name: '100% Pure Raw Sidr Honey (Beri Ka Shehad)',
    urduName: 'خالص بیری کا شہد',
    category: 'dryfruits',
    badge: '100% Pure Guarantee',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    basePrice: 1450,
    originalPrice: 1750,
    baseUnit: '500 g Jar',
    rating: 5.0,
    reviewsCount: 185,
    weightOptions: [
      { label: '500 g Jar', multiplier: 1, isDefault: true },
      { label: '1 kg Jar', multiplier: 1.9 }
    ],
    description: 'Extracted from wild Karak and Potohar Sidr (Beri) blossom trees. Unpasteurized, unfiltered, lab-tested pure honey with medicinal grade enzyme profile.',
    mandiGrade: 'Certified 100% Pure Sidr Blossom',
    nutrition: 'Antibacterial, Natural Enzymes, Cough Relief',
    inStock: true
  }
];

