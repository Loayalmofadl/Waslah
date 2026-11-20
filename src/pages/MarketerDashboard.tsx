import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, DollarSign, TrendingUp, Eye, ShoppingCart, Copy, Check, Search, Filter, Wallet, BarChart3 } from 'lucide-react';
import WaslaLogo from '../components/WaslaLogo';
import { products, orders, commissionLifecycle } from '../data/mockData';
import type { CommissionState } from '../data/mockData';

interface MarketerDashboardProps {
  onNavigate: (page: any) => void;
  onProductClick: (productId: string) => void;
}

export default function MarketerDashboard({ onNavigate, onProductClick }: MarketerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'catalog' | 'mylinks' | 'earnings' | 'withdrawals'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const marketerOrders = orders.filter(o => o.marketerId === 'AF001');
  const totalEarnings = marketerOrders.reduce((sum, o) => sum + o.commissionSnapshot, 0);
  const pendingEarnings = marketerOrders.filter(o => o.commissionState === 'pending').reduce((sum, o) => sum + o.commissionSnapshot, 0);
  const payableEarnings = marketerOrders.filter(o => o.commissionState === 'payable' || o.commissionState === 'approved').reduce((sum, o) => sum + o.commissionSnapshot, 0);
  const deliveredOrders = marketerOrders.filter(o => o.orderStatus === 'delivered');

  const categories = ['all', ...new Set(products.map(p => p.category))];
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.includes(searchQuery) || p.description.includes(searchQuery);
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory && p.status === 'published';
  });

  const copyLink = (productId: string) => {
    const link = `wasla.ye/p/${productId}?ref=AF001`;
    navigator.clipboard.writeText(link).catch(() => {});
    setCopiedId(productId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('landing')} className="text-wasla-muted hover:text-wasla-navy transition"><ArrowRight className="w-5 h-5" /></button>
            <WaslaLogo variant="full" size="sm" />
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <div><h1 className="text-base font-bold text-wasla-navy">بوابة المسوّق</h1><p className="text-xs text-wasla-muted">أحمد محمد</p></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-wasla-success/10 px-3 py-1.5 rounded-lg"><span className="text-xs text-wasla-muted">رصيدك القابل للسحب: </span><span className="font-bold text-wasla-success">${payableEarnings.toFixed(2)}</span></div>
            <div className="w-8 h-8 bg-wasla-teal/10 rounded-full flex items-center justify-center text-wasla-teal-dark font-bold text-sm">أ</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'النقرات الصالحة', value: '5,400', icon: <Eye className="w-5 h-5" />, color: 'bg-wasla-navy/5 text-wasla-navy' },
            { label: 'الطلبات المنسوبة', value: marketerOrders.length.toString(), icon: <ShoppingCart className="w-5 h-5" />, color: 'bg-wasla-teal/10 text-wasla-teal-dark' },
            { label: 'معدل التحويل', value: `${((marketerOrders.length / 5400) * 100).toFixed(2)}%`, icon: <BarChart3 className="w-5 h-5" />, color: 'bg-wasla-gold/10 text-wasla-gold' },
            { label: 'الأرباح الكلية', value: `$${totalEarnings.toFixed(1)}`, icon: <DollarSign className="w-5 h-5" />, color: 'bg-wasla-success/10 text-wasla-success' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-xl p-4 shadow-sm">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Commission Balance Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h3 className="font-bold text-gray-800 mb-3">تفصيل الأرباح حسب حالة العمولة</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <div className="text-xs text-yellow-600 mb-1">معلقة</div>
              <div className="text-lg font-bold text-yellow-700">${pendingEarnings.toFixed(2)}</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-xs text-blue-600 mb-1">معتمدة</div>
              <div className="text-lg font-bold text-blue-700">${marketerOrders.filter(o => o.commissionState === 'approved').reduce((s, o) => s + o.commissionSnapshot, 0).toFixed(2)}</div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 text-center">
              <div className="text-xs text-emerald-600 mb-1">مستحقة/مدفوعة</div>
              <div className="text-lg font-bold text-emerald-700">${marketerOrders.filter(o => o.commissionState === 'payable' || o.commissionState === 'paid').reduce((s, o) => s + o.commissionSnapshot, 0).toFixed(2)}</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <div className="text-xs text-red-600 mb-1">ملغاة/معكوسة</div>
              <div className="text-lg font-bold text-red-700">${marketerOrders.filter(o => o.commissionState === 'cancelled_reversed').reduce((s, o) => s + o.commissionSnapshot, 0).toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="flex border-b overflow-x-auto">
            {[
              { id: 'catalog' as const, label: 'كتالوج المنتجات', icon: <ShoppingCart className="w-4 h-4" /> },
              { id: 'mylinks' as const, label: 'روابطي', icon: <Copy className="w-4 h-4" /> },
              { id: 'earnings' as const, label: 'كشف العمولات', icon: <DollarSign className="w-4 h-4" /> },
              { id: 'withdrawals' as const, label: 'سحب الأرباح', icon: <Wallet className="w-4 h-4" /> },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition whitespace-nowrap ${activeTab === tab.id ? 'border-wasla-teal text-wasla-teal-dark' : 'border-transparent text-wasla-muted hover:text-wasla-navy'}`}>
                {tab.icon}{tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'catalog' && (
              <div>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full border rounded-lg pr-10 pl-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="ابحث عن منتج..." />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none">
                      {categories.map(cat => (<option key={cat} value={cat}>{cat === 'all' ? 'جميع الفئات' : cat}</option>))}
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.map(product => (
                    <motion.div key={product.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="border rounded-xl p-4 hover:shadow-lg transition">
                      <div className="text-center mb-3"><span className="text-5xl">{product.image}</span></div>
                      <h4 className="font-bold text-gray-800 text-center mb-1">{product.name}</h4>
                      <p className="text-xs text-gray-500 text-center mb-2 line-clamp-2">{product.description}</p>
                      <div className="text-xs text-gray-400 text-center mb-2">📦 {product.deliveryTime} | {product.returnPolicy.slice(0, 30)}...</div>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-blue-50 rounded-lg p-2 text-center"><div className="text-xs text-gray-500">السعر</div><div className="font-bold text-blue-600">${product.price}</div></div>
                        <div className="bg-emerald-50 rounded-lg p-2 text-center"><div className="text-xs text-gray-500">عمولتك</div><div className="font-bold text-emerald-600">${product.commission}</div></div>
                      </div>
                      <div className="text-xs text-gray-400 text-center mb-3">{product.commissionType === 'percentage' ? `${(product.commission / product.price * 100).toFixed(0)}% من ${product.commissionBasis === 'product_value' ? 'قيمة المنتج' : 'قيمة الطلب'}` : `$${product.commission} ثابت`}</div>
                      <div className="flex gap-2">
                        <button onClick={() => copyLink(product.id)} className="flex-1 flex items-center justify-center gap-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
                          {copiedId === product.id ? <><Check className="w-3.5 h-3.5 text-emerald-500" /> تم النسخ</> : <><Copy className="w-3.5 h-3.5" /> نسخ الرابط</>}
                        </button>
                        <button onClick={() => onProductClick(product.id)} className="flex-1 py-2 bg-wasla-teal text-wasla-navy rounded-lg hover:bg-wasla-teal/90 transition text-sm font-bold">سوّق هذا</button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'mylinks' && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">روابطي التسويقية الفريدة</h3>
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-4 text-sm text-indigo-700">
                  <strong>ملاحظة:</strong> يمكن إنشاء أكثر من رابط لنفس المنتج لقياس القنوات المختلفة (AFF-05)
                </div>
                <div className="space-y-3">
                  {products.slice(0, 5).map(product => (
                    <div key={product.id} className="border rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3"><span className="text-2xl">{product.image}</span><div><h4 className="font-medium text-gray-800">{product.name}</h4><p className="text-xs text-gray-500">{product.merchantName}</p></div></div>
                        <div className="text-left"><div className="text-sm font-bold text-emerald-600">${product.commission}</div><div className="text-xs text-gray-400">لكل عملية بيع</div></div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 flex items-center justify-between">
                        <code className="text-xs text-gray-600 font-mono">wasla.ye/p/{product.id}?ref=AF001</code>
                        <button onClick={() => copyLink(product.id)} className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">{copiedId === product.id ? '✓ تم' : 'نسخ'}</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'earnings' && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">كشف العمولات المفصّل</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500">
                        <th className="text-right p-3 rounded-r-lg">رقم الطلب</th>
                        <th className="text-right p-3">المنتج</th>
                        <th className="text-right p-3">لقطة السعر</th>
                        <th className="text-right p-3">لقطة العمولة</th>
                        <th className="text-right p-3">التاريخ</th>
                        <th className="text-right p-3">حالة العمولة</th>
                        <th className="text-right p-3 rounded-l-lg">المصدر</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketerOrders.map(order => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-mono text-xs">{order.publicOrderNo}</td>
                          <td className="p-3">{order.productName}</td>
                          <td className="p-3">${order.priceSnapshot}</td>
                          <td className="p-3 font-bold text-emerald-600">${order.commissionSnapshot}</td>
                          <td className="p-3 text-gray-500">{order.date}</td>
                          <td className="p-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${commissionLifecycle.find(s => s.state === order.commissionState)?.color || 'bg-gray-100 text-gray-700'}`}>
                              {commissionLifecycle.find(s => s.state === order.commissionState)?.label || order.commissionState}
                            </span>
                          </td>
                          <td className="p-3 text-xs">{order.source === 'link' ? '🔗' : order.source === 'whatsapp' ? '💬' : order.source === 'phone' ? '📞' : '🎟️'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'withdrawals' && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">سحب الأرباح</h3>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 mb-6">
                  <div className="text-sm text-gray-600 mb-1">الرصيد المتاح للسحب (المستحق)</div>
                  <div className="text-4xl font-bold text-emerald-700 mb-2">${payableEarnings.toFixed(2)}</div>
                  <div className="text-xs text-gray-500 mb-4">الحد الأدنى للسحب: $10 | المعلقة ($${pendingEarnings.toFixed(2)}) غير قابلة للسحب حتى اعتمادها</div>
                  <button className="px-6 py-3 bg-wasla-teal text-wasla-navy font-bold rounded-lg hover:bg-wasla-teal/90 transition"><Wallet className="w-4 h-4 inline ml-2" />اطلب السحب</button>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-sm text-yellow-800">
                  <strong>ملاحظة:</strong> لا يُعد طلب السحب مدفوعاً حتى يتم تسجيل تأكيد الدفع من مستخدم مالي مخول (PAY-03)
                </div>
                <h4 className="font-bold text-gray-800 mb-4">سجل السحب</h4>
                <div className="space-y-3">
                  <div className="border rounded-xl p-4 flex items-center justify-between">
                    <div><div className="font-medium text-gray-800">سحب #W-001</div><div className="text-sm text-gray-500">15 يناير 2025 | حوالة</div></div>
                    <div className="text-left"><div className="font-bold text-emerald-600">$50.00</div><span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">مدفوع — TRF-2025-001</span></div>
                  </div>
                  <div className="border rounded-xl p-4 flex items-center justify-between">
                    <div><div className="font-medium text-gray-800">سحب #W-002</div><div className="text-sm text-gray-500">5 يناير 2025 | حوالة</div></div>
                    <div className="text-left"><div className="font-bold text-emerald-600">$35.00</div><span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">مدفوع — TRF-2025-002</span></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
