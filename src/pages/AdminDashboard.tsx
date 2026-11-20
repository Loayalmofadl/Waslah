import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Store, Package, DollarSign, ShoppingCart, AlertTriangle, Check, X, Eye, Shield, TrendingUp, FileText, Clock } from 'lucide-react';
import WaslaLogo from '../components/WaslaLogo';
import { products, orders, marketers, merchants, platformStats, auditLogs, supportTickets, payoutRequests, commissionLifecycle } from '../data/mockData';
import type { OrderStatus, CommissionState } from '../data/mockData';

interface AdminDashboardProps { onNavigate: (page: any) => void; }

const orderStatusLabels: Record<OrderStatus, string> = {
  new: 'جديد', confirmed: 'مؤكد', preparing: 'قيد التجهيز', out_for_delivery: 'خرج للتوصيل',
  delivered: 'تم التسليم', cancelled: 'ملغى', delivery_failed: 'فشل التسليم', returned: 'مرتجع'
};
const orderStatusColors: Record<OrderStatus, string> = {
  new: 'bg-gray-100 text-gray-700', confirmed: 'bg-yellow-100 text-yellow-700', preparing: 'bg-blue-100 text-blue-700',
  out_for_delivery: 'bg-indigo-100 text-indigo-700', delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700', delivery_failed: 'bg-red-100 text-red-700', returned: 'bg-orange-100 text-orange-700'
};

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'merchants' | 'marketers' | 'orders' | 'commissions' | 'payouts' | 'audit' | 'tickets'>('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-wasla-navy text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('landing')} className="text-white/70 hover:text-white transition"><ArrowRight className="w-5 h-5" /></button>
            <WaslaLogo variant="full" theme="dark" size="sm" />
            <div className="h-8 w-px bg-white/20 mx-2"></div>
            <div><h1 className="text-base font-bold">لوحة الإدارة المركزية</h1><p className="text-xs text-white/60">التحكم والرقابة على المنصة</p></div>
          </div>
          <div className="flex items-center gap-2"><span className="text-sm text-white/70">المدير العام</span><div className="w-8 h-8 bg-wasla-teal/20 rounded-full flex items-center justify-center text-wasla-teal font-bold text-sm">م</div></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'GMV (إجمالي)', value: `$${platformStats.gmv}`, icon: <DollarSign className="w-5 h-5" />, color: 'bg-wasla-success/10 text-wasla-success' },
            { label: 'صافي المبيعات المؤهلة', value: `$${platformStats.netEligibleSales}`, icon: <TrendingUp className="w-5 h-5" />, color: 'bg-wasla-teal/10 text-wasla-teal-dark' },
            { label: 'رسوم المنصة', value: `$${platformStats.platformFees.toFixed(2)}`, icon: <FileText className="w-5 h-5" />, color: 'bg-wasla-gold/10 text-wasla-gold' },
            { label: 'معدل التسليم', value: `${platformStats.deliveryRate}%`, icon: <ShoppingCart className="w-5 h-5" />, color: 'bg-wasla-navy/5 text-wasla-navy' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-xl p-4 shadow-sm">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Alerts */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3"><div className="flex items-center gap-2 mb-1"><AlertTriangle className="w-4 h-4 text-yellow-600" /><span className="text-sm font-bold text-yellow-800">سحوبات معلقة</span></div><div className="text-xl font-bold text-yellow-700">{platformStats.pendingWithdrawals}</div></div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3"><div className="flex items-center gap-2 mb-1"><Package className="w-4 h-4 text-blue-600" /><span className="text-sm font-bold text-blue-800">منتجات للمراجعة</span></div><div className="text-xl font-bold text-blue-700">{platformStats.pendingApprovals}</div></div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-3"><div className="flex items-center gap-2 mb-1"><AlertTriangle className="w-4 h-4 text-red-600" /><span className="text-sm font-bold text-red-800">شكاوى مفتوحة</span></div><div className="text-xl font-bold text-red-700">{platformStats.openTickets}</div></div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-3"><div className="flex items-center gap-2 mb-1"><Clock className="w-4 h-4 text-orange-600" /><span className="text-sm font-bold text-orange-800">عمولات معلقة</span></div><div className="text-xl font-bold text-orange-700">${platformStats.pendingCommissions.toFixed(1)}</div></div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="flex border-b overflow-x-auto">
            {[
              { id: 'overview' as const, label: 'نظرة عامة', icon: <TrendingUp className="w-4 h-4" /> },
              { id: 'merchants' as const, label: 'التجار', icon: <Store className="w-4 h-4" /> },
              { id: 'marketers' as const, label: 'المسوقين', icon: <Users className="w-4 h-4" /> },
              { id: 'orders' as const, label: 'الطلبات', icon: <ShoppingCart className="w-4 h-4" /> },
              { id: 'commissions' as const, label: 'العمولات', icon: <DollarSign className="w-4 h-4" /> },
              { id: 'payouts' as const, label: 'السحوبات', icon: <FileText className="w-4 h-4" /> },
              { id: 'audit' as const, label: 'سجل التدقيق', icon: <Shield className="w-4 h-4" /> },
              { id: 'tickets' as const, label: 'الشكاوى', icon: <AlertTriangle className="w-4 h-4" /> },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-3 md:px-5 py-4 text-sm font-medium border-b-2 transition whitespace-nowrap ${activeTab === tab.id ? 'border-wasla-teal text-wasla-teal-dark' : 'border-transparent text-wasla-muted hover:text-wasla-navy'}`}>
                {tab.icon}{tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">نظرة عامة على المنصة</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                    <h4 className="text-sm text-purple-600 font-medium mb-4">توزيع العمولات حسب الحالة</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'معلقة', value: platformStats.pendingCommissions, color: 'bg-yellow-500' },
                        { label: 'مستحقة', value: platformStats.payableCommissions, color: 'bg-indigo-500' },
                        { label: 'مدفوعة', value: platformStats.paidCommissions, color: 'bg-emerald-500' },
                        { label: 'ملغاة/معكوسة', value: platformStats.reversedCommissions, color: 'bg-red-500' },
                      ].map(item => (
                        <div key={item.label}>
                          <div className="flex justify-between text-sm mb-1"><span className="text-gray-600">{item.label}</span><span className="font-medium">${item.value}</span></div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.value / platformStats.totalCommissions) * 100}%` }}></div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6">
                    <h4 className="text-sm text-emerald-600 font-medium mb-4">مؤشرات الأداء الرئيسية</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'معدل التحويل', value: `${platformStats.conversionRate}%` },
                        { label: 'معدل التسليم', value: `${platformStats.deliveryRate}%` },
                        { label: 'معدل الإرجاع', value: `${platformStats.returnRate}%` },
                        { label: 'المسوقين النشطين', value: platformStats.activeMarketers.toString() },
                      ].map(item => (
                        <div key={item.label} className="flex items-center justify-between"><span className="text-sm text-gray-600">{item.label}</span><span className="text-lg font-bold text-emerald-700">{item.value}</span></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-sm text-gray-600 font-medium mb-4">آخر نشاطات سجل التدقيق</h4>
                  <div className="space-y-3">
                    {auditLogs.slice(0, 5).map(log => (
                      <div key={log.id} className="flex items-center gap-3 text-sm">
                        <div className={`w-2 h-2 rounded-full ${log.actorRole === 'admin' ? 'bg-purple-500' : log.actorRole === 'finance' ? 'bg-emerald-500' : log.actorRole === 'support' ? 'bg-blue-500' : 'bg-gray-500'}`}></div>
                        <span className="text-gray-700 flex-1"><strong>{log.actorName}</strong> — {log.action.replace(/_/g, ' ')} ({log.entityType}: {log.entityId})</span>
                        <span className="text-gray-400 text-xs">{log.timestamp}</span>
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
                    <thead><tr className="bg-gray-50 text-gray-500"><th className="text-right p-3 rounded-r-lg">المتجر</th><th className="text-right p-3">المالك</th><th className="text-right p-3">المنتجات</th><th className="text-right p-3">المبيعات</th><th className="text-right p-3">معدل الإرجاع</th><th className="text-right p-3">الحالة</th><th className="text-right p-3 rounded-l-lg">إجراء</th></tr></thead>
                    <tbody>
                      {merchants.map(m => (
                        <tr key={m.id} className="border-b hover:bg-gray-50">
                          <td className="p-3"><div className="font-medium text-gray-800">{m.storeName}</div><div className="text-xs text-gray-400">{m.email}</div></td>
                          <td className="p-3">{m.name}</td>
                          <td className="p-3 font-medium">{m.totalProducts}</td>
                          <td className="p-3 font-medium text-emerald-600">${m.totalSales.toLocaleString()}</td>
                          <td className="p-3">{m.returnRate}%</td>
                          <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full ${m.status === 'active' ? 'bg-emerald-100 text-emerald-700' : m.status === 'pending_review' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{m.status === 'active' ? 'نشط' : m.status === 'pending_review' ? 'قيد المراجعة' : m.status === 'suspended' ? 'موقوف' : 'مرفوض'}</span></td>
                          <td className="p-3"><div className="flex items-center gap-1"><button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Eye className="w-3.5 h-3.5" /></button>{m.status === 'pending_review' && <><button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"><Check className="w-3.5 h-3.5" /></button><button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><X className="w-3.5 h-3.5" /></button></>}</div></td>
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
                    <thead><tr className="bg-gray-50 text-gray-500"><th className="text-right p-3 rounded-r-lg">الاسم</th><th className="text-right p-3">القنوات</th><th className="text-right p-3">النقرات</th><th className="text-right p-3">الطلبات</th><th className="text-right p-3">التحويل</th><th className="text-right p-3">الرصيد</th><th className="text-right p-3">الحالة</th><th className="text-right p-3 rounded-l-lg">إجراء</th></tr></thead>
                    <tbody>
                      {marketers.map(m => (
                        <tr key={m.id} className="border-b hover:bg-gray-50">
                          <td className="p-3"><div className="font-medium text-gray-800">{m.name}</div><div className="text-xs text-gray-400">{m.phone}</div></td>
                          <td className="p-3 text-xs">{m.channels.join('، ')}</td>
                          <td className="p-3 font-medium">{m.totalClicks.toLocaleString()}</td>
                          <td className="p-3 font-medium">{m.totalOrders}</td>
                          <td className="p-3 font-medium text-blue-600">{m.conversionRate}%</td>
                          <td className="p-3 font-medium text-emerald-600">${m.payableBalance.toFixed(1)}</td>
                          <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full ${m.status === 'active' ? 'bg-emerald-100 text-emerald-700' : m.status === 'pending_review' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{m.status === 'active' ? 'نشط' : m.status === 'pending_review' ? 'قيد المراجعة' : 'موقوف'}</span></td>
                          <td className="p-3"><div className="flex items-center gap-1"><button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Eye className="w-3.5 h-3.5" /></button>{m.status === 'pending_review' && <><button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"><Check className="w-3.5 h-3.5" /></button><button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><X className="w-3.5 h-3.5" /></button></>}</div></td>
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
                    <thead><tr className="bg-gray-50 text-gray-500"><th className="text-right p-3 rounded-r-lg">رقم الطلب</th><th className="text-right p-3">المنتج</th><th className="text-right p-3">التاجر</th><th className="text-right p-3">المسوّق</th><th className="text-right p-3">الإجمالي</th><th className="text-right p-3">العمولة</th><th className="text-right p-3">حالة الطلب</th><th className="text-right p-3 rounded-l-lg">حالة العمولة</th></tr></thead>
                    <tbody>
                      {orders.map(o => (
                        <tr key={o.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-mono text-xs">{o.publicOrderNo}</td>
                          <td className="p-3">{o.productName}</td>
                          <td className="p-3 text-blue-600 text-xs">{o.merchantName}</td>
                          <td className="p-3 text-emerald-600 text-xs">{o.marketerName}</td>
                          <td className="p-3 font-bold">${o.totalPrice}</td>
                          <td className="p-3 font-bold text-emerald-600">${o.commissionSnapshot}</td>
                          <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full ${orderStatusColors[o.orderStatus]}`}>{orderStatusLabels[o.orderStatus]}</span></td>
                          <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full ${commissionLifecycle.find(s => s.state === o.commissionState)?.color || 'bg-gray-100 text-gray-700'}`}>{commissionLifecycle.find(s => s.state === o.commissionState)?.label}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'commissions' && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">إدارة العمولات</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {commissionLifecycle.map(s => {
                    const count = orders.filter(o => o.commissionState === s.state).length;
                    const total = orders.filter(o => o.commissionState === s.state).reduce((sum, o) => sum + o.commissionSnapshot, 0);
                    return (
                      <div key={s.state} className={`${s.color} rounded-xl p-3`}>
                        <div className="text-xs opacity-80 mb-1">{s.label}</div>
                        <div className="text-xl font-bold">{count}</div>
                        <div className="text-xs opacity-80">${total.toFixed(2)}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                  <strong>قاعدة:</strong> لا يمكن إنشاء عمولتين نهائيتين للعنصر نفسه (COMM-06). كل تغيير حالة يُسجّل في سجل التدقيق.
                </div>
              </div>
            )}

            {activeTab === 'payouts' && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">طلبات السحب</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50 text-gray-500"><th className="text-right p-3 rounded-r-lg">الرقم</th><th className="text-right p-3">المسوّق</th><th className="text-right p-3">المبلغ</th><th className="text-right p-3">الحالة</th><th className="text-right p-3">طريقة الدفع</th><th className="text-right p-3">المرجع</th><th className="text-right p-3 rounded-l-lg">إجراء</th></tr></thead>
                    <tbody>
                      {payoutRequests.map(p => (
                        <tr key={p.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-mono text-xs">{p.id}</td>
                          <td className="p-3">{p.marketerName}</td>
                          <td className="p-3 font-bold text-emerald-600">${p.amount}</td>
                          <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full ${p.state === 'paid' ? 'bg-emerald-100 text-emerald-700' : p.state === 'pending' ? 'bg-yellow-100 text-yellow-700' : p.state === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{p.state === 'paid' ? 'مدفوع' : p.state === 'pending' ? 'معلق' : p.state === 'rejected' ? 'مرفوض' : 'معتمد'}</span></td>
                          <td className="p-3 text-xs">{p.paymentMethod || '—'}</td>
                          <td className="p-3 font-mono text-xs">{p.paymentReference || '—'}</td>
                          <td className="p-3">{p.state === 'pending' && <button className="px-3 py-1 bg-emerald-600 text-white text-xs rounded-lg hover:bg-emerald-700">تسجيل دفع</button>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'audit' && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">سجل التدقيق</h3>
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-4 text-sm text-indigo-800">
                  <strong>ملاحظة:</strong> كل تغيير مالي أو حالة مؤثرة يُسجّل مع الفاعل والتوقيت والسبب والقيم السابقة/اللاحقة (ADM-02)
                </div>
                <div className="space-y-3">
                  {auditLogs.map(log => (
                    <div key={log.id} className="border rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${log.actorRole === 'admin' ? 'bg-purple-100 text-purple-700' : log.actorRole === 'finance' ? 'bg-emerald-100 text-emerald-700' : log.actorRole === 'support' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{log.actorRole}</span>
                          <span className="font-medium text-gray-800">{log.actorName}</span>
                        </div>
                        <span className="text-xs text-gray-400">{log.timestamp}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>{log.action.replace(/_/g, ' ')}</strong> — {log.entityType}: <span className="font-mono">{log.entityId}</span>
                      </div>
                      {log.reason && <div className="text-xs text-gray-500 mt-1">السبب: {log.reason}</div>}
                      {(log.before || log.after) && (
                        <div className="flex gap-4 mt-2 text-xs">
                          {log.before && <div className="bg-red-50 px-2 py-1 rounded">قبل: {JSON.stringify(log.before)}</div>}
                          {log.after && <div className="bg-emerald-50 px-2 py-1 rounded">بعد: {JSON.stringify(log.after)}</div>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tickets' && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">الشكاوى والنزاعات</h3>
                <div className="space-y-4">
                  {supportTickets.map(ticket => (
                    <div key={ticket.id} className="border border-red-200 rounded-xl p-4 bg-red-50/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-600" /><span className="font-bold text-red-800">{ticket.id}</span><span className={`text-xs px-2 py-0.5 rounded-full ${ticket.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{ticket.priority === 'high' ? 'عالية' : 'متوسطة'}</span></div>
                        <span className={`text-xs px-2 py-1 rounded-full ${ticket.status === 'open' ? 'bg-red-100 text-red-700' : ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-emerald-100 text-emerald-700'}`}>{ticket.status === 'open' ? 'مفتوح' : ticket.status === 'in_progress' ? 'قيد المعالجة' : 'محلول'}</span>
                      </div>
                      <h4 className="font-medium text-gray-800 mb-2">{ticket.subject}</h4>
                      <div className="text-sm text-gray-600 mb-3">
                        <span>المشتكي: {ticket.requesterName}</span>
                        {ticket.orderId && <span className="mx-2">| الطلب: {ticket.orderId}</span>}
                        <span className="mx-2">| الفئة: {ticket.category}</span>
                      </div>
                      <div className="bg-white rounded-lg p-3 mb-3 space-y-2">
                        {ticket.messages.map(msg => (
                          <div key={msg.id} className="text-sm"><strong className="text-gray-700">{msg.senderName}:</strong> <span className="text-gray-600">{msg.content}</span><span className="text-xs text-gray-400 mr-2">{msg.createdAt}</span></div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-emerald-600 text-white text-xs rounded-lg hover:bg-emerald-700">لصالح المسوّق</button>
                        <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">لصالح التاجر</button>
                        <button className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-300">طلب مستندات</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
