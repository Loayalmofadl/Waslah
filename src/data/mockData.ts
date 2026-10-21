export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  commission: number;
  commissionType: 'fixed' | 'percentage';
  category: string;
  image: string;
  stock: number;
  clicks: number;
  orders: number;
  sales: number;
  status: 'active' | 'pending' | 'inactive';
  merchantId: string;
  merchantName: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  merchantId: string;
  merchantName: string;
  marketerId: string;
  marketerName: string;
  customerName: string;
  customerPhone: string;
  price: number;
  commission: number;
  commissionStatus: 'pending' | 'approved' | 'paid' | 'rejected';
  orderStatus: 'new' | 'confirmed' | 'shipping' | 'delivered' | 'returned' | 'cancelled';
  date: string;
  source: 'link' | 'whatsapp' | 'phone';
}

export interface Marketer {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  totalEarnings: number;
  totalClicks: number;
  totalOrders: number;
  joinDate: string;
  status: 'active' | 'suspended' | 'pending';
}

export interface Merchant {
  id: string;
  name: string;
  storeName: string;
  email: string;
  phone: string;
  totalProducts: number;
  totalSales: number;
  totalCommissionPaid: number;
  joinDate: string;
  status: 'active' | 'suspended' | 'pending';
}

export const products: Product[] = [
  {
    id: 'P001',
    name: 'كاميرا مراقبة ذكية WiFi',
    description: 'كاميرا مراقبة عالية الدقة 1080p مع رؤية ليلية وتتبع حركة، متصلة بالواي فاي ومراقبة من الهاتف',
    price: 55,
    commission: 5.5,
    commissionType: 'percentage',
    category: 'إلكترونيات',
    image: '📷',
    stock: 120,
    clicks: 1540,
    orders: 87,
    sales: 4785,
    status: 'active',
    merchantId: 'M001',
    merchantName: 'متجر التقنية الحديثة'
  },
  {
    id: 'P002',
    name: 'ساعة ذكية رياضية',
    description: 'ساعة ذكية مقاومة للماء مع قياس نبضات القلب والأكسجين وGPS مدمج',
    price: 45,
    commission: 4.5,
    commissionType: 'percentage',
    category: 'إلكترونيات',
    image: '⌚',
    stock: 85,
    clicks: 2100,
    orders: 134,
    sales: 6030,
    status: 'active',
    merchantId: 'M001',
    merchantName: 'متجر التقنية الحديثة'
  },
  {
    id: 'P003',
    name: 'عطر فاخر - مسك الليل',
    description: 'عطر عربي فاخر بتركيبة مميزة تدوم طويلاً، مناسب للمناسبات',
    price: 35,
    commission: 3.5,
    commissionType: 'percentage',
    category: 'عطور',
    image: '🧴',
    stock: 200,
    clicks: 3200,
    orders: 210,
    sales: 7350,
    status: 'active',
    merchantId: 'M002',
    merchantName: 'دار العطور العربية'
  },
  {
    id: 'P004',
    name: 'حقيبة ظهر للسفر',
    description: 'حقيبة ظهر مقاومة للماء بسعة 40 لتر مع منفذ USB ومنظمة داخلياً',
    price: 28,
    commission: 3,
    commissionType: 'fixed',
    category: 'حقائب',
    image: '🎒',
    stock: 60,
    clicks: 890,
    orders: 45,
    sales: 1260,
    status: 'active',
    merchantId: 'M003',
    merchantName: 'متجر الأناقة'
  },
  {
    id: 'P005',
    name: 'سماعات بلوتوث لاسلكية',
    description: 'سماعات بلوتوث 5.3 مع عزل ضوضاء نشط وبطارية تدوم 30 ساعة',
    price: 32,
    commission: 3.2,
    commissionType: 'percentage',
    category: 'إلكترونيات',
    image: '🎧',
    stock: 150,
    clicks: 1800,
    orders: 98,
    sales: 3136,
    status: 'active',
    merchantId: 'M001',
    merchantName: 'متجر التقنية الحديثة'
  },
  {
    id: 'P006',
    name: 'مكواة شعر احترافية',
    description: 'مكواة شعر سيراميك مع تحكم بالحرارة وتقنية الأيونات السالبة',
    price: 22,
    commission: 2.5,
    commissionType: 'fixed',
    category: 'عناية شخصية',
    image: '💇',
    stock: 90,
    clicks: 1200,
    orders: 67,
    sales: 1474,
    status: 'active',
    merchantId: 'M002',
    merchantName: 'دار العطور العربية'
  },
  {
    id: 'P007',
    name: 'شاحن لاسلكي سريع',
    description: 'شاحن لاسلكي 15 واط متوافق مع جميع الأجهزة الحديثة',
    price: 18,
    commission: 2,
    commissionType: 'fixed',
    category: 'إلكترونيات',
    image: '🔌',
    stock: 300,
    clicks: 950,
    orders: 52,
    sales: 936,
    status: 'pending',
    merchantId: 'M001',
    merchantName: 'متجر التقنية الحديثة'
  },
  {
    id: 'P008',
    name: 'طقم أواني مطبخ',
    description: 'طقم 12 قطعة من الستانلس ستيل المقاوم للصدأ',
    price: 65,
    commission: 6.5,
    commissionType: 'percentage',
    category: 'منزلية',
    image: '🍳',
    stock: 40,
    clicks: 670,
    orders: 28,
    sales: 1820,
    status: 'active',
    merchantId: 'M003',
    merchantName: 'متجر الأناقة'
  }
];

