import { motion } from 'framer-motion';
import { ShoppingBag, Users, BarChart3, Link2, Shield, TrendingUp, ArrowLeft, Store, UserPlus, Settings } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'merchant' | 'marketer' | 'admin' | 'product') => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">سوّقها</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('marketer')}
              className="px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
            >
              <UserPlus className="w-4 h-4 inline ml-1" />
              مسوّق
            </button>
            <button
              onClick={() => onNavigate('merchant')}
              className="px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 rounded-lg transition"
            >
              <Store className="w-4 h-4 inline ml-1" />
              تاجر
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className="px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50 rounded-lg transition"
            >
              <Settings className="w-4 h-4 inline ml-1" />
              إدارة
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              حوّل متجرك إلى فريق مبيعات
              <br />
              <span className="text-yellow-300">لا يتوقف عن العمل</span>
            </h2>
            <p className="text-xl md:text-2xl text-emerald-100 mb-10 leading-relaxed">
              منصة تسويق بالعمولة تربط التجار بشبكة من المسوقين المحترفين.
              <br />
              أنت توفر المنتج، والمسوقون يجلبون العملاء.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('merchant')}
                className="px-8 py-4 bg-white text-emerald-700 font-bold text-lg rounded-xl hover:bg-emerald-50 transition shadow-lg hover:shadow-xl"
              >
                <Store className="w-5 h-5 inline ml-2" />
                ابدأ كتاجر
              </button>
              <button
                onClick={() => onNavigate('marketer')}
                className="px-8 py-4 bg-emerald-800/50 text-white font-bold text-lg rounded-xl hover:bg-emerald-800/70 transition border border-white/30"
              >
                <UserPlus className="w-5 h-5 inline ml-2" />
                ابدأ كمسوّق
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">كيف تعمل المنصة؟</h3>
            <p className="text-gray-500 text-lg">أربع خطوات بسيطة لتحويل المبيعات إلى أرباح</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Store className="w-8 h-8" />, title: 'التاجر يضيف منتجاته', desc: 'يحدد السعر والمخزون والعمولة لكل منتج', color: 'from-blue-500 to-blue-600' },
              { icon: <Users className="w-8 h-8" />, title: 'المسوّق يختار المنتجات', desc: 'يتصفح المنتجات ويرى عمولته المتوقعة', color: 'from-emerald-500 to-emerald-600' },
              { icon: <Link2 className="w-8 h-8" />, title: 'ينشر رابطه الفريد', desc: 'يشارك الرابط في فيسبوك وواتساب وتيك توك', color: 'from-purple-500 to-purple-600' },
              { icon: <TrendingUp className="w-8 h-8" />, title: 'تُحتسب العمولة', desc: 'النظام يتتبع المبيعات ويحسب العمولات تلقائياً', color: 'from-orange-500 to-orange-600' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                  {step.icon}
                </div>
                <div className="text-sm font-bold text-emerald-600 mb-2">الخطوة {i + 1}</div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h4>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">لماذا سوّقها؟</h3>
            <p className="text-gray-500 text-lg">منصة متكاملة مصممة للسوق المحلي</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Link2 className="w-7 h-7" />, title: 'تتبع دقيق للمبيعات', desc: 'روابط فريدة لكل مسوّق مع حفظ الهوية حتى مع الدفع عند الاستلام', color: 'bg-blue-50 text-blue-600' },
              { icon: <Shield className="w-7 h-7" />, title: 'حماية حقوق الجميع', desc: 'نظام عمولات شفاف مع آليات واضحة للتسليم والإرجاع', color: 'bg-emerald-50 text-emerald-600' },
              { icon: <BarChart3 className="w-7 h-7" />, title: 'إحصائيات مفصّلة', desc: 'نقرات وطلبات ومبيعات وعمولات في لوحة تحكم واحدة', color: 'bg-purple-50 text-purple-600' },
              { icon: <Users className="w-7 h-7" />, title: 'شبكة مسوقين واسعة', desc: 'آلاف المسوقين المستعدين لتسويق منتجاتك على فيسبوك وواتساب', color: 'bg-orange-50 text-orange-600' },
              { icon: <Store className="w-7 h-7" />, title: 'دعم الطلبات الهاتفية', desc: 'آلية لتسجيل طلبات واتساب والهاتف دون ضياع حقوق المسوق', color: 'bg-pink-50 text-pink-600' },
              { icon: <TrendingUp className="w-7 h-7" />, title: 'نمو مستمر', desc: 'كلما زاد المسوقون زادت مبيعاتك، وكلما زادت المبيعات زادت أرباح المسوقين', color: 'bg-teal-50 text-teal-600' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Product Card */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">مثال عملي</h3>
            <p className="text-gray-500">هكذا يظهر المنتج للمسوّق</p>
          </div>
          <div className="max-w-lg mx-auto">
            <div className="bg-white border-2 border-emerald-100 rounded-2xl p-6 shadow-lg">
              <div className="text-center mb-4">
                <span className="text-6xl">📷</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 text-center mb-4">كاميرا مراقبة ذكية</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <div className="text-sm text-gray-500">سعر البيع</div>
                  <div className="text-2xl font-bold text-blue-600">$55</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-3 text-center">
                  <div className="text-sm text-gray-500">عمولة المسوّق</div>
                  <div className="text-2xl font-bold text-emerald-600">$5.50</div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-500 mb-4">10% من سعر البيع</div>
              <div className="bg-gray-50 rounded-xl p-3 mb-4">
                <div className="text-xs text-gray-500 mb-1">رابط المسوّق</div>
                <div className="text-sm font-mono text-emerald-600 break-all">sooqiqa.com/p/camera?ref=M102</div>
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition">
                سوّق هذا المنتج <ArrowLeft className="w-4 h-4 inline mr-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">جاهز تبدأ؟</h3>
          <p className="text-gray-300 text-lg mb-10">
            سواء كنت تاجر يبحث عن مسوقين أو مسوّق يبحث عن منتجات مربحة، سوّقها هي منصتك.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('merchant')}
              className="px-8 py-4 bg-emerald-500 text-white font-bold text-lg rounded-xl hover:bg-emerald-600 transition"
            >
              <Store className="w-5 h-5 inline ml-2" />
              لوحة التاجر
            </button>
            <button
              onClick={() => onNavigate('marketer')}
              className="px-8 py-4 bg-blue-500 text-white font-bold text-lg rounded-xl hover:bg-blue-600 transition"
            >
              <UserPlus className="w-5 h-5 inline ml-2" />
              لوحة المسوّق
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className="px-8 py-4 bg-purple-500 text-white font-bold text-lg rounded-xl hover:bg-purple-600 transition"
            >
              <Settings className="w-5 h-5 inline ml-2" />
              لوحة الإدارة
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 سوّقها - منصة التسويق بالعمولة. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
