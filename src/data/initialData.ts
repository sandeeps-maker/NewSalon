import {
  Salon,
  Customer,
  Employee,
  Service,
  QueueEntry,
  Appointment,
  Product,
  Offer,
  WhatsAppTemplate,
  WeddingBooking,
  Task,
  RatingReview,
  SalonInsight,
  DailyClosingSummary
} from '../types';

export const initialSalon: Salon = {
  id: 'salon-101',
  name: 'Style Studio Salon',
  type: 'unisex',
  tagline: 'Your Salon. Your Customers. Your Team. One Simple Dashboard.',
  address: 'Shop #14, Main Market, Sector 18, Cyber City',
  phone: '+91 98765 43210',
  openingTime: '09:00 AM',
  closingTime: '09:00 PM',
  currency: '₹',
  ownerName: 'Rahul Sharma'
};

export const initialServices: Service[] = [
  // Men's Services
  { id: 'srv-1', name: 'Classic Haircut & Styling', category: 'Hair Care', durationMins: 25, price: 250, targetGender: 'mens', popular: true, description: 'Precision scissors & clippers haircut with scalp massage styling.' },
  { id: 'srv-2', name: 'Beard Trim & Shape', category: 'Beard Care', durationMins: 15, price: 150, targetGender: 'mens', popular: true, description: 'Sharp outline edging, trimming, and hot towel finish.' },
  { id: 'srv-3', name: 'Royal Shave & Hot Towel', category: 'Beard Care', durationMins: 20, price: 200, targetGender: 'mens', popular: false, description: 'Traditional straight razor shave with essential oils and hot towel.' },
  { id: 'srv-4', name: 'Hair Color & Touchup', category: 'Coloring', durationMins: 40, price: 600, targetGender: 'mens', popular: true, description: 'Ammonia-free charcoal black / dark brown grey coverage.' },
  { id: 'srv-5', name: 'Nourishing Hair Spa', category: 'Treatments', durationMins: 45, price: 850, targetGender: 'unisex', popular: true, description: 'Deep conditioning cream bath with head massage and steam.' },
  { id: 'srv-6', name: 'Gold Glow Facial', category: 'Skin Care', durationMins: 50, price: 1200, targetGender: 'unisex', popular: true, description: 'Deep cleansing, exfoliation, gold foil mask & facial massage.' },
  { id: 'srv-7', name: 'Head Massage (Oil)', category: 'Relaxation', durationMins: 20, price: 250, targetGender: 'unisex', popular: false, description: 'Relaxing hot oil scalp massage for stress relief.' },
  
  // Women's Services
  { id: 'srv-8', name: 'Advanced Layer Haircut', category: 'Hair Care', durationMins: 45, price: 650, targetGender: 'womens', popular: true, description: 'Custom layered styling tailored to face symmetry with blow dry.' },
  { id: 'srv-9', name: 'Global Hair Coloring / Balayage', category: 'Coloring', durationMins: 90, price: 2500, targetGender: 'womens', popular: true, description: 'Premium L’Oréal color application with gloss finish.' },
  { id: 'srv-10', name: 'Skin Brightening Cleanup', category: 'Skin Care', durationMins: 30, price: 500, targetGender: 'womens', popular: true, description: 'Instant glow face cleanup with fruit serum.' },
  { id: 'srv-11', name: 'Spa Pedicure & Manicure', category: 'Nail Care', durationMins: 60, price: 1100, targetGender: 'womens', popular: true, description: 'Exfoliating foot/hand scrub, massage, and nail polish.' },
  { id: 'srv-12', name: 'Full Face Threading & Waxing', category: 'Beauty', durationMins: 25, price: 350, targetGender: 'womens', popular: true, description: 'Gentle facial hair removal with aloe vera cooling gel.' },
  { id: 'srv-13', name: 'Bridal / HD Party Makeup', category: 'Makeup', durationMins: 90, price: 4500, targetGender: 'womens', popular: true, description: 'High definition waterproof makeup with hair styling.' }
];

