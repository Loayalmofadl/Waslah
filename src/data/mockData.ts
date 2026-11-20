export type UserRole = 'visitor' | 'customer' | 'marketer' | 'merchant' | 'support' | 'admin' | 'finance';

export type AccountStatus = 'new' | 'pending_review' | 'active' | 'suspended' | 'rejected';

export type ProductStatus = 'draft' | 'pending_review' | 'published' | 'rejected' | 'stopped' | 'out_of_stock';

export type OrderStatus = 'new' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'delivery_failed' | 'returned';

export type CommissionState = 'pending' | 'approved' | 'payable' | 'paying' | 'paid' | 'cancelled_reversed' | 'held_review';

export type PayoutState = 'pending' | 'approved' | 'paid' | 'rejected';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  commission: number;
  commissionType: 'fixed' | 'percentage';
  commissionBasis: 'product_value' | 'order_value';
  category: string;
  sku?: string;
  image: string;
  stock: number;
  clicks: number;
  orders: number;
  sales: number;
  deliveryTime: string;
  returnPolicy: string;
  status: ProductStatus;
  merchantId: string;
  merchantName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  publicOrderNo: string;
  productId: string;
  productName: string;
  merchantId: string;
  merchantName: string;
  marketerId: string;
  marketerName: string;
  customerName: string;
  customerPhone: string;
  customerRegion: string;
  customerAddress: string;
  quantity: number;
  priceSnapshot: number;
  commissionSnapshot: number;
  commissionBasisSnapshot: string;
  shippingFee: number;
  totalPrice: number;
  commissionState: CommissionState;
  orderStatus: OrderStatus;
  source: 'link' | 'whatsapp' | 'phone' | 'coupon';
  attributionCode?: string;
  date: string;
  cancellationReason?: string;
  returnReason?: string;
  events: OrderEvent[];
}

export interface OrderEvent {
  id: string;
  orderId: string;
  fromStatus: OrderStatus;
  toStatus: OrderStatus;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  reason?: string;
  createdAt: string;
}

export interface CommissionLedger {
  id: string;
  orderItemId: string;
  marketerId: string;
  marketerName: string;
  amount: number;
  currency: string;
  state: CommissionState;
  previousState?: CommissionState;
  reason?: string;
  actorId: string;
  createdAt: string;
}

export interface PayoutRequest {
  id: string;
  marketerId: string;
  marketerName: string;
  amount: number;
  currency: string;
  state: PayoutState;
  paymentMethod?: string;
  paymentReference?: string;
  paidAt?: string;
  proofUrl?: string;
  rejectionReason?: string;
  requestedAt: string;
  reviewedBy?: string;
}

export interface Marketer {
  id: string;
  name: string;
  email: string;
  phone: string;
  channels: string[];
  display_name: string;
  balance: number;
  pendingBalance: number;
  payableBalance: number;
  totalEarnings: number;
  totalClicks: number;
  totalOrders: number;
  deliveredOrders: number;
  conversionRate: number;
  joinDate: string;
  status: AccountStatus;
  payoutProfile: {
    method: string;
    account: string;
  };
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
  deliveredOrders: number;
  returnRate: number;
  joinDate: string;
  status: AccountStatus;
  termsAcceptedAt: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  entityType: string;
  entityId: string;
  before?: any;
  after?: any;
  reason?: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'order' | 'commission' | 'payout' | 'account' | 'system';
  title: string;
  content: string;
  readAt?: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterRole: UserRole;
  orderId?: string;
  category: 'order' | 'commission' | 'payout' | 'account' | 'technical' | 'other';
  subject: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  messages: {
    id: string;
    senderId: string;
    senderName: string;
    content: string;
    createdAt: string;
  }[];
}