export const orders: Order[] = [
  { id: 'ORD-001', productId: 'P001', productName: 'كاميرا مراقبة ذكية WiFi', merchantId: 'M001', merchantName: 'متجر التقنية الحديثة', marketerId: 'AF001', marketerName: 'أحمد محمد', customerName: 'خالد علي', customerPhone: '777123456', price: 55, commission: 5.5, commissionStatus: 'approved', orderStatus: 'delivered', date: '2025-01-15', source: 'link' },
  { id: 'ORD-002', productId: 'P003', productName: 'عطر فاخر - مسك الليل', merchantId: 'M002', merchantName: 'دار العطور العربية', marketerId: 'AF002', marketerName: 'سارة أحمد', customerName: 'فاطمة حسن', customerPhone: '771234567', price: 35, commission: 3.5, commissionStatus: 'paid', orderStatus: 'delivered', date: '2025-01-14', source: 'whatsapp' },
  { id: 'ORD-003', productId: 'P002', productName: 'ساعة ذكية رياضية', merchantId: 'M001', merchantName: 'متجر التقنية الحديثة', marketerId: 'AF001', marketerName: 'أحمد محمد', customerName: 'محمد عبدالله', customerPhone: '773456789', price: 45, commission: 4.5, commissionStatus: 'pending', orderStatus: 'shipping', date: '2025-01-16', source: 'link' },
  { id: 'ORD-004', productId: 'P005', productName: 'سماعات بلوتوث لاسلكية', merchantId: 'M001', merchantName: 'متجر التقنية الحديثة', marketerId: 'AF003', marketerName: 'ياسر سالم', customerName: 'عبدالرحمن عمر', customerPhone: '774567890', price: 32, commission: 3.2, commissionStatus: 'pending', orderStatus: 'new', date: '2025-01-17', source: 'link' },
  { id: 'ORD-005', productId: 'P004', productName: 'حقيبة ظهر للسفر', merchantId: 'M003', merchantName: 'متجر الأناقة', marketerId: 'AF002', marketerName: 'سارة أحمد', customerName: 'نورا خالد', customerPhone: '775678901', price: 28, commission: 3, commissionStatus: 'approved', orderStatus: 'delivered', date: '2025-01-13', source: 'phone' },
  { id: 'ORD-006', productId: 'P006', productName: 'مكواة شعر احترافية', merchantId: 'M002', merchantName: 'دار العطور العربية', marketerId: 'AF004', marketerName: 'هدى عبدالله', customerName: 'ريم صالح', customerPhone: '776789012', price: 22, commission: 2.5, commissionStatus: 'rejected', orderStatus: 'returned', date: '2025-01-12', source: 'link' },
  { id: 'ORD-007', productId: 'P001', productName: 'كاميرا مراقبة ذكية WiFi', merchantId: 'M001', merchantName: 'متجر التقنية الحديثة', marketerId: 'AF001', marketerName: 'أحمد محمد', customerName: 'سامي ناصر', customerPhone: '777890123', price: 55, commission: 5.5, commissionStatus: 'paid', orderStatus: 'delivered', date: '2025-01-10', source: 'whatsapp' },
  { id: 'ORD-008', productId: 'P008', productName: 'طقم أواني مطبخ', merchantId: 'M003', merchantName: 'متجر الأناقة', marketerId: 'AF003', marketerName: 'ياسر سالم', customerName: 'عائشة محمود', customerPhone: '778901234', price: 65, commission: 6.5, commissionStatus: 'pending', orderStatus: 'confirmed', date: '2025-01-17', source: 'link' },
];