export const initialEmployees: Employee[] = [
  {
    id: 'emp-1',
    name: 'Raj Kumar',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    position: 'Senior Master Stylist',
    specialization: 'Fades, Beard Architecture & Hair Spa',
    experienceYears: 7,
    joiningDate: '2021-03-15',
    workingHours: '09:30 AM - 08:30 PM',
    servicesProvided: ['Classic Haircut & Styling', 'Beard Trim & Shape', 'Nourishing Hair Spa', 'Hair Color & Touchup'],
    commissionPercentage: 15,
    status: 'active',
    phone: '+91 98111 22334',
    customersServedToday: 11,
    avgServiceTimeMins: 24,
    rating: 4.8,
    ratingsCount: 142,
    revenueGeneratedToday: 4850,
    repeatCustomersToday: 7,
    complaintsCount: 0,
    attendanceDays: 26,
    performanceScore: 94
  },
  {
    id: 'emp-2',
    name: 'Aman Verma',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    position: 'Speed Stylist',
    specialization: 'Fast Haircuts & Head Massage',
    experienceYears: 4,
    joiningDate: '2022-06-10',
    workingHours: '10:00 AM - 09:00 PM',
    servicesProvided: ['Classic Haircut & Styling', 'Beard Trim & Shape', 'Head Massage (Oil)'],
    commissionPercentage: 12,
    status: 'active',
    phone: '+91 98222 33445',
    customersServedToday: 8,
    avgServiceTimeMins: 21, // Fastest!
    rating: 4.5,
    ratingsCount: 98,
    revenueGeneratedToday: 3200,
    repeatCustomersToday: 4,
    complaintsCount: 1,
    attendanceDays: 25,
    performanceScore: 86
  },
  {
    id: 'emp-3',
    name: 'Neha Sharma',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    position: 'Senior Beauty & Makeup Expert',
    specialization: 'Bridal Makeup, Facials & Hair Styling',
    experienceYears: 6,
    joiningDate: '2021-09-01',
    workingHours: '10:00 AM - 08:00 PM',
    servicesProvided: ['Advanced Layer Haircut', 'Gold Glow Facial', 'Global Hair Coloring / Balayage', 'Bridal / HD Party Makeup'],
    commissionPercentage: 18,
    status: 'active',
    phone: '+91 98333 44556',
    customersServedToday: 12,
    avgServiceTimeMins: 38,
    rating: 4.9, // Highest rated!
    ratingsCount: 165,
    revenueGeneratedToday: 6400,
    repeatCustomersToday: 9,
    complaintsCount: 0,
    attendanceDays: 27,
    performanceScore: 97
  },
  {
    id: 'emp-4',
    name: 'Vikas Singh',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    position: 'All-Rounder Barber',
    specialization: 'Royal Shaves & Scalp Treatments',
    experienceYears: 3,
    joiningDate: '2023-01-20',
    workingHours: '09:00 AM - 07:00 PM',
    servicesProvided: ['Classic Haircut & Styling', 'Beard Trim & Shape', 'Royal Shave & Hot Towel'],
    commissionPercentage: 10,
    status: 'active',
    phone: '+91 98444 55667',
    customersServedToday: 9,
    avgServiceTimeMins: 26,
    rating: 4.6,
    ratingsCount: 74,
    revenueGeneratedToday: 2950,
    repeatCustomersToday: 3,
    complaintsCount: 0,
    attendanceDays: 24,
    performanceScore: 82
  },
  {
    id: 'emp-5',
    name: 'Pooja Patel',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    position: 'Skin & Nail Specialist',
    specialization: 'Pedicure, Manicure & Skin Treatments',
    experienceYears: 5,
    joiningDate: '2022-11-05',
    workingHours: '11:00 AM - 08:30 PM',
    servicesProvided: ['Spa Pedicure & Manicure', 'Skin Brightening Cleanup', 'Full Face Threading & Waxing'],
    commissionPercentage: 14,
    status: 'on_break',
    phone: '+91 98555 66778',
    customersServedToday: 7,
    avgServiceTimeMins: 32,
    rating: 4.7,
    ratingsCount: 88,
    revenueGeneratedToday: 3100,
    repeatCustomersToday: 5,
    complaintsCount: 0,
    attendanceDays: 26,
    performanceScore: 88
  }
];