export const products: Product[] = [
  {
    id: 'P001',
    name: 'كاميرا مراقبة ذكية WiFi',
    description: 'كاميرا مراقبة عالية الدقة 1080p مع رؤية ليلية وتتبع حركة، متصلة بالواي فاي ومراقبة من الهاتف',
    price: 55,
    currency: 'USD',
    commission: 5.5,
    commissionType: 'percentage',
    commissionBasis: 'product_value',
    category: 'إلكترونيات',
    sku: 'CAM-WIFI-001',
    image: '📷',
    stock: 120,
    clicks: 1540,
    orders: 87,
    sales: 4785,
    deliveryTime: '2-4 أيام عمل',
    returnPolicy: 'إرجاع خلال 7 أيام في حال وجود عيب مصنعي',
    status: 'published',
    merchantId: 'M001',
    merchantName: 'متجر التقنية الحديثة',
    createdAt: '2024-12-01',
    updatedAt: '2025-01-10'
  },
  {
    id: 'P002',
    name: 'ساعة ذكية رياضية',
    description: 'ساعة ذكية مقاومة للماء مع قياس نبضات القلب والأكسجين وGPS مدمج',
    price: 45,
    currency: 'USD',
    commission: 4.5,
    commissionType: 'percentage',
    commissionBasis: 'product_value',
    category: 'إلكترونيات',
    sku: 'WATCH-SPORT-002',
    image: '⌚',
    stock: 85,
    clicks: 2100,
    orders: 134,
    sales: 6030,
    deliveryTime: '2-3 أيام عمل',
    returnPolicy: 'إرجاع خلال 14 يوم بشرط عدم فتح العلبة',
    status: 'published',
    merchantId: 'M001',
    merchantName: 'متجر التقنية الحديثة',
    createdAt: '2024-12-05',
    updatedAt: '2025-01-12'
  },
  {
    id: 'P003',
    name: 'عطر فاخر - مسك الليل',
    description: 'عطر عربي فاخر بتركيبة مميزة تدوم طويلاً، مناسب للمناسبات',
    price: 35,
    currency: 'USD',
    commission: 3.5,
    commissionType: 'percentage',
    commissionBasis: 'product_value',
    category: 'عطور',
    sku: 'PERF-MISK-003',
    image: '🧴',
    stock: 200,
    clicks: 3200,
    orders: 210,
    sales: 7350,
    deliveryTime: '1-3 أيام عمل',
    returnPolicy: 'لا يمكن الإرجاع بعد فتح المنتج',
    status: 'published',
    merchantId: 'M002',
    merchantName: 'دار العطور العربية',
    createdAt: '2024-11-20',
    updatedAt: '2025-01-08'
  },
  {
    id: 'P004',
    name: 'حقيبة ظهر للسفر',
    description: 'حقيبة ظهر مقاومة للماء بسعة 40 لتر مع منفذ USB ومنظمة داخلياً',
    price: 28,
    currency: 'USD',
    commission: 3,
    commissionType: 'fixed',
    commissionBasis: 'product_value',
    category: 'حقائب',
    sku: 'BAG-TRAVEL-004',
    image: '🎒',
    stock: 60,
    clicks: 890,
    orders: 45,
    sales: 1260,
    deliveryTime: '3-5 أيام عمل',
    returnPolicy: 'إرجاع خلال 7 أيام مع إثبات العيب',
    status: 'published',
    merchantId: 'M003',
    merchantName: 'متجر الأناقة',
    createdAt: '2024-12-10',
    updatedAt: '2025-01-05'
  },
  {
    id: 'P005',
    name: 'سماعات بلوتوث لاسلكية',
    description: 'سماعات بلوتوث 5.3 مع عزل ضوضاء نشط وبطارية تدوم 30 ساعة',
    price: 32,
    currency: 'USD',
    commission: 3.2,
    commissionType: 'percentage',
    commissionBasis: 'product_value',
    category: 'إلكترونيات',
    sku: 'EAR-BT-005',
    image: '🎧',
    stock: 150,
    clicks: 1800,
    orders: 98,
    sales: 3136,
    deliveryTime: '2-4 أيام عمل',
    returnPolicy: 'إرجاع خلال 7 أيام مع العلبة الأصلية',
    status: 'published',
    merchantId: 'M001',
    merchantName: 'متجر التقنية الحديثة',
    createdAt: '2024-12-15',
    updatedAt: '2025-01-14'
  },
  {
    id: 'P006',
    name: 'مكواة شعر احترافية',
    description: 'مكواة شعر سيراميك مع تحكم بالحرارة وتقنية الأيونات السالبة',
    price: 22,
    currency: 'USD',
    commission: 2.5,
    commissionType: 'fixed',
    commissionBasis: 'product_value',
    category: 'عناية شخصية',
    sku: 'HAIR-IRON-006',
    image: '💇',
    stock: 90,
    clicks: 1200,
    orders: 67,
    sales: 1474,
    deliveryTime: '2-3 أيام عمل',
    returnPolicy: 'إرجاع خلال 3 أيام في حال وجود عيب',
    status: 'published',
    merchantId: 'M002',
    merchantName: 'دار العطور العربية',
    createdAt: '2024-12-20',
    updatedAt: '2025-01-11'
  },
  {
    id: 'P007',
    name: 'شاحن لاسلكي سريع',
    description: 'شاحن لاسلكي 15 واط متوافق مع جميع الأجهزة الحديثة',
    price: 18,
    currency: 'USD',
    commission: 2,
    commissionType: 'fixed',
    commissionBasis: 'product_value',
    category: 'إلكترونيات',
    sku: 'CHG-WIRELESS-007',
    image: '🔌',
    stock: 300,
    clicks: 950,
    orders: 52,
    sales: 936,
    deliveryTime: '1-2 يوم عمل',
    returnPolicy: 'إرجاع خلال 7 أيام',
    status: 'pending_review',
    merchantId: 'M001',
    merchantName: 'متجر التقنية الحديثة',
    createdAt: '2025-01-15',
    updatedAt: '2025-01-15'
  },
  {
    id: 'P008',
    name: 'طقم أواني مطبخ',
    description: 'طقم 12 قطعة من الستانلس ستيل المقاوم للصدأ',
    price: 65,
    currency: 'USD',
    commission: 6.5,
    commissionType: 'percentage',
    commissionBasis: 'product_value',
    category: 'منزلية',
    sku: 'KIT-SET-008',
    image: '🍳',
    stock: 40,
    clicks: 670,
    orders: 28,
    sales: 1820,
    deliveryTime: '3-5 أيام عمل',
    returnPolicy: 'إرجاع خلال 14 يوم بشرط عدم الاستخدام',
    status: 'published',
    merchantId: 'M003',
    merchantName: 'متجر الأناقة',
    createdAt: '2024-12-25',
    updatedAt: '2025-01-09'
  }
];

