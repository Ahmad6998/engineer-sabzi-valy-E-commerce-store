export const DELIVERY_AREAS = [
  // Lahore Exclusive Delivery Areas (Central Hub: Multan Chungi Mandi)
  { id: 'lhr-multan-road', city: 'Lahore', name: 'Multan Chungi & Multan Road (Main Hub)', estTime: '25-45 mins' },
  { id: 'lhr-dha', city: 'Lahore', name: 'DHA (Phases 1 - 9)', estTime: '45-90 mins' },
  { id: 'lhr-gulberg', city: 'Lahore', name: 'Gulberg (I, II, III, V)', estTime: '30-60 mins' },
  { id: 'lhr-jt', city: 'Lahore', name: 'Johar Town & Faisal Town', estTime: '45-75 mins' },
  { id: 'lhr-model-town', city: 'Lahore', name: 'Model Town & Garden Town', estTime: '40-70 mins' },
  { id: 'lhr-cantt', city: 'Lahore', name: 'Cantt & Cavalry Ground', estTime: '40-75 mins' },
  { id: 'lhr-bahria', city: 'Lahore', name: 'Bahria Town & Lake City', estTime: '60-90 mins' },
  { id: 'lhr-wapda', city: 'Lahore', name: 'Wapda Town & Valencia', estTime: '50-80 mins' },
  { id: 'lhr-allama-iqbal', city: 'Lahore', name: 'Allama Iqbal Town & Sabzazar', estTime: '50-80 mins' },
  { id: 'lhr-samanabad', city: 'Lahore', name: 'Samanabad & Chauburji', estTime: '35-65 mins' },
  { id: 'lhr-shadman', city: 'Lahore', name: 'Shadman & Jail Road', estTime: '35-60 mins' },
  { id: 'lhr-township', city: 'Lahore', name: 'Township & Green Town', estTime: '45-75 mins' },
  { id: 'lhr-askari', city: 'Lahore', name: 'Askari (Phases 1 - 11)', estTime: '40-75 mins' },
  { id: 'lhr-shalamar', city: 'Lahore', name: 'Shalamar & Mughalpura', estTime: '60-90 mins' }
];

export const TIME_SLOTS = [
  { id: 'slot-morning', label: 'Morning Slot (08:00 AM – 11:30 AM)', badge: 'Mandi Fresh Morning' },
  { id: 'slot-afternoon', label: 'Afternoon Slot (01:00 PM – 04:30 PM)', badge: 'Lunch Prep' },
  { id: 'slot-evening', label: 'Evening Slot (05:30 PM – 09:00 PM)', badge: 'Dinner Ready' },
  { id: 'slot-express', label: '⚡ Express Priority Delivery (Within 60-90 Mins)', badge: 'Express +Rs. 99' }
];

export const STORE_SETTINGS = {
  storeName: 'Engineer Sabzi Valy',
  tagline: 'Mandi se Seedha Aapke Ghar Tak — Pure, Clean & Digital-Weighed',
  whatsappNumber: '+92 303 9691236', // Formatted for display
  whatsappCleanNumber: '923039691236', // Clean digits for wa.me API link
  phoneDisplay: '0303 9691236 / 03001199698',
  supportEmail: 'orders@engineersabzivaly.pk',
  freeDeliveryThreshold: 1499,
  standardDeliveryFee: 150,
  expressDeliveryFee: 249,
  address: 'Multan Chungi Mandi, Multan Road, Lahore',
  openingHours: 'Mon - Sun: 06:30 AM - 10:00 PM'
};