export const initialCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Rohit Sharma',
    phone: '+91 98765 11111',
    gender: 'male',
    ageGroup: 'adult',
    birthday: '1992-08-25',
    location: 'Cyber City, Sector 18',
    customerSince: '2023-01-10',
    category: 'VIP',
    totalVisits: 18,
    totalSpent: 8450,
    avgBill: 469,
    lastVisitDate: '2026-08-10',
    avgVisitFrequencyDays: 14,
    favoriteEmployeeId: 'emp-1',
    favoriteEmployeeName: 'Raj Kumar',
    favoriteService: 'Classic Haircut + Beard Trim',
    notes: 'Likes low fade, less water while washing, prefers tea.',
    lastRating: 5,
    visitHistory: [
      { id: 'vh-101', date: '2026-08-10', services: ['Classic Haircut & Styling', 'Beard Trim & Shape'], employeeName: 'Raj Kumar', amount: 400, rating: 5, feedback: 'Always great cut by Raj!' },
      { id: 'vh-102', date: '2026-07-26', services: ['Classic Haircut & Styling', 'Beard Trim & Shape', 'Head Massage (Oil)'], employeeName: 'Raj Kumar', amount: 650, rating: 5 },
      { id: 'vh-103', date: '2026-07-12', services: ['Beard Trim & Shape'], employeeName: 'Raj Kumar', amount: 150, rating: 5 }
    ]
  },
  {
    id: 'cust-2',
    name: 'Amit Verma',
    phone: '+91 98765 22222',
    gender: 'male',
    ageGroup: 'adult',
    birthday: '1988-11-14',
    location: 'DLF Phase 3',
    customerSince: '2024-02-15',
    category: 'Regular',
    totalVisits: 9,
    totalSpent: 3800,
    avgBill: 422,
    lastVisitDate: '2026-08-02',
    avgVisitFrequencyDays: 20,
    favoriteEmployeeId: 'emp-1',
    favoriteEmployeeName: 'Raj Kumar',
    favoriteService: 'Nourishing Hair Spa',
    notes: 'Sensitive scalp, prefers organic shampoo.',
    lastRating: 4,
    visitHistory: [
      { id: 'vh-201', date: '2026-08-02', services: ['Classic Haircut & Styling', 'Beard Trim & Shape'], employeeName: 'Raj Kumar', amount: 400, rating: 4 },
      { id: 'vh-202', date: '2026-07-10', services: ['Nourishing Hair Spa'], employeeName: 'Raj Kumar', amount: 850, rating: 5 }
    ]
  },
  {
    id: 'cust-3',
    name: 'Priya Sharma',
    phone: '+91 98765 33333',
    gender: 'female',
    ageGroup: 'adult',
    birthday: '1995-09-02',
    location: 'Sushant Lok',
    customerSince: '2023-08-11',
    category: 'VIP',
    totalVisits: 14,
    totalSpent: 18500,
    avgBill: 1321,
    lastVisitDate: '2026-08-15',
    avgVisitFrequencyDays: 22,
    favoriteEmployeeId: 'emp-3',
    favoriteEmployeeName: 'Neha Sharma',
    favoriteService: 'Gold Glow Facial',
    notes: 'Gets hair colored every 45 days. Prefers Neha only.',
    lastRating: 5,
    visitHistory: [
      { id: 'vh-301', date: '2026-08-15', services: ['Gold Glow Facial', 'Advanced Layer Haircut'], employeeName: 'Neha Sharma', amount: 1850, rating: 5, feedback: 'Loved the facial glow!' },
      { id: 'vh-302', date: '2026-07-01', services: ['Global Hair Coloring / Balayage'], employeeName: 'Neha Sharma', amount: 2500, rating: 5 }
    ]
  },
  {
    id: 'cust-4',
    name: 'Anjali Patel',
    phone: '+91 98765 44444',
    gender: 'female',
    ageGroup: 'adult',
    birthday: '1998-04-18',
    location: 'Golf Course Road',
    customerSince: '2025-05-10',
    category: 'Regular',
    totalVisits: 6,
    totalSpent: 5200,
    avgBill: 866,
    lastVisitDate: '2026-08-12',
    avgVisitFrequencyDays: 30,
    favoriteEmployeeId: 'emp-5',
    favoriteEmployeeName: 'Pooja Patel',
    favoriteService: 'Spa Pedicure & Manicure',
    lastRating: 5,
    visitHistory: [
      { id: 'vh-401', date: '2026-08-12', services: ['Spa Pedicure & Manicure'], employeeName: 'Pooja Patel', amount: 1100, rating: 5 }
    ]
  },
  {
    id: 'cust-5',
    name: 'Vivek Gupta',
    phone: '+91 98765 55555',
    gender: 'male',
    ageGroup: 'adult',
    birthday: '1985-03-30',
    location: 'Sector 56',
    customerSince: '2023-11-20',
    category: 'Lost', // No visit for > 60 days
    totalVisits: 4,
    totalSpent: 1600,
    avgBill: 400,
    lastVisitDate: '2026-05-18',
    avgVisitFrequencyDays: 30,
    favoriteEmployeeId: 'emp-2',
    favoriteEmployeeName: 'Aman Verma',
    favoriteService: 'Classic Haircut',
    visitHistory: [
      { id: 'vh-501', date: '2026-05-18', services: ['Classic Haircut & Styling'], employeeName: 'Aman Verma', amount: 250, rating: 4 }
    ]
  },
  {
    id: 'cust-6',
    name: 'Neha Jain',
    phone: '+91 98765 66666',
    gender: 'female',
    ageGroup: 'adult',
    birthday: '1993-12-05',
    location: 'Sohna Road',
    customerSince: '2026-08-18',
    category: 'New',
    totalVisits: 1,
    totalSpent: 650,
    avgBill: 650,
    lastVisitDate: '2026-08-18',
    avgVisitFrequencyDays: 0,
    favoriteEmployeeId: 'emp-3',
    favoriteEmployeeName: 'Neha Sharma',
    favoriteService: 'Advanced Layer Haircut',
    visitHistory: [
      { id: 'vh-601', date: '2026-08-18', services: ['Advanced Layer Haircut'], employeeName: 'Neha Sharma', amount: 650, rating: 5 }
    ]
  },
  {
    id: 'cust-7',
    name: 'Rahul Singh',
    phone: '+91 98765 77777',
    gender: 'male',
    ageGroup: 'adult',
    birthday: '1990-06-12',
    location: 'Sector 14',
    customerSince: '2026-07-05',
    category: 'Potential',
    totalVisits: 2,
    totalSpent: 900,
    avgBill: 450,
    lastVisitDate: '2026-07-20',
    avgVisitFrequencyDays: 15,
    favoriteEmployeeId: 'emp-4',
    favoriteEmployeeName: 'Vikas Singh',
    favoriteService: 'Haircut & Beard Trim',
    visitHistory: [
      { id: 'vh-701', date: '2026-07-20', services: ['Classic Haircut & Styling', 'Beard Trim & Shape'], employeeName: 'Vikas Singh', amount: 400, rating: 4 }
    ]
  }
];