export const orders: Order[] = [
  {
    id: 'ORD-001', publicOrderNo: 'WAS-2025-0001', productId: 'P001', productName: 'كاميرا مراقبة ذكية WiFi',
    merchantId: 'M001', merchantName: 'متجر التقنية الحديثة', marketerId: 'AF001', marketerName: 'أحمد محمد',
    customerName: 'خالد علي', customerPhone: '777123456', customerRegion: 'صنعاء', customerAddress: 'شارع الزبيري',
    quantity: 1, priceSnapshot: 55, commissionSnapshot: 5.5, commissionBasisSnapshot: 'product_value',
    shippingFee: 0, totalPrice: 55, commissionState: 'approved', orderStatus: 'delivered', source: 'link',
    attributionCode: 'REF-AF001-P001', date: '2025-01-15',
    events: [
      { id: 'E1', orderId: 'ORD-001', fromStatus: 'new', toStatus: 'confirmed', actorId: 'M001', actorName: 'محمد الشرعي', actorRole: 'merchant', createdAt: '2025-01-15 10:30' },
      { id: 'E2', orderId: 'ORD-001', fromStatus: 'confirmed', toStatus: 'preparing', actorId: 'M001', actorName: 'محمد الشرعي', actorRole: 'merchant', createdAt: '2025-01-15 14:00' },
      { id: 'E3', orderId: 'ORD-001', fromStatus: 'preparing', toStatus: 'out_for_delivery', actorId: 'M001', actorName: 'محمد الشرعي', actorRole: 'merchant', createdAt: '2025-01-16 09:00' },
      { id: 'E4', orderId: 'ORD-001', fromStatus: 'out_for_delivery', toStatus: 'delivered', actorId: 'M001', actorName: 'محمد الشرعي', actorRole: 'merchant', createdAt: '2025-01-16 15:30' },
    ]
  },
  {
    id: 'ORD-002', publicOrderNo: 'WAS-2025-0002', productId: 'P003', productName: 'عطر فاخر - مسك الليل',
    merchantId: 'M002', merchantName: 'دار العطور العربية', marketerId: 'AF002', marketerName: 'سارة أحمد',
    customerName: 'فاطمة حسن', customerPhone: '771234567', customerRegion: 'عدن', customerAddress: 'خور مكسر',
    quantity: 1, priceSnapshot: 35, commissionSnapshot: 3.5, commissionBasisSnapshot: 'product_value',
    shippingFee: 2, totalPrice: 37, commissionState: 'paid', orderStatus: 'delivered', source: 'whatsapp',
    attributionCode: 'REF-AF002-P003', date: '2025-01-14',
    events: [
      { id: 'E5', orderId: 'ORD-002', fromStatus: 'new', toStatus: 'confirmed', actorId: 'M002', actorName: 'عبدالملك الحوثي', actorRole: 'merchant', createdAt: '2025-01-14 11:00' },
      { id: 'E6', orderId: 'ORD-002', fromStatus: 'confirmed', toStatus: 'delivered', actorId: 'M002', actorName: 'عبدالملك الحوثي', actorRole: 'merchant', createdAt: '2025-01-15 12:00' },
    ]
  },
  {
    id: 'ORD-003', publicOrderNo: 'WAS-2025-0003', productId: 'P002', productName: 'ساعة ذكية رياضية',
    merchantId: 'M001', merchantName: 'متجر التقنية الحديثة', marketerId: 'AF001', marketerName: 'أحمد محمد',
    customerName: 'محمد عبدالله', customerPhone: '773456789', customerRegion: 'تعز', customerAddress: 'شارع جمال',
    quantity: 1, priceSnapshot: 45, commissionSnapshot: 4.5, commissionBasisSnapshot: 'product_value',
    shippingFee: 3, totalPrice: 48, commissionState: 'pending', orderStatus: 'out_for_delivery', source: 'link',
    attributionCode: 'REF-AF001-P002', date: '2025-01-16',
    events: [
      { id: 'E7', orderId: 'ORD-003', fromStatus: 'new', toStatus: 'confirmed', actorId: 'M001', actorName: 'محمد الشرعي', actorRole: 'merchant', createdAt: '2025-01-16 09:00' },
      { id: 'E8', orderId: 'ORD-003', fromStatus: 'confirmed', toStatus: 'out_for_delivery', actorId: 'M001', actorName: 'محمد الشرعي', actorRole: 'merchant', createdAt: '2025-01-17 08:00' },
    ]
  },
  {
    id: 'ORD-004', publicOrderNo: 'WAS-2025-0004', productId: 'P005', productName: 'سماعات بلوتوث لاسلكية',
    merchantId: 'M001', merchantName: 'متجر التقنية الحديثة', marketerId: 'AF003', marketerName: 'ياسر سالم',
    customerName: 'عبدالرحمن عمر', customerPhone: '774567890', customerRegion: 'الحديدة', customerAddress: 'الميناء',
    quantity: 1, priceSnapshot: 32, commissionSnapshot: 3.2, commissionBasisSnapshot: 'product_value',
    shippingFee: 0, totalPrice: 32, commissionState: 'pending', orderStatus: 'new', source: 'link',
    attributionCode: 'REF-AF003-P005', date: '2025-01-17',
    events: [
      { id: 'E9', orderId: 'ORD-004', fromStatus: 'new', toStatus: 'new', actorId: 'AF003', actorName: 'ياسر سالم', actorRole: 'marketer', createdAt: '2025-01-17 14:00' },
    ]
  },
  {
    id: 'ORD-005', publicOrderNo: 'WAS-2025-0005', productId: 'P004', productName: 'حقيبة ظهر للسفر',
    merchantId: 'M003', merchantName: 'متجر الأناقة', marketerId: 'AF002', marketerName: 'سارة أحمد',
    customerName: 'نورا خالد', customerPhone: '775678901', customerRegion: 'إب', customerAddress: 'شارع 26 سبتمبر',
    quantity: 1, priceSnapshot: 28, commissionSnapshot: 3, commissionBasisSnapshot: 'product_value',
    shippingFee: 2, totalPrice: 30, commissionState: 'approved', orderStatus: 'delivered', source: 'phone',
    attributionCode: 'COUPON-SARA10', date: '2025-01-13',
    events: [
      { id: 'E10', orderId: 'ORD-005', fromStatus: 'new', toStatus: 'delivered', actorId: 'M003', actorName: 'فاطمة الصبري', actorRole: 'merchant', createdAt: '2025-01-15 16:00' },
    ]
  },
  {
    id: 'ORD-006', publicOrderNo: 'WAS-2025-0006', productId: 'P006', productName: 'مكواة شعر احترافية',
    merchantId: 'M002', merchantName: 'دار العطور العربية', marketerId: 'AF004', marketerName: 'هدى عبدالله',
    customerName: 'ريم صالح', customerPhone: '776789012', customerRegion: 'صنعاء', customerAddress: 'حدة',
    quantity: 1, priceSnapshot: 22, commissionSnapshot: 2.5, commissionBasisSnapshot: 'product_value',
    shippingFee: 0, totalPrice: 22, commissionState: 'cancelled_reversed', orderStatus: 'returned', source: 'link',
    attributionCode: 'REF-AF004-P006', date: '2025-01-12', returnReason: 'عيب في التصنيع',
    events: [
      { id: 'E11', orderId: 'ORD-006', fromStatus: 'new', toStatus: 'delivered', actorId: 'M002', actorName: 'عبدالملك الحوثي', actorRole: 'merchant', createdAt: '2025-01-13 10:00' },
      { id: 'E12', orderId: 'ORD-006', fromStatus: 'delivered', toStatus: 'returned', actorId: 'SUP01', actorName: 'فريق الدعم', actorRole: 'support', reason: 'عيب في التصنيع', createdAt: '2025-01-14 14:00' },
    ]
  },
  {
    id: 'ORD-007', publicOrderNo: 'WAS-2025-0007', productId: 'P001', productName: 'كاميرا مراقبة ذكية WiFi',
    merchantId: 'M001', merchantName: 'متجر التقنية الحديثة', marketerId: 'AF001', marketerName: 'أحمد محمد',
    customerName: 'سامي ناصر', customerPhone: '777890123', customerRegion: 'ذمار', customerAddress: 'وسط المدينة',
    quantity: 1, priceSnapshot: 55, commissionSnapshot: 5.5, commissionBasisSnapshot: 'product_value',
    shippingFee: 3, totalPrice: 58, commissionState: 'payable', orderStatus: 'delivered', source: 'whatsapp',
    attributionCode: 'REF-AF001-P001', date: '2025-01-10',
    events: [
      { id: 'E13', orderId: 'ORD-007', fromStatus: 'new', toStatus: 'delivered', actorId: 'M001', actorName: 'محمد الشرعي', actorRole: 'merchant', createdAt: '2025-01-11 12:00' },
    ]
  },
  {
    id: 'ORD-008', publicOrderNo: 'WAS-2025-0008', productId: 'P008', productName: 'طقم أواني مطبخ',
    merchantId: 'M003', merchantName: 'متجر الأناقة', marketerId: 'AF003', marketerName: 'ياسر سالم',
    customerName: 'عائشة محمود', customerPhone: '778901234', customerRegion: 'عمران', customerAddress: 'شارع الرئيسي',
    quantity: 1, priceSnapshot: 65, commissionSnapshot: 6.5, commissionBasisSnapshot: 'product_value',
    shippingFee: 4, totalPrice: 69, commissionState: 'pending', orderStatus: 'confirmed', source: 'link',
    attributionCode: 'REF-AF003-P008', date: '2025-01-17',
    events: [
      { id: 'E14', orderId: 'ORD-008', fromStatus: 'new', toStatus: 'confirmed', actorId: 'M003', actorName: 'فاطمة الصبري', actorRole: 'merchant', createdAt: '2025-01-17 11:00' },
    ]
  },
];