export const marketers: Marketer[] = [
  { id: 'AF001', name: 'أحمد محمد', email: 'ahmed@email.com', phone: '777111222', balance: 45.5, totalEarnings: 234.5, totalClicks: 5400, totalOrders: 156, joinDate: '2024-08-15', status: 'active' },
  { id: 'AF002', name: 'سارة أحمد', email: 'sara@email.com', phone: '771222333', balance: 28.0, totalEarnings: 189.0, totalClicks: 4200, totalOrders: 120, joinDate: '2024-09-20', status: 'active' },
  { id: 'AF003', name: 'ياسر سالم', email: 'yaser@email.com', phone: '773333444', balance: 15.2, totalEarnings: 98.7, totalClicks: 2800, totalOrders: 78, joinDate: '2024-10-05', status: 'active' },
  { id: 'AF004', name: 'هدى عبدالله', email: 'huda@email.com', phone: '774444555', balance: 8.5, totalEarnings: 45.0, totalClicks: 1500, totalOrders: 34, joinDate: '2024-11-12', status: 'pending' },
  { id: 'AF005', name: 'عمر خالد', email: 'omar@email.com', phone: '775555666', balance: 0, totalEarnings: 0, totalClicks: 120, totalOrders: 3, joinDate: '2025-01-10', status: 'suspended' },
];

export const merchants: Merchant[] = [
  { id: 'M001', name: 'محمد الشرعي', storeName: 'متجر التقنية الحديثة', email: 'tech@email.com', phone: '777000111', totalProducts: 15, totalSales: 12500, totalCommissionPaid: 1250, joinDate: '2024-06-01', status: 'active' },
  { id: 'M002', name: 'عبدالملك الحوثي', storeName: 'دار العطور العربية', email: 'perfume@email.com', phone: '771000222', totalProducts: 8, totalSales: 8900, totalCommissionPaid: 890, joinDate: '2024-07-15', status: 'active' },
  { id: 'M003', name: 'فاطمة الصبري', storeName: 'متجر الأناقة', email: 'elegance@email.com', phone: '773000333', totalProducts: 12, totalSales: 6700, totalCommissionPaid: 670, joinDate: '2024-08-20', status: 'active' },
  { id: 'M004', name: 'علي المقطري', storeName: 'متجر المنزل', email: 'home@email.com', phone: '774000444', totalProducts: 5, totalSales: 2300, totalCommissionPaid: 230, joinDate: '2024-12-01', status: 'pending' },
];

export const platformStats = {
  totalMerchants: 4,
  totalMarketers: 5,
  totalProducts: 8,
  totalOrders: 8,
  totalSales: 28100,
  totalCommissions: 2810,
  platformFees: 1405,
  pendingWithdrawals: 3,
  pendingApprovals: 2,
};
