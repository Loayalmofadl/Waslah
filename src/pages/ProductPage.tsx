import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, Check, Share2, Download, MessageCircle, Facebook, Link2, Eye, ShoppingCart, TrendingUp, Clock } from 'lucide-react';
import { products } from '../data/mockData';

interface ProductPageProps {
  productId: string | null;
  onBack: () => void;
}

export default function ProductPage({ productId, onBack }: ProductPageProps) {
  const [copied, setCopied] = useState(false);
  const [activeShareTab, setActiveShareTab] = useState<'link' | 'whatsapp' | 'facebook'>('link');

  const product = products.find(p => p.id === productId) || products[0];
  const affiliateLink = `sooqiqa.com/p/${product.id}?ref=AF001`;
  const whatsappMessage = encodeURIComponent(`🛍️ ${product.name}\n💰 السعر: $${product.price}\n🔗 اطلب الآن: ${affiliateLink}`);
  const whatsappLink = `https://wa.me/?text=${whatsappMessage}`;

  const copyLink = () => {
    navigator.clipboard.writeText(affiliateLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
              <ArrowRight className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-800">صفحة المنتج</h1>
              <p className="text-xs text-gray-500">أدوات التسويق والمشاركة</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">المسوّق: أحمد محمد</span>
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-sm">أ</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Product Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-24"
            >
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 text-center">
                <span className="text-8xl">{product.image}</span>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-sm text-gray-500 mb-4">{product.description}</p>
                <div className="text-xs text-gray-400 mb-4">
                  <span>المتجر: {product.merchantName}</span>
                  <span className="mx-2">|</span>
                  <span>الفئة: {product.category}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-blue-50 rounded-xl p-3 text-center">
                    <div className="text-xs text-gray-500">سعر البيع</div>
                    <div className="text-xl font-bold text-blue-600">${product.price}</div>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-3 text-center">
                    <div className="text-xs text-gray-500">عمولتك</div>
                    <div className="text-xl font-bold text-emerald-600">${product.commission}</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 text-center mb-4">
                  <div className="text-xs text-gray-500">نسبة العمولة</div>
                  <div className="text-lg font-bold text-purple-600">
                    {product.commissionType === 'percentage' 
                      ? `${((product.commission / product.price) * 100).toFixed(1)}%` 
                      : `$${product.commission} ثابت`}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <Eye className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                    <div className="text-sm font-bold text-gray-700">{product.clicks.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">نقرة</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <ShoppingCart className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                    <div className="text-sm font-bold text-gray-700">{product.orders}</div>
                    <div className="text-xs text-gray-400">طلب</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <TrendingUp className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                    <div className="text-sm font-bold text-gray-700">${product.sales.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">مبيعات</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Marketing Tools */}
          <div className="lg:col-span-2 space-y-6">
            {/* Affiliate Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Link2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-gray-800">رابطك التسويقي الفريد</h3>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <code className="text-emerald-400 text-sm font-mono break-all">{affiliateLink}</code>
                  <button
                    onClick={copyLink}
                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm whitespace-nowrap mr-4"
                  >
                    {copied ? <><Check className="w-3.5 h-3.5" /> تم النسخ</> : <><Copy className="w-3.5 h-3.5" /> نسخ</>}
                  </button>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex items-start gap-2">
                <Clock className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <strong>مهم:</strong> هذا الرابط يحتوي على هويتك كمسوّق. عند فتح العميل للرابط، يتم حفظ هويتك تلقائياً حتى لو عاد لاحقاً لإتمام الطلب.
                </div>
              </div>
            </motion.div>

            {/* Share Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Share2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-800">مشاركة المنتج</h3>
              </div>

              <div className="flex border-b mb-4">
                {[
                  { id: 'link' as const, label: 'نسخ الرابط', icon: <Link2 className="w-4 h-4" /> },
                  { id: 'whatsapp' as const, label: 'واتساب', icon: <MessageCircle className="w-4 h-4" /> },
                  { id: 'facebook' as const, label: 'فيسبوك', icon: <Facebook className="w-4 h-4" /> },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveShareTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition ${
                      activeShareTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeShareTab === 'link' && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">انسخ الرابط وشاركه في أي مكان:</p>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <code className="text-sm text-gray-700 break-all">{affiliateLink}</code>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={copyLink}
                      className="flex items-center justify-center gap-2 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition font-medium"
                    >
                      <Copy className="w-4 h-4" />
                      نسخ الرابط
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium">
                      <Share2 className="w-4 h-4" />
                      مشاركة
                    </button>
                  </div>
                </div>
              )}

              {activeShareTab === 'whatsapp' && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">مشاركة عبر واتساب مع رسالة جاهزة:</p>
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <p className="text-sm text-gray-800 leading-relaxed">
                      🛍️ <strong>{product.name}</strong><br />
                      💰 السعر: <strong>${product.price}</strong><br />
                      ✨ {product.description.slice(0, 60)}...<br />
                      🔗 اطلب الآن: {affiliateLink}
                    </p>
                  </div>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium w-full"
                  >
                    <MessageCircle className="w-4 h-4" />
                    فتح واتساب ومشاركة
                  </a>
                </div>
              )}

              {activeShareTab === 'facebook' && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">مشاركة على فيسبوك:</p>
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-gray-800 leading-relaxed">
                      🎯 عرض مميز!<br />
                      <strong>{product.name}</strong> بسعر {product.price}$ فقط!<br />
                      📦 توصيل سريع<br />
                      🔗 اطلب من هنا: {affiliateLink}
                    </p>
                  </div>
                  <button className="flex items-center justify-center gap-2 py-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition font-medium w-full">
                    <Facebook className="w-4 h-4" />
                    مشاركة على فيسبوك
                  </button>
                </div>
              )}
            </motion.div>

            {/* Marketing Materials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Download className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-bold text-gray-800">مواد تسويقية جاهزة</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'صورة المنتج', type: '📷', color: 'bg-blue-50 text-blue-600' },
                  { label: 'فيديو ترويجي', type: '🎬', color: 'bg-purple-50 text-purple-600' },
                  { label: 'وصف تسويقي', type: '📝', color: 'bg-emerald-50 text-emerald-600' },
                  { label: 'بانر إعلاني', type: '🖼️', color: 'bg-orange-50 text-orange-600' },
                ].map((material, i) => (
                  <button key={i} className={`${material.color} rounded-xl p-4 text-center hover:opacity-80 transition`}>
                    <span className="text-3xl mb-2 block">{material.type}</span>
                    <span className="text-sm font-medium">{material.label}</span>
                    <div className="text-xs mt-1 opacity-70">تحميل</div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Order Tracking Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">كيف يتم تتبع طلباتك؟</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-sm shrink-0">1</div>
                  <div>
                    <h4 className="font-medium text-gray-800">العميل يفتح رابطك</h4>
                    <p className="text-sm text-gray-500">يتم حفظ هويتك (ref=AF001) في المتصفح والكوكيز</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">2</div>
                  <div>
                    <h4 className="font-medium text-gray-800">العميل يقدم طلباً</h4>
                    <p className="text-sm text-gray-500">يتم تسجيل الطلب مع ربطه بهويتك كمسوّق</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold text-sm shrink-0">3</div>
                  <div>
                    <h4 className="font-medium text-gray-800">العمولة تُسجّل كمعلقة</h4>
                    <p className="text-sm text-gray-500">في نظام الدفع عند الاستلام، العمولة تبقى معلقة حتى تأكيد التسليم</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm shrink-0">4</div>
                  <div>
                    <h4 className="font-medium text-gray-800">تأكيد التسليم واعتماد العمولة</h4>
                    <p className="text-sm text-gray-500">بعد تسليم المنتج واستيفاء شروط الإرجاع، تُعتمد العمولة وتصبح قابلة للسحب</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-medium text-blue-800 mb-2">💡 طلبات واتساب والهاتف</h4>
                <p className="text-sm text-blue-700">
                  إذا جاءك عميل عبر الهاتف أو واتساب مباشرة، يمكنك إرسال رابطك له. عند فتحه، سيتم حفظ هويتك.
                  كما يمكن للتاجر تسجيل طلب يدوياً مع تحديد المسوّق المسؤول لضمان حقوقك.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