export const marketers: Marketer[] = [
  {
    id: 'AF001', name: 'أحمد محمد', email: 'ahmed@email.com', phone: '777111222',
    channels: ['فيسبوك', 'واتساب', 'تيك توك'], display_name: 'أحمد - تقنيات',
    balance: 0, pendingBalance: 7.7, payableBalance: 5.5, totalEarnings: 234.5,
    totalClicks: 5400, totalOrders: 156, deliveredOrders: 142, conversionRate: 2.89,
    joinDate: '2024-08-15', status: 'active',
    payoutProfile: { method: 'حوالة', account: '777111222 - أحمد محمد' }
  },
  {
    id: 'AF002', name: 'سارة أحمد', email: 'sara@email.com', phone: '771222333',
    channels: ['فيسبوك', 'واتساب'], display_name: 'سارة - عروض مميزة',
    balance: 12.0, pendingBalance: 3.0, payableBalance: 15.0, totalEarnings: 189.0,
    totalClicks: 4200, totalOrders: 120, deliveredOrders: 108, conversionRate: 2.86,
    joinDate: '2024-09-20', status: 'active',
    payoutProfile: { method: 'محفظ إلكترونية', account: 'sara@wallet' }
  },
  {
    id: 'AF003', name: 'ياسر سالم', email: 'yaser@email.com', phone: '773333444',
    channels: ['تيك توك', 'انستقرام'], display_name: 'ياسر - تسوق بذكاء',
    balance: 6.5, pendingBalance: 9.7, payableBalance: 0, totalEarnings: 98.7,
    totalClicks: 2800, totalOrders: 78, deliveredOrders: 65, conversionRate: 2.79,
    joinDate: '2024-10-05', status: 'active',
    payoutProfile: { method: 'حوالة', account: '773333444 - ياسر سالم' }
  },
  {
    id: 'AF004', name: 'هدى عبدالله', email: 'huda@email.com', phone: '774444555',
    channels: ['واتساب'], display_name: 'هدى - جمال وأناقة',
    balance: 0, pendingBalance: 0, payableBalance: 0, totalEarnings: 0,
    totalClicks: 1500, totalOrders: 34, deliveredOrders: 28, conversionRate: 2.27,
    joinDate: '2024-11-12', status: 'pending_review',
    payoutProfile: { method: 'حوالة', account: '774444555 - هدى عبدالله' }
  },
  {
    id: 'AF005', name: 'عمر خالد', email: 'omar@email.com', phone: '775555666',
    channels: ['فيسبوك'], display_name: 'عمر - منتجات متنوعة',
    balance: 0, pendingBalance: 0, payableBalance: 0, totalEarnings: 0,
    totalClicks: 120, totalOrders: 3, deliveredOrders: 0, conversionRate: 2.50,
    joinDate: '2025-01-10', status: 'suspended',
    payoutProfile: { method: 'حوالة', account: '775555666 - عمر خالد' }
  },
];