export const initialQueueEntries: QueueEntry[] = [
  {
    id: 'q-24',
    tokenNumber: 24,
    customerId: 'cust-1',
    customerName: 'Amit Sharma',
    customerPhone: '+91 98765 00024',
    customerGender: 'male',
    ageGroup: 'adult',
    isReturning: true,
    serviceIds: ['srv-1', 'srv-2'],
    serviceNames: ['Classic Haircut & Styling', 'Beard Trim & Shape'],
    totalAmount: 400,
    preferredEmployeeId: 'emp-1',
    preferredEmployeeName: 'Raj Kumar',
    arrivalTime: '10:45 AM',
    waitingTimeMins: 12,
    status: 'waiting',
    visitType: 'walk_in',
    notes: 'Prefers Raj. Low fade cut.'
  },
  {
    id: 'q-25',
    tokenNumber: 25,
    customerId: 'cust-6',
    customerName: 'Neha Jain',
    customerPhone: '+91 98765 66666',
    customerGender: 'female',
    ageGroup: 'adult',
    isReturning: false,
    serviceIds: ['srv-8'],
    serviceNames: ['Advanced Layer Haircut'],
    totalAmount: 650,
    preferredEmployeeId: 'emp-3',
    preferredEmployeeName: 'Neha Sharma',
    arrivalTime: '10:50 AM',
    waitingTimeMins: 8,
    status: 'in_service',
    assignedEmployeeId: 'emp-3',
    assignedEmployeeName: 'Neha Sharma',
    startTime: '10:52 AM',
    visitType: 'appointment',
    notes: 'First time visit! Requested layer style.'
  },
  {
    id: 'q-26',
    tokenNumber: 26,
    customerId: 'cust-7',
    customerName: 'Rahul Singh',
    customerPhone: '+91 98765 77777',
    customerGender: 'male',
    ageGroup: 'adult',
    isReturning: true,
    serviceIds: ['srv-1', 'srv-3'],
    serviceNames: ['Classic Haircut & Styling', 'Royal Shave & Hot Towel'],
    totalAmount: 450,
    preferredEmployeeId: 'emp-4',
    preferredEmployeeName: 'Vikas Singh',
    arrivalTime: '10:55 AM',
    waitingTimeMins: 5,
    status: 'waiting',
    visitType: 'walk_in'
  },
  {
    id: 'q-27',
    tokenNumber: 27,
    customerId: 'cust-4',
    customerName: 'Anjali Patel',
    customerPhone: '+91 98765 44444',
    customerGender: 'female',
    ageGroup: 'adult',
    isReturning: true,
    serviceIds: ['srv-11', 'srv-10'],
    serviceNames: ['Spa Pedicure & Manicure', 'Skin Brightening Cleanup'],
    totalAmount: 1600,
    preferredEmployeeId: 'emp-5',
    preferredEmployeeName: 'Pooja Patel',
    arrivalTime: '11:00 AM',
    waitingTimeMins: 2,
    status: 'waiting',
    visitType: 'appointment'
  },
  {
    id: 'q-23',
    tokenNumber: 23,
    customerId: 'cust-2',
    customerName: 'Karan Malhotra',
    customerPhone: '+91 98765 99999',
    customerGender: 'male',
    ageGroup: 'adult',
    isReturning: false,
    serviceIds: ['srv-1', 'srv-2'],
    serviceNames: ['Classic Haircut & Styling', 'Beard Trim & Shape'],
    totalAmount: 400,
    assignedEmployeeId: 'emp-2',
    assignedEmployeeName: 'Aman Verma',
    arrivalTime: '10:30 AM',
    startTime: '10:32 AM',
    endTime: '10:55 AM',
    waitingTimeMins: 2,
    status: 'completed',
    visitType: 'walk_in'
  }
];

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-1',
    customerId: 'cust-3',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98765 33333',
    serviceIds: ['srv-6', 'srv-5'],
    serviceNames: ['Gold Glow Facial', 'Nourishing Hair Spa'],
    employeeId: 'emp-3',
    employeeName: 'Neha Sharma',
    date: '2026-08-18',
    time: '02:00 PM',
    durationMins: 95,
    status: 'confirmed',
    totalPrice: 2050,
    notes: 'VIP customer. Request silent room during facial.'
  },
  {
    id: 'apt-2',
    customerId: 'cust-1',
    customerName: 'Rohit Sharma',
    customerPhone: '+91 98765 11111',
    serviceIds: ['srv-1', 'srv-2', 'srv-5'],
    serviceNames: ['Classic Haircut & Styling', 'Beard Trim & Shape', 'Nourishing Hair Spa'],
    employeeId: 'emp-1',
    employeeName: 'Raj Kumar',
    date: '2026-08-18',
    time: '04:30 PM',
    durationMins: 75,
    status: 'confirmed',
    totalPrice: 1250,
    notes: 'Pre-birthday styling booking.'
  },
  {
    id: 'apt-3',
    customerId: 'cust-4',
    customerName: 'Anjali Patel',
    customerPhone: '+91 98765 44444',
    serviceIds: ['srv-11'],
    serviceNames: ['Spa Pedicure & Manicure'],
    employeeId: 'emp-5',
    employeeName: 'Pooja Patel',
    date: '2026-08-18',
    time: '11:00 AM',
    durationMins: 60,
    status: 'waiting',
    totalPrice: 1100
  },
  {
    id: 'apt-4',
    customerId: 'cust-5',
    customerName: 'Vivek Gupta',
    customerPhone: '+91 98765 55555',
    serviceIds: ['srv-1', 'srv-4'],
    serviceNames: ['Classic Haircut & Styling', 'Hair Color & Touchup'],
    employeeId: 'emp-2',
    employeeName: 'Aman Verma',
    date: '2026-08-19',
    time: '05:00 PM',
    durationMins: 65,
    status: 'confirmed',
    totalPrice: 850
  }
];

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'L’Oréal Professional Charcoal Black Hair Color',
    category: 'Hair Color',
    currentStock: 3, // LOW STOCK ALERT!
    minStock: 8,
    purchasePrice: 320,
    sellingPrice: 600,
    supplier: 'L’Oréal India Pvt Ltd',
    unit: 'tubes',
    lastRestocked: '2026-08-01',
    status: 'low_stock'
  },
  {
    id: 'prod-2',
    name: 'Matrix Smooth Intense Keratin Shampoo (1L)',
    category: 'Shampoo & Conditioner',
    currentStock: 2, // LOW STOCK ALERT!
    minStock: 5,
    purchasePrice: 850,
    sellingPrice: 1400,
    supplier: 'Beauty Edge Distributors',
    unit: 'bottles',
    lastRestocked: '2026-07-20',
    status: 'low_stock'
  },
  {
    id: 'prod-3',
    name: 'Schwarzkopf Matte Clay Hair Wax (100g)',
    category: 'Styling',
    currentStock: 14,
    minStock: 6,
    purchasePrice: 400,
    sellingPrice: 750,
    supplier: 'StyleCraft Supplies',
    unit: 'tubs',
    lastRestocked: '2026-08-10',
    status: 'in_stock'
  },
  {
    id: 'prod-4',
    name: 'O3+ Gold Radiance Facial Cream Kit',
    category: 'Skin Care',
    currentStock: 1, // OUT OF STOCK / CRITICAL LOW!
    minStock: 4,
    purchasePrice: 1100,
    sellingPrice: 2200,
    supplier: 'O3 Beauty India',
    unit: 'kits',
    lastRestocked: '2026-07-15',
    status: 'low_stock'
  },
  {
    id: 'prod-5',
    name: 'Disposable Barber Capes & Towels (100 Pack)',
    category: 'Salon Supplies',
    currentStock: 45,
    minStock: 15,
    purchasePrice: 600,
    sellingPrice: 0,
    supplier: 'HygieneCare Corp',
    unit: 'packs',
    lastRestocked: '2026-08-05',
    status: 'in_stock'
  },
  {
    id: 'prod-6',
    name: 'Beard Growth & Conditioning Oil (50ml)',
    category: 'Beard Care',
    currentStock: 18,
    minStock: 5,
    purchasePrice: 180,
    sellingPrice: 399,
    supplier: 'UrbanGroomer Co',
    unit: 'bottles',
    lastRestocked: '2026-08-12',
    status: 'in_stock'
  }
];

