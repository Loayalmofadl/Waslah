import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, DollarSign, TrendingUp, Eye, ShoppingCart, Copy, Check, Search, Filter, Download, Wallet } from 'lucide-react';
import { products, orders } from '../data/mockData';

interface MarketerDashboardProps {
  onNavigate: (page: 'landing' | 'merchant' | 'marketer' | 'admin' | 'product') => void;
  onProductClick: (productId: string) => void;
}

export default function MarketerDashboard({ onNavigate, onProductClick }: MarketerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'catalog' | 'mylinks' | 'earnings' | 'withdrawals'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const marketerOrders = orders.filter(o => o.marketerId === 'AF001');
  const totalEarnings = marketerOrders.reduce((sum, o) => sum + o.commission, 0);
  const pendingEarnings = marketerOrders.filter(o => o.commissionStatus === 'pending').reduce((sum, o) => sum + o.commission, 0);
  const approvedEarnings = marketerOrders.filter(o => o.commissionStatus === 'approved' || o.commissionStatus === 'paid').reduce((sum, o) => sum + o.commission, 0);

  const categories = ['all', ...new Set(products.map(p => p.category))];
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.includes(searchQuery) || p.description.includes(searchQuery);
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory && p.status === 'active';
  });

  const copyLink = (productId: string) => {
    const link = `sooqiqa.com/p/${productId}?ref=AF001`;
    navigator.clipboard.writeText(link).catch(() => {});
    setCopiedId(productId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('landing')} className="text-gray-500 hover:text-gray-700">
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">لوحة المسوّق</h1>
              <p className="text-xs text-gray-500">أحمد محمد</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-emerald-50 px-3 py-1.5 rounded-lg">
              <span className="text-xs text-gray-500">رصيدك: </span>
              <span className="font-bold text-emerald-600">${approvedEarnings.toFixed(2)}</span>
            </div>
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-sm">أ</div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'النقرات', value: '5,400', icon: <Eye className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600' },
            { label: 'الطلبات', value: marketerOrders.length.toString(), icon: <ShoppingCart className="w-5 h-5" />, color: 'bg-purple-50 text-purple-600' },
            { label: 'الأرباح الكلية', value: `$${totalEarnings.toFixed(1)}`, icon: <DollarSign className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-600' },
            { label: 'قيد الاعتماد', value: `$${pendingEarnings.toFixed(1)}`, icon: <Wallet className="w-5 h-5" />, color: 'bg-orange-50 text-orange-600' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm"
            >
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="flex border-b overflow-x-auto">
            {[
              { id: 'catalog' as const, label: 'كتالوج المنتجات', icon: <ShoppingCart className="w-4 h-4" /> },
              { id: 'mylinks' as const, label: 'روابطي', icon: <Copy className="w-4 h-4" /> },
              { id: 'earnings' as const, label: 'أرباحي', icon: <DollarSign className="w-4 h-4" /> },
              { id: 'withdrawals' as const, label: 'سحب الأرباح', icon: <Wallet className="w-4 h-4" /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'catalog' && (
              <div>
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full border rounded-lg pr-10 pl-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                      placeholder="ابحث عن منتج..."
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat === 'all' ? 'جميع الفئات' : cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.map(product => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="border rounded-xl p-4 hover:shadow-lg transition group"
                    >
                      <div className="text-center mb-3">
                        <span className="text-5xl">{product.image}</span>
                      </div>
                      <h4 className="font-bold text-gray-800 text-center mb-2">{product.name}</h4>
                      <p className="text-xs text-gray-500 text-center mb-3 line-clamp-2">{product.description}</p>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-blue-50 rounded-lg p-2 text-center">
                          <div className="text-xs text-gray-500">السعر</div>
                          <div className="font-bold text-blue-600">${product.price}</div>
                        </div>
                        <div className="bg-emerald-50 rounded-lg p-2 text-center">
                          <div className="text-xs text-gray-500">عمولتك</div>
                          <div className="font-bold text-emerald-600">${product.commission}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 text-center mb-3">
                        {product.commissionType === 'percentage' ? `${(product.commission / product.price * 100).toFixed(0)}% من السعر` : 'مبلغ ثابت'}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyLink(product.id)}
                          className="flex-1 flex items-center justify-center gap-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                        >
                          {copiedId === product.id ? (
                            <><Check className="w-3.5 h-3.5 text-emerald-500" /> تم النسخ</>
                          ) : (
                            <><Copy className="w-3.5 h-3.5" /> نسخ الرابط</>
                          )}
                        </button>
                        <button
                          onClick={() => onProductClick(product.id)}
                          className="flex-1 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-medium"
                        >
                          سوّق هذا
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'mylinks' && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">روابطي التسويقية</h3>
                <div className="space-y-3">
                  {products.slice(0, 5).map(product => (
                    <div key={product.id} className="border rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{product.image}</span>
                          <div>
                            <h4 className="font-medium text-gray-800">{product.name}</h4>
                            <p className="text-xs text-gray-500">{product.merchantName}</p>
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-bold text-emerald-600">${product.commission}</div>
                          <div className="text-xs text-gray-400">لكل عملية بيع</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 flex items-center justify-between">
                        <code className="text-xs text-gray-600 font-mono">sooqiqa.com/p/{product.id}?ref=AF001</code>
                        <button
                          onClick={() => copyLink(product.id)}
                          className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                          {copiedId === product.id ? '✓ تم' : 'نسخ'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'earnings' && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">سجل الأرباح</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500">
                        <th className="text-right p-3 rounded-r-lg">رقم الطلب</th>
                        <th className="text-right p-3">المنتج</th>
                        <th className="text-right p-3">التاريخ</th>
                        <th className="text-right p-3">العمولة</th>
                        <th className="text-right p-3">الحالة</th>
                        <th className="text-right p-3 rounded-l-lg">المصدر</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketerOrders.map(order => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-mono text-xs">{order.id}</td>
                          <td className="p-3">{order.productName}</td>
                          <td className="p-3 text-gray-500">{order.date}</td>
                          <td className="p-3 font-bold text-emerald-600">${order.commission}</td>
                          <td className="p-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              order.commissionStatus === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                              order.commissionStatus === 'approved' ? 'bg-blue-100 text-blue-700' :
                              order.commissionStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {order.commissionStatus === 'paid' ? 'مدفوعة' :
                               order.commissionStatus === 'approved' ? 'معتمدة' :
                               order.commissionStatus === 'pending' ? 'معلقة' : 'مرفوضة'}
                            </span>
                          </td>
                          <td className="p-3 text-xs">
                            {order.source === 'link' ? '🔗' : order.source === 'whatsapp' ? '💬' : '📞'}
                          </td>
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
                  <div className="text-sm text-gray-600 mb-1">الرصيد المتاح للسحب</div>
                  <div className="text-4xl font-bold text-emerald-700 mb-4">${approvedEarnings.toFixed(2)}</div>
                  <button className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition">
                    <Wallet className="w-4 h-4 inline ml-2" />
                    طلب سحب الأرباح
                  </button>
                </div>
                <h4 className="font-bold text-gray-800 mb-4">سجل السحب</h4>
                <div className="space-y-3">
                  <div className="border rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800">سحب #W-001</div>
                      <div className="text-sm text-gray-500">15 يناير 2025</div>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-emerald-600">$50.00</div>
                      <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">تم التحويل</span>
                    </div>
                  </div>
                  <div className="border rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800">سحب #W-002</div>
                      <div className="text-sm text-gray-500">5 يناير 2025</div>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-emerald-600">$35.00</div>
                      <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">تم التحويل</span>
                    </div>
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