export const merchants: Merchant[] = [
  {
    id: 'M001', name: 'محمد الشرعي', storeName: 'متجر التقنية الحديثة', email: 'tech@email.com', phone: '777000111',
    totalProducts: 15, totalSales: 12500, totalCommissionPaid: 1250, deliveredOrders: 210, returnRate: 3.2,
    joinDate: '2024-06-01', status: 'active', termsAcceptedAt: '2024-06-01'
  },
  {
    id: 'M002', name: 'عبدالملك الحوثي', storeName: 'دار العطور العربية', email: 'perfume@email.com', phone: '771000222',
    totalProducts: 8, totalSales: 8900, totalCommissionPaid: 890, deliveredOrders: 180, returnRate: 2.1,
    joinDate: '2024-07-15', status: 'active', termsAcceptedAt: '2024-07-15'
  },
  {
    id: 'M003', name: 'فاطمة الصبري', storeName: 'متجر الأناقة', email: 'elegance@email.com', phone: '773000333',
    totalProducts: 12, totalSales: 6700, totalCommissionPaid: 670, deliveredOrders: 145, returnRate: 4.5,
    joinDate: '2024-08-20', status: 'active', termsAcceptedAt: '2024-08-20'
  },
  {
    id: 'M004', name: 'علي المقطري', storeName: 'متجر المنزل', email: 'home@email.com', phone: '774000444',
    totalProducts: 5, totalSales: 2300, totalCommissionPaid: 230, deliveredOrders: 45, returnRate: 1.8,
    joinDate: '2024-12-01', status: 'pending_review', termsAcceptedAt: '2024-12-01'
  },
];