export const initialOffers: Offer[] = [
  {
    id: 'off-1',
    title: 'Weekend Hair Spa Special Offer',
    code: 'SPA20',
    description: '20% OFF on all Hair Spa treatments on Friday, Saturday & Sunday.',
    discountType: 'percentage',
    discountValue: 20,
    validUntil: '2026-08-31',
    targetAudience: 'all',
    isActive: true,
    claimedCount: 28
  },
  {
    id: 'off-2',
    title: 'Comeback Within 15 Days ₹100 OFF',
    code: 'REVISIT100',
    description: 'Get ₹100 Flat Discount on your next visit within 15 days.',
    discountType: 'flat',
    discountValue: 100,
    validUntil: '2026-09-15',
    targetAudience: 'inactive',
    isActive: true,
    claimedCount: 14
  },
  {
    id: 'off-3',
    title: 'Birthday Special – Free Beard Styling',
    code: 'BDAYBEARD',
    description: 'Complimentary beard styling / head massage during your birthday month!',
    discountType: 'free_service',
    discountValue: 150,
    validUntil: '2026-12-31',
    targetAudience: 'regular',
    isActive: true,
    claimedCount: 42
  },
  {
    id: 'off-4',
    title: 'Pre-Wedding Groom & Bride Deluxe Combo',
    code: 'WEDDING25',
    description: '25% OFF package discount on group wedding bookings of 3 or more persons.',
    discountType: 'percentage',
    discountValue: 25,
    validUntil: '2026-11-30',
    targetAudience: 'all',
    isActive: true,
    claimedCount: 8
  }
];

