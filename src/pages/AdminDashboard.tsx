import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Store, Package, DollarSign, ShoppingCart, AlertTriangle, Check, X, Eye, Shield, TrendingUp } from 'lucide-react';
import { products, orders, marketers, merchants, platformStats } from '../data/mockData';

interface AdminDashboardProps {
  onNavigate: (page: 'landing' | 'merchant' | 'marketer' | 'admin' | 'product') => void;
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'merchants' | 'marketers' | 'orders' | 'products' | 'disputes'>('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-l from-purple-700 to-purple-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('landing')} className="text-purple-200 hover:text-white">
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">لوحة الإدارة المركزية</h1>
              <p className="text-xs text-purple-200">التحكم والرقابة على المنصة</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-purple-200">المدير العام</span>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm">م</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'إجمالي المبيعات', value: `$${platformStats.totalSales.toLocaleString()}`, icon: <DollarSign className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-600', change: '+18%' },
            { label: 'رسوم المنصة', value: `$${platformStats.platformFees.toLocaleString()}`, icon: <TrendingUp className="w-5 h-5" />, color: 'bg-purple-50 text-purple-600', change: '+12%' },
            { label: 'التجار', value: platformStats.totalMerchants.toString(), icon: <Store className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600', change: '+2' },
            { label: 'المسوقين', value: platformStats.totalMarketers.toString(), icon: <Users className="w-5 h-5" />, color: 'bg-orange-50 text-orange-600', change: '+3' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  {stat.icon}
                </div>
                <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Alert Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-bold text-yellow-800">طلبات سحب معلقة</span>
            </div>
            <div className="text-2xl font-bold text-yellow-700">{platformStats.pendingWithdrawals}</div>
            <p className="text-xs text-yellow-600 mt-1">بحاجة لمراجعة ومعالجة</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-blue-800">منتجات قيد المراجعة</span>
            </div>
            <div className="text-2xl font-bold text-blue-700">{platformStats.pendingApprovals}</div>
            <p className="text-xs text-blue-600 mt-1">بانتظار موافقة الإدارة</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-bold text-red-800">شكاوى ونزاعات</span>
            </div>
            <div className="text-2xl font-bold text-red-700">1</div>
            <p className="text-xs text-red-600 mt-1">بحاجة لحل</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="flex border-b overflow-x-auto">
            {[
              { id: 'overview' as const, label: 'نظرة عامة', icon: <TrendingUp className="w-4 h-4" /> },
              { id: 'merchants' as const, label: 'التجار', icon: <Store className="w-4 h-4" /> },
              { id: 'marketers' as const, label: 'المسوقين', icon: <Users className="w-4 h-4" /> },
              { id: 'orders' as const, label: 'الطلبات', icon: <ShoppingCart className="w-4 h-4" /> },
              { id: 'products' as const, label: 'المنتجات', icon: <Package className="w-4 h-4" /> },
              { id: 'disputes' as const, label: 'الشكاوى', icon: <AlertTriangle className="w-4 h-4" /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 md:px-6 py-4 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">نظرة عامة على المنصة</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                    <h4 className="text-sm text-purple-600 font-medium mb-4">توزيع الطلبات حسب المصدر</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'روابط مباشرة', value: 60, color: 'bg-blue-500' },
                        { label: 'واتساب', value: 25, color: 'bg-green-500' },
                        { label: 'هاتف', value: 15, color: 'bg-orange-500' },
                      ].map(item => (
                        <div key={item.label}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">{item.label}</span>
                            <span className="font-medium">{item.value}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6">
                    <h4 className="text-sm text-emerald-600 font-medium mb-4">حالة العمولات</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'مدفوعة', value: 35, count: 2, color: 'bg-emerald-500' },
                        { label: 'معتمدة', value: 25, count: 2, color: 'bg-blue-500' },
                        { label: 'معلقة', value: 30, count: 3, color: 'bg-yellow-500' },
                        { label: 'مرفوضة', value: 10, count: 1, color: 'bg-red-500' },
                      ].map(item => (
                        <div key={item.label} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                            <span className="text-sm text-gray-600">{item.label} ({item.count})</span>
                          </div>
                          <span className="text-sm font-medium">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 rounded-xl p-6">
                  <h4 className="text-sm text-gray-600 font-medium mb-4">آخر النشاطات</h4>
                  <div className="space-y-3">
                    {[
                      { text: 'تم تسجيل طلب جديد ORD-008', time: 'منذ 5 دقائق', type: 'order' },
                      { text: 'المسوّق أحمد محمد طلب سحب $45.50', time: 'منذ ساعة', type: 'withdrawal' },
                      { text: 'تم اعتماد عمولة الطلب ORD-001', time: 'منذ 3 ساعات', type: 'commission' },
                      { text: 'تاجر جديد "متجر المنزل" في انتظار المراجعة', time: 'منذ 5 ساعات', type: 'merchant' },
                      { text: 'تم تأكيد تسليم الطلب ORD-002', time: 'منذ يوم', type: 'delivery' },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'order' ? 'bg-blue-500' :
                          activity.type === 'withdrawal' ? 'bg-orange-500' :
                          activity.type === 'commission' ? 'bg-emerald-500' :
                          activity.type === 'merchant' ? 'bg-purple-500' :
                          'bg-teal-500'
                        }`}></div>
                        <span className="text-gray-700 flex-1">{activity.text}</span>
                        <span className="text-gray-400 text-xs">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'merchants' && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">إدارة التجار</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500">
                        <th className="text-right p-3 rounded-r-lg">المتجر</th>
                        <th className="text-right p-3">المالك</th>
                        <th className="text-right p-3">المنتجات</th>
                        <th className="text-right p-3">المبيعات</th>
                        <th className="text-right p-3">العمولات</th>
                        <th className="text-right p-3">الحالة</th>
                        <th className="text-right p-3 rounded-l-lg">إجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {merchants.map(merchant => (
                        <tr key={merchant.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div className="font-medium text-gray-800">{merchant.storeName}</div>
                            <div className="text-xs text-gray-400">{merchant.email}</div>
                          </td>
                          <td className="p-3">{merchant.name}</td>
                          <td className="p-3 font-medium">{merchant.totalProducts}</td>
                          <td className="p-3 font-medium text-emerald-600">${merchant.totalSales.toLocaleString()}</td>
                          <td className="p-3 font-medium text-purple-600">${merchant.totalCommissionPaid}</td>
                          <td className="p-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              merchant.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                              merchant.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {merchant.status === 'active' ? 'نشط' : merchant.status === 'pending' ? 'قيد المراجعة' : 'موقوف'}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              {merchant.status === 'pending' && (
                                <>
                                  <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition">
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'marketers' && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">إدارة المسوقين</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500">
                        <th className="text-right p-3 rounded-r-lg">الاسم</th>
                        <th className="text-right p-3">النقرات</th>
                        <th className="text-right p-3">الطلبات</th>
                        <th className="text-right p-3">الأرباح</th>
                        <th className="text-right p-3">الرصيد</th>
                        <th className="text-right p-3">الحالة</th>
                        <th className="text-right p-3 rounded-l-lg">إجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketers.map(marketer => (
                        <tr key={marketer.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div className="font-medium text-gray-800">{marketer.name}</div>
                            <div className="text-xs text-gray-400">{marketer.phone}</div>
                          </td>
                          <td className="p-3 font-medium">{marketer.totalClicks.toLocaleString()}</td>
                          <td className="p-3 font-medium">{marketer.totalOrders}</td>
                          <td className="p-3 font-medium text-emerald-600">${marketer.totalEarnings.toFixed(1)}</td>
                          <td className="p-3 font-medium">${marketer.balance.toFixed(1)}</td>
                          <td className="p-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              marketer.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                              marketer.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {marketer.status === 'active' ? 'نشط' : marketer.status === 'pending' ? 'قيد المراجعة' : 'موقوف'}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              {marketer.status === 'pending' && (
                                <>
                                  <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition">
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">جميع الطلبات</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500">
                        <th className="text-right p-3 rounded-r-lg">رقم الطلب</th>
                        <th className="text-right p-3">المنتج</th>
                        <th className="text-right p-3">التاجر</th>
                        <th className="text-right p-3">المسوّق</th>
                        <th className="text-right p-3">السعر</th>
                        <th className="text-right p-3">العمولة</th>
                        <th className="text-right p-3">حالة الطلب</th>
                        <th className="text-right p-3 rounded-l-lg">حالة العمولة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-mono text-xs">{order.id}</td>
                          <td className="p-3">{order.productName}</td>
                          <td className="p-3 text-blue-600 text-xs">{order.merchantName}</td>
                          <td className="p-3 text-emerald-600 text-xs">{order.marketerName}</td>
                          <td className="p-3 font-bold">${order.price}</td>
                          <td className="p-3 font-bold text-emerald-600">${order.commission}</td>
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">مراجعة المنتجات</h3>
                <div className="grid gap-4">
                  {products.map(product => (
                    <div key={product.id} className="border rounded-xl p-4 flex items-center gap-4">
                      <div className="text-3xl">{product.image}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-800">{product.name}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            product.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                            product.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {product.status === 'active' ? 'منشور' : product.status === 'pending' ? 'قيد المراجعة' : 'متوقف'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.merchantName} | ${product.price} | عمولة ${product.commission}
                        </div>
                      </div>
                      {product.status === 'pending' && (
                        <div className="flex items-center gap-2">
                          <button className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition">
                            <Check className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'disputes' && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">الشكاوى والنزاعات</h3>
                <div className="space-y-4">
                  <div className="border border-red-200 rounded-xl p-4 bg-red-50/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="font-bold text-red-800">نزاع #D-001</span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">مفتوح</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      المسوّق "هدى عبدالله" يدّعي أن الطلب ORD-006 تم تسليمه بنجاح لكن التاجر أكد أنه مرتجع.
                      العمولة المعلقة: $2.50
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span>التاجر: دار العطور العربية</span>
                      <span>المسوّق: هدى عبدالله</span>
                      <span>التاريخ: 2025-01-12</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition">
                        لصالح المسوّق
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                        لصالح التاجر
                      </button>
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition">
                        طلب مستندات إضافية
                      </button>
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