export const auditLogs: AuditLog[] = [
  { id: 'LOG-001', actorId: 'ADMIN', actorName: 'المدير العام', actorRole: 'admin', action: 'approve_product', entityType: 'product', entityId: 'P007', timestamp: '2025-01-15 10:00' },
  { id: 'LOG-002', actorId: 'FIN01', actorName: 'المسؤول المالي', actorRole: 'finance', action: 'process_payout', entityType: 'payout', entityId: 'PAY-001', after: { amount: 50, state: 'paid' }, timestamp: '2025-01-15 11:30' },
  { id: 'LOG-003', actorId: 'M001', actorName: 'محمد الشرعي', actorRole: 'merchant', action: 'update_order_status', entityType: 'order', entityId: 'ORD-001', before: { status: 'preparing' }, after: { status: 'out_for_delivery' }, timestamp: '2025-01-16 09:00' },
  { id: 'LOG-004', actorId: 'SUP01', actorName: 'فريق الدعم', actorRole: 'support', action: 'process_return', entityType: 'order', entityId: 'ORD-006', before: { status: 'delivered' }, after: { status: 'returned' }, reason: 'عيب في التصنيع', timestamp: '2025-01-14 14:00' },
  { id: 'LOG-005', actorId: 'ADMIN', actorName: 'المدير العام', actorRole: 'admin', action: 'suspend_account', entityType: 'marketer', entityId: 'AF005', reason: 'نشاط مشبوه', timestamp: '2025-01-14 16:00' },
  { id: 'LOG-006', actorId: 'FIN01', actorName: 'المسؤول المالي', actorRole: 'finance', action: 'approve_commission', entityType: 'commission', entityId: 'COM-007', before: { state: 'pending' }, after: { state: 'payable' }, timestamp: '2025-01-13 15:00' },
];