export const initialWhatsAppTemplates: WhatsAppTemplate[] = [
  {
    id: 'tpl-1',
    name: 'Post-Service Thank You & Rating Request',
    category: 'thank_you',
    templateText: 'Hi {{customer_name}}, thank you for visiting {{salon_name}} today! We hope you loved your experience with {{employee_name}}. Please rate us here: {{rating_link}} ⭐. Book your next visit and get 10% off!'
  },
  {
    id: 'tpl-2',
    name: 'Special Offer Announcement',
    category: 'offer',
    templateText: 'Hello {{customer_name}} 🎉 Special offer from {{salon_name}}! Enjoy {{offer_title}} (Use Code: {{offer_code}}). Valid till {{valid_until}}. Reply YES to reserve your slot now.'
  },
  {
    id: 'tpl-3',
    name: 'Appointment Confirmation & Reminder',
    category: 'appointment_reminder',
    templateText: 'Hi {{customer_name}}, your appointment at {{salon_name}} is confirmed for {{appointment_date}} at {{appointment_time}} with {{employee_name}}. See you soon! Call {{salon_phone}} to reschedule.'
  },
  {
    id: 'tpl-4',
    name: 'Birthday Greetings & Gift',
    category: 'birthday',
    templateText: 'Happy Birthday {{customer_name}} 🎂✨ {{salon_name}} wishes you a fantastic day! Enjoy a complimentary Hair Spa / Beard Styling on your next visit this week.'
  },
  {
    id: 'tpl-5',
    name: 'Revisit Reminder (Inactive Customers)',
    category: 'revisit_reminder',
    templateText: 'We miss you {{customer_name}}! It has been a while since your last visit to {{salon_name}}. Come back this week and enjoy ₹100 OFF on any service. Show code REVISIT100 at billing.'
  },
  {
    id: 'tpl-6',
    name: 'Wedding & Event Consultation',
    category: 'wedding',
    templateText: 'Hi {{customer_name}}, planning your big wedding day or special event? 💍 {{salon_name}} offers customized Groom & Bride packages. Schedule a free trial consultation today!'
  }
];

