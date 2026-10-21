import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Package, DollarSign, TrendingUp, Eye, ShoppingCart, AlertCircle, Plus, Edit, Eye as EyeIcon, X } from 'lucide-react';
import { products, orders } from '../data/mockData';

interface MerchantDashboardProps {
  onNavigate: (page: 'landing' | 'merchant' | 'marketer' | 'admin' | 'product') => void;
  onProductClick: (productId: string) => void;
}

export default function MerchantDashboard({ onNavigate, onProductClick }: MerchantDashboardProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'commissions' | 'analytics'>('products');
  const [showAddProduct, setShowAddProduct] = useState(false);

  const merchantProducts = products.filter(p => p.merchantId === 'M001');
  const merchantOrders = orders.filter(o => o.merchantId === 'M001');
  const totalSales = merchantOrders.reduce((sum, o) => sum + o.price, 0);
  const totalCommissions = merchantOrders.reduce((sum, o) => sum + o.commission, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('landing')} className="text-gray-500 hover:text-gray-700">
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">لوحة التاجر</h1>
              <p className="text-xs text-gray-500">متجر التقنية الحديثة</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">مرحباً، محمد</span>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">م</div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'المنتجات', value: merchantProducts.length, icon: <Package className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600' },
            { label: 'المبيعات', value: `$${totalSales.toLocaleString()}`, icon: <DollarSign className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-600' },
            { label: 'العمولات المدفوعة', value: `$${totalCommissions.toFixed(1)}`, icon: <TrendingUp className="w-5 h-5" />, color: 'bg-purple-50 text-purple-600' },
            { label: 'الطلبات', value: merchantOrders.length, icon: <ShoppingCart className="w-5 h-5" />, color: 'bg-orange-50 text-orange-600' },
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
              { id: 'products' as const, label: 'المنتجات', icon: <Package className="w-4 h-4" /> },
              { id: 'orders' as const, label: 'الطلبات', icon: <ShoppingCart className="w-4 h-4" /> },
              { id: 'commissions' as const, label: 'العمولات', icon: <DollarSign className="w-4 h-4" /> },
              { id: 'analytics' as const, label: 'الإحصائيات', icon: <Eye className="w-4 h-4" /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'products' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">إدارة المنتجات</h3>
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة منتج
                  </button>
                </div>
                <div className="grid gap-4">
                  {merchantProducts.map(product => (
                    <div key={product.id} className="border rounded-xl p-4 hover:shadow-md transition">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{product.image}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-gray-800">{product.name}</h4>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              product.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                              product.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {product.status === 'active' ? 'نشط' : product.status === 'pending' ? 'قيد المراجعة' : 'متوقف'}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>السعر: <strong className="text-gray-700">${product.price}</strong></span>
                            <span>العمولة: <strong className="text-emerald-600">${product.commission}</strong></span>
                            <span>المخزون: <strong className="text-gray-700">{product.stock}</strong></span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                            <span><EyeIcon className="w-3 h-3 inline" /> {product.clicks} نقرة</span>
                            <span><ShoppingCart className="w-3 h-3 inline" /> {product.orders} طلب</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => onProductClick(product.id)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">الطلبات الواردة</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500">
                        <th className="text-right p-3 rounded-r-lg">رقم الطلب</th>
                        <th className="text-right p-3">المنتج</th>
                        <th className="text-right p-3">المسوّق</th>
                        <th className="text-right p-3">العميل</th>
                        <th className="text-right p-3">السعر</th>
                        <th className="text-right p-3">الحالة</th>
                        <th className="text-right p-3 rounded-l-lg">المصدر</th>
                      </tr>
                    </thead>
                    <tbody>
                      {merchantOrders.map(order => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-mono text-xs">{order.id}</td>
                          <td className="p-3">{order.productName}</td>
                          <td className="p-3 text-blue-600">{order.marketerName}</td>
                          <td className="p-3">{order.customerName}</td>
                          <td className="p-3 font-bold">${order.price}</td>
                          <td className="p-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              order.orderStatus === 'delivered' ? 'bg-emerald-100 text-emerald-700' :
                              order.orderStatus === 'shipping' ? 'bg-blue-100 text-blue-700' :
                              order.orderStatus === 'new' ? 'bg-gray-100 text-gray-700' :
                              order.orderStatus === 'confirmed' ? 'bg-yellow-100 text-yellow-700' :
                              order.orderStatus === 'returned' ? 'bg-red-100 text-red-700' :
                              'bg-red-50 text-red-600'
                            }`}>
                              {order.orderStatus === 'delivered' ? 'تم التسليم' :
                               order.orderStatus === 'shipping' ? 'قيد التوصيل' :
                               order.orderStatus === 'new' ? 'جديد' :
                               order.orderStatus === 'confirmed' ? 'مؤكد' :
                               order.orderStatus === 'returned' ? 'مرتجع' : 'ملغى'}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="text-xs">
                              {order.source === 'link' ? '🔗 رابط' : order.source === 'whatsapp' ? '💬 واتساب' : '📞 هاتف'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'commissions' && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">العمولات المستحقة للمسوقين</h3>
                <div className="grid gap-3">
                  {merchantOrders.map(order => (
                    <div key={order.id} className="flex items-center justify-between border rounded-xl p-4">
                      <div>
                        <div className="font-medium text-gray-800">{order.productName}</div>
                        <div className="text-sm text-gray-500">المسوّق: {order.marketerName} | العميل: {order.customerName}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-left">
                          <div className="font-bold text-emerald-600">${order.commission}</div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            order.commissionStatus === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                            order.commissionStatus === 'approved' ? 'bg-blue-100 text-blue-700' :
                            order.commissionStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {order.commissionStatus === 'paid' ? 'مدفوعة' :
                             order.commissionStatus === 'approved' ? 'معتمدة' :
                             order.commissionStatus === 'pending' ? 'معلقة' : 'مرفوضة'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">إحصائيات المتجر</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                    <h4 className="text-sm text-blue-600 font-medium mb-2">إجمالي النقرات</h4>
                    <div className="text-3xl font-bold text-blue-800">{merchantProducts.reduce((s, p) => s + p.clicks, 0).toLocaleString()}</div>
                    <div className="text-sm text-blue-600 mt-1">+12% هذا الأسبوع</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6">
                    <h4 className="text-sm text-emerald-600 font-medium mb-2">معدل التحويل</h4>
                    <div className="text-3xl font-bold text-emerald-800">
                      {((merchantOrders.length / merchantProducts.reduce((s, p) => s + p.clicks, 0)) * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-emerald-600 mt-1">من النقرات إلى طلبات</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                    <h4 className="text-sm text-purple-600 font-medium mb-2">عدد المسوقين النشطين</h4>
                    <div className="text-3xl font-bold text-purple-800">
                      {new Set(merchantOrders.map(o => o.marketerId)).size}
                    </div>
                    <div className="text-sm text-purple-600 mt-1">مسوّق يروّج لمنتجاتك</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
                    <h4 className="text-sm text-orange-600 font-medium mb-2">متوسط قيمة الطلب</h4>
                    <div className="text-3xl font-bold text-orange-800">
                      ${(totalSales / merchantOrders.length).toFixed(1)}
                    </div>
                    <div className="text-sm text-orange-600 mt-1">لكل طلب مكتمل</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">إضافة منتج جديد</h3>
              <button onClick={() => setShowAddProduct(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">اسم المنتج</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="أدخل اسم المنتج" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">الوصف</label>
                <textarea className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" rows={3} placeholder="وصف تفصيلي للمنتج" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">السعر ($)</label>
                  <input type="number" className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="0.00" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">المخزون</label>
                  <input type="number" className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">العمولة</label>
                  <input type="number" className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="0" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">نوع العمولة</label>
                  <select className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                    <option>نسبة مئوية (%)</option>
                    <option>مبلغ ثابت ($)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">الفئة</label>
                <select className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                  <option>إلكترونيات</option>
                  <option>عطور</option>
                  <option>ملابس</option>
                  <option>منزلية</option>
                  <option>عناية شخصية</option>
                </select>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <AlertCircle className="w-4 h-4" />
                <span>سيتم مراجعة المنتج من الإدارة قبل نشره</span>
              </div>
              <button
                onClick={() => setShowAddProduct(false)}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
              >
                إضافة المنتج
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