export const notifications: Notification[] = [
  { id: 'N-001', userId: 'AF001', type: 'commission', title: 'عمولة معتمدة', content: 'تم اعتماد عمولة $5.50 للطلب WAS-2025-0007', createdAt: '2025-01-13 15:00' },
  { id: 'N-002', userId: 'AF001', type: 'order', title: 'طلب جديد', content: 'طلب جديد WAS-2025-0003 من عميلك', createdAt: '2025-01-16 08:00' },
  { id: 'N-003', userId: 'M001', type: 'order', title: 'طلب جديد', content: 'طلب جديد WAS-2025-0004 في انتظارك', createdAt: '2025-01-17 14:00' },
  { id: 'N-004', userId: 'AF002', type: 'payout', title: 'تم الدفع', content: 'تم تحويل $50 إلى حسابك', createdAt: '2025-01-15 11:30', readAt: '2025-01-15 12:00' },
  { id: 'N-005', userId: 'ADMIN', type: 'account', title: 'حساب جديد', content: 'تاجر جديد "متجر المنزل" في انتظار المراجعة', createdAt: '2025-01-14 10:00' },
];

export const supportTickets: SupportTicket[] = [
  {
    id: 'TKT-001', requesterId: 'AF004', requesterName: 'هدى عبدالله', requesterRole: 'marketer',
    orderId: 'ORD-006', category: 'commission', subject: 'نزاع حول عمولة الطلب المرتجع',
    status: 'open', priority: 'high', createdAt: '2025-01-14 15:00',
    messages: [
      { id: 'M1', senderId: 'AF004', senderName: 'هدى عبدالله', content: 'الطلب تم تسليمه بنجاح لكن التاجر ادعى أنه مرتجع. أطلب مراجعة الحالة.', createdAt: '2025-01-14 15:00' },
      { id: 'M2', senderId: 'SUP01', senderName: 'فريق الدعم', content: 'تم استلام الشكوى وجاري المراجعة مع التاجر.', createdAt: '2025-01-14 16:00' },
    ]
  },
];