export const initialWeddingBookings: WeddingBooking[] = [
  {
    id: 'wed-1',
    customerName: 'Siddharth & Meera',
    customerPhone: '+91 99887 76655',
    eventType: 'couple',
    eventDate: '2026-11-15',
    trialDate: '2026-10-25',
    packageTitle: 'Royal Deluxe Bride & Groom Package',
    servicesRequired: ['Bridal / HD Party Makeup', 'Gold Glow Facial', 'Classic Haircut & Styling', 'Nourishing Hair Spa', 'Spa Pedicure & Manicure'],
    groupSize: 6,
    assignedEmployeeId: 'emp-3',
    assignedEmployeeName: 'Neha Sharma',
    totalBudget: 24500,
    advancePaid: 8000,
    status: 'confirmed',
    notes: 'Meera requested Neha for bridal makeup. Siddharth wants Raj for haircut & beard.'
  },
  {
    id: 'wed-2',
    customerName: 'Karan Mehra (Groom Party)',
    customerPhone: '+91 99112 23344',
    eventType: 'groom',
    eventDate: '2026-09-20',
    trialDate: '2026-09-10',
    packageTitle: 'Groom & Groomsmen Styling Package',
    servicesRequired: ['Classic Haircut & Styling', 'Beard Trim & Shape', 'Gold Glow Facial', 'Head Massage (Oil)'],
    groupSize: 5,
    assignedEmployeeId: 'emp-1',
    assignedEmployeeName: 'Raj Kumar',
    totalBudget: 12000,
    advancePaid: 4000,
    status: 'confirmed',
    notes: '5 groomsmen haircut & beard alignment on the wedding morning.'
  }
];

