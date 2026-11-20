import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, Check, Share2, Download, MessageCircle, Facebook, Link2, Eye, ShoppingCart, TrendingUp, Clock, Shield, Truck, RotateCcw, FileText } from 'lucide-react';
import WaslaLogo from '../components/WaslaLogo';
import { products, commissionLifecycle } from '../data/mockData';

interface ProductPageProps { productId: string | null; onBack: () => void; }

export default function ProductPage({ productId, onBack }: ProductPageProps) {
  const [copied, setCopied] = useState(false);
  const [activeShareTab, setActiveShareTab] = useState<'link' | 'whatsapp' | 'facebook'>('link');
  const product = products.find(p => p.id === productId) || products[0];
  const affiliateLink = `wasla.ye/p/${product.id}?ref=AF001`;
  const whatsappMessage = encodeURIComponent(`🛍️ ${product.name}\n💰 السعر: $${product.price}\n🔗 اطلب الآن: ${affiliateLink}`);
  const whatsappLink = `https://wa.me/?text=${whatsappMessage}`;

  const copyLink = () => {
    navigator.clipboard.writeText(affiliateLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-wasla-muted hover:text-wasla-navy transition"><ArrowRight className="w-5 h-5" /></button>
            <WaslaLogo variant="full" size="sm" />
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <div><h1 className="text-base font-bold text-wasla-navy">صفحة المنتج</h1><p className="text-xs text-wasla-muted">أدوات التسويق والإسناد</p></div>
          </div>
          <div className="flex items-center gap-2"><span className="text-sm text-wasla-muted">المسوّق: أحمد محمد</span><div className="w-8 h-8 bg-wasla-teal/10 rounded-full flex items-center justify-center text-wasla-teal-dark font-bold text-sm">أ</div></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-24">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 text-center"><span className="text-8xl">{product.image}</span></div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-sm text-gray-500 mb-3">{product.description}</p>
                <div className="text-xs text-gray-400 mb-4">
                  <span>المتجر: {product.merchantName}</span><span className="mx-2">|</span><span>الفئة: {product.category}</span>
                  {product.sku && <><span className="mx-2">|</span><span className="font-mono">SKU: {product.sku}</span></>}
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-blue-50 rounded-xl p-3 text-center"><div className="text-xs text-gray-500">سعر البيع</div><div className="text-xl font-bold text-blue-600">${product.price}</div></div>
                  <div className="bg-emerald-50 rounded-xl p-3 text-center"><div className="text-xs text-gray-500">عمولتك</div><div className="text-xl font-bold text-emerald-600">${product.commission}</div></div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center mb-4">
                  <div className="text-xs text-gray-500">قاعدة العمولة</div>
                  <div className="text-sm font-bold text-purple-600">
                    {product.commissionType === 'percentage' ? `${((product.commission / product.price) * 100).toFixed(1)}%` : `$${product.commission} ثابت`}
                    {' '}من {product.commissionBasis === 'product_value' ? 'قيمة المنتج' : 'قيمة الطلب'}
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600"><Truck className="w-4 h-4 text-blue-500" /><span>التوصيل: {product.deliveryTime}</span></div>
                  <div className="flex items-center gap-2 text-sm text-gray-600"><RotateCcw className="w-4 h-4 text-orange-500" /><span>{product.returnPolicy}</span></div>
                  <div className="flex items-center gap-2 text-sm text-gray-600"><Shield className="w-4 h-4 text-emerald-500" /><span>المخزون: {product.stock} قطعة</span></div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-50 rounded-lg p-2"><Eye className="w-4 h-4 text-gray-400 mx-auto mb-1" /><div className="text-sm font-bold text-gray-700">{product.clicks.toLocaleString()}</div><div className="text-xs text-gray-400">نقرة</div></div>
                  <div className="bg-gray-50 rounded-lg p-2"><ShoppingCart className="w-4 h-4 text-gray-400 mx-auto mb-1" /><div className="text-sm font-bold text-gray-700">{product.orders}</div><div className="text-xs text-gray-400">طلب</div></div>
                  <div className="bg-gray-50 rounded-lg p-2"><TrendingUp className="w-4 h-4 text-gray-400 mx-auto mb-1" /><div className="text-sm font-bold text-gray-700">${product.sales.toLocaleString()}</div><div className="text-xs text-gray-400">مبيعات</div></div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {/* Affiliate Link */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4"><Link2 className="w-5 h-5 text-indigo-600" /><h3 className="text-lg font-bold text-gray-800">رابط الإحالة الفريد</h3></div>
              <div className="bg-wasla-navy rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <code className="text-wasla-teal text-sm font-mono break-all" dir="ltr">{affiliateLink}</code>
                  <button onClick={copyLink} className="flex items-center gap-1 px-3 py-1.5 bg-wasla-teal text-wasla-navy rounded-lg hover:bg-wasla-teal/90 transition text-sm font-bold whitespace-nowrap mr-4">
                    {copied ? <><Check className="w-3.5 h-3.5" /> تم النسخ</> : <><Copy className="w-3.5 h-3.5" /> نسخ</>}
                  </button>
                </div>
              </div>
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 flex items-start gap-2">
                <Shield className="w-4 h-4 text-indigo-600 mt-0.5" />
                <div className="text-sm text-indigo-800">
                  <strong>TRACK-03:</strong> يُحفظ رمز الإحالة بشكل خادمي موقّع عند فتح الرابط. لا يعتمد على قيمة يرسلها العميل.
                  <br /><strong>TRACK-06:</strong> تُثبت هوية المسوق داخل سجل الطلب عند إنشائه، ولا يعاد تغييرها تلقائياً عند زيارة لاحقة.
                </div>
              </div>
            </motion.div>

            {/* Share Options */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4"><Share2 className="w-5 h-5 text-blue-600" /><h3 className="text-lg font-bold text-gray-800">مشاركة المنتج</h3></div>
              <div className="flex border-b mb-4">
                {[
                  { id: 'link' as const, label: 'نسخ الرابط', icon: <Link2 className="w-4 h-4" /> },
                  { id: 'whatsapp' as const, label: 'واتساب', icon: <MessageCircle className="w-4 h-4" /> },
                  { id: 'facebook' as const, label: 'فيسبوك', icon: <Facebook className="w-4 h-4" /> },
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActiveShareTab(tab.id)} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition ${activeShareTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                    {tab.icon}{tab.label}
                  </button>
                ))}
              </div>
              {activeShareTab === 'link' && (
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-xl p-4"><code className="text-sm text-gray-700 break-all">{affiliateLink}</code></div>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={copyLink} className="flex items-center justify-center gap-2 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition font-medium"><Copy className="w-4 h-4" />نسخ الرابط</button>
                    <button className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"><Share2 className="w-4 h-4" />مشاركة</button>
                  </div>
                </div>
              )}
              {activeShareTab === 'whatsapp' && (
                <div className="space-y-3">
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <p className="text-sm text-gray-800 leading-relaxed">🛍️ <strong>{product.name}</strong><br />💰 السعر: <strong>${product.price}</strong><br />📦 التوصيل: {product.deliveryTime}<br />🔗 اطلب الآن: {affiliateLink}</p>
                  </div>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium w-full"><MessageCircle className="w-4 h-4" />فتح واتساب</a>
                </div>
              )}
              {activeShareTab === 'facebook' && (
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-gray-800 leading-relaxed">🎯 عرض مميز!<br /><strong>{product.name}</strong> بسعر {product.price}$ فقط!<br />📦 توصيل: {product.deliveryTime}<br />🔗 {affiliateLink}</p>
                  </div>
                  <button className="flex items-center justify-center gap-2 py-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition font-medium w-full"><Facebook className="w-4 h-4" />مشاركة على فيسبوك</button>
                </div>
              )}
            </motion.div>

            {/* Commission Lifecycle */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">دورة حياة عمولتك على هذا المنتج</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {commissionLifecycle.map((s, i) => (
                  <div key={s.state} className={`${s.color} rounded-lg p-2 text-center`}>
                    <div className="text-xs font-bold">{i + 1}. {s.label}</div>
                    <div className="text-xs opacity-70 mt-0.5">{s.description}</div>
                  </div>
                ))}
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-800">
                <strong>COMM-04:</strong> تبدأ العمولة معلقة، ثم تعتمد بعد التسليم ومرور سياسة الإرجاع: <em>{product.returnPolicy}</em>
              </div>
            </motion.div>

            {/* Attribution Rules */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">قواعد الإسناد</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3"><div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm shrink-0">1</div><div><h4 className="font-medium text-gray-800">فتح الرابط</h4><p className="text-sm text-gray-500">يُتحقق الخادم من المعرف ويُصدر رمز إحالة موقّع (TRACK-03)</p></div></div>
                <div className="flex items-start gap-3"><div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">2</div><div><h4 className="font-medium text-gray-800">نافذة الإسناد: 30 يوماً</h4><p className="text-sm text-gray-500">آخر نقرة صالحة لنفس التاجر خلال 30 يوماً هي المعتمدة (TRACK-04)</p></div></div>
                <div className="flex items-start gap-3"><div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-sm shrink-0">3</div><div><h4 className="font-medium text-gray-800">إنشاء الطلب</h4><p className="text-sm text-gray-500">تُنقل الإحالة إلى سجل الطلب مع لقطة السعر والعمولة (TRACK-06, ORD-03)</p></div></div>
                <div className="flex items-start gap-3"><div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm shrink-0">4</div><div><h4 className="font-medium text-gray-800">ثبات البيانات</h4><p className="text-sm text-gray-500">بعد إنشاء الطلب لا تغير زيارة لاحقة هوية المسوق (TRACK-06)</p></div></div>
              </div>
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-medium text-blue-800 mb-2">💡 TRACK-07: طلبات الهاتف وواتساب</h4>
                <p className="text-sm text-blue-700">إذا جاء العميل هاتفياً أو عبر واتساب، يستخدم رمز مسوق/كوبون أو إجراء موثق من موظف مخول. لا تُمنح عمولة على تخمين المصدر.</p>
              </div>
            </motion.div>

            {/* Marketing Materials */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4"><Download className="w-5 h-5 text-purple-600" /><h3 className="text-lg font-bold text-gray-800">مواد تسويقية معتمدة</h3></div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4 text-sm text-emerald-800">
                <FileText className="w-3 h-3 inline ml-1" />AFF-03: المواد المعتمدة فقط — لا يجوز تحريف بيانات المنتج
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[{ label: 'صورة المنتج', type: '📷', color: 'bg-blue-50 text-blue-600' }, { label: 'فيديو ترويجي', type: '🎬', color: 'bg-purple-50 text-purple-600' }, { label: 'وصف معتمد', type: '📝', color: 'bg-emerald-50 text-emerald-600' }, { label: 'بانر إعلاني', type: '🖼️', color: 'bg-orange-50 text-orange-600' }].map((m, i) => (
                  <button key={i} className={`${m.color} rounded-xl p-4 text-center hover:opacity-80 transition`}><span className="text-3xl mb-2 block">{m.type}</span><span className="text-sm font-medium">{m.label}</span></button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