export const payoutRequests: PayoutRequest[] = [
  { id: 'PAY-001', marketerId: 'AF001', marketerName: 'أحمد محمد', amount: 50, currency: 'USD', state: 'paid', paymentMethod: 'حوالة', paymentReference: 'TRF-2025-001', paidAt: '2025-01-15', requestedAt: '2025-01-13', reviewedBy: 'FIN01' },
  { id: 'PAY-002', marketerId: 'AF002', marketerName: 'سارة أحمد', amount: 35, currency: 'USD', state: 'paid', paymentMethod: 'محفظة إلكترونية', paymentReference: 'WAL-2025-002', paidAt: '2025-01-10', requestedAt: '2025-01-08', reviewedBy: 'FIN01' },
  { id: 'PAY-003', marketerId: 'AF001', marketerName: 'أحمد محمد', amount: 45.5, currency: 'USD', state: 'pending', requestedAt: '2025-01-17' },
];

export const platformStats = {
  totalMerchants: 4,
  totalMarketers: 5,
  totalProducts: 8,
  totalOrders: 8,
  gmv: 421,
  netEligibleSales: 399,
  platformFees: 21.05,
  totalCommissions: 34.2,
  pendingCommissions: 17.2,
  payableCommissions: 5.5,
  paidCommissions: 11.5,
  reversedCommissions: 2.5,
  pendingWithdrawals: 1,
  pendingApprovals: 2,
  openTickets: 1,
  activeMarketers: 3,
  deliveryRate: 87.5,
  returnRate: 12.5,
  conversionRate: 2.85,
};

export const commissionLifecycle = [
  { state: 'pending' as CommissionState, label: 'معلقة', description: 'طلب جديد أو لم تكتمل شروط الاعتماد', color: 'bg-yellow-100 text-yellow-700' },
  { state: 'approved' as CommissionState, label: 'معتمدة', description: 'تم التحقق من التسليم وانتهاء شرط الإرجاع', color: 'bg-blue-100 text-blue-700' },
  { state: 'payable' as CommissionState, label: 'مستحقة للسحب', description: 'مؤهلة للدفع وفق فترة التسوية والحد الأدنى', color: 'bg-indigo-100 text-indigo-700' },
  { state: 'paying' as CommissionState, label: 'قيد الدفع', description: 'طلب السحب قيد المعالجة المالية', color: 'bg-purple-100 text-purple-700' },
  { state: 'paid' as CommissionState, label: 'مدفوعة', description: 'تم تسجيل تأكيد الدفع ومرجعه', color: 'bg-emerald-100 text-emerald-700' },
  { state: 'cancelled_reversed' as CommissionState, label: 'ملغاة/معكوسة', description: 'ألغيت أو ارتجعت مبيعات مؤهلة', color: 'bg-red-100 text-red-700' },
  { state: 'held_review' as CommissionState, label: 'موقوفة للمراجعة', description: 'اشتباه أو نزاع أو نقص مستندات', color: 'bg-orange-100 text-orange-700' },
];