export const initialTasks: Task[] = [
  { id: 'task-1', title: 'Sanitize haircut tools & clean workstation #3', assignedEmployeeId: 'emp-2', assignedEmployeeName: 'Aman Verma', status: 'completed', priority: 'high', dueDate: 'Today' },
  { id: 'task-2', title: 'Check L’Oréal hair color inventory & place restock order', assignedEmployeeId: 'emp-1', assignedEmployeeName: 'Raj Kumar', status: 'pending', priority: 'high', dueDate: 'Today' },
  { id: 'task-3', title: 'Call 5 VIP customers with upcoming birthdays this week', assignedEmployeeId: 'emp-3', assignedEmployeeName: 'Neha Sharma', status: 'in_progress', priority: 'medium', dueDate: 'Today' },
  { id: 'task-4', title: 'Confirm tomorrow’s appointment schedule with clients', assignedEmployeeId: 'emp-5', assignedEmployeeName: 'Pooja Patel', status: 'pending', priority: 'medium', dueDate: 'Today' }
];

export const initialRatings: RatingReview[] = [
  { id: 'rev-1', customerName: 'Rohit Sharma', employeeId: 'emp-1', employeeName: 'Raj Kumar', serviceName: 'Classic Haircut & Styling', stars: 5, tags: ['Good service', 'Friendly', 'Professional'], comment: 'Raj is hands down the best barber in town!', createdAt: 'Today 10:30 AM' },
  { id: 'rev-2', customerName: 'Priya Sharma', employeeId: 'emp-3', employeeName: 'Neha Sharma', serviceName: 'Gold Glow Facial', stars: 5, tags: ['Professional', 'Clean salon', 'Fast service'], comment: 'Sublime experience! My skin is glowing.', createdAt: 'Yesterday 04:15 PM' },
  { id: 'rev-3', customerName: 'Karan Malhotra', employeeId: 'emp-2', employeeName: 'Aman Verma', serviceName: 'Beard Trim & Shape', stars: 4, tags: ['Fast service', 'Good value'], comment: 'Super quick trim, saved me time.', createdAt: 'Today 10:55 AM' }
];

export const initialInsights: SalonInsight[] = [
  {
    id: 'ins-1',
    type: 'peak_hours',
    title: 'Peak Waiting Time Warning',
    message: 'Your salon receives 35% more customers between 06:00 PM and 08:00 PM. Customers wait an average of 18 minutes for Raj during this window.',
    impactLevel: 'high',
    actionText: 'Review Waiting Intelligence',
    actionTab: 'waiting'
  },
  {
    id: 'ins-2',
    type: 'top_performer',
    title: 'Top Performer Highlight',
    message: 'Raj Kumar has the highest repeat-customer rate (63% repeat rate) with an average 4.8 ⭐ rating across 142 reviews.',
    impactLevel: 'high',
    actionText: 'View Team Leaderboard',
    actionTab: 'employees'
  },
  {
    id: 'ins-3',
    type: 'inactive_alert',
    title: 'Lost Customers Opportunity',
    message: '12 regular customers have not visited in more than 45 days. Sending them a ₹100 OFF coupon could recover ₹5,000+ revenue.',
    impactLevel: 'medium',
    actionText: 'Broadcast Offer',
    actionTab: 'offers'
  },
  {
    id: 'ins-4',
    type: 'revenue_driver',
    title: 'Popular Service Highlight',
    message: 'Nourishing Hair Spa & Gold Glow Facial generated 38% of total service revenue this month.',
    impactLevel: 'info',
    actionText: 'Analyze Sales',
    actionTab: 'closing'
  }
];

export const initialDailyClosingSummary: DailyClosingSummary = {
  date: '2026-08-18',
  totalCustomers: 42,
  newCustomers: 8,
  returningCustomers: 34,
  totalRevenue: 12850,
  serviceRevenue: 10500,
  productRevenue: 2350,
  discountsGiven: 700,
  paymentCash: 4200,
  paymentUPI: 6850,
  paymentCard: 1800,
  avgBillAmount: 305,
  appointmentsCount: 18,
  walkInsCount: 24,
  avgRatingToday: 4.7,
  lowStockItemsCount: 3,
  pendingFollowupsCount: 5,
  isClosed: false
};
