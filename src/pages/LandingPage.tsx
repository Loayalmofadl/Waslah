import { motion } from 'framer-motion';
import { ShoppingBag, Users, BarChart3, Link2, Shield, TrendingUp, Store, UserPlus, Settings, FileText, Lock, Zap } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: any) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center">
              <Link2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">وصلة</h1>
              <p className="text-xs text-gray-400 -mt-1">WASLA</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onNavigate('marketer')} className="px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50 rounded-lg transition">
              <UserPlus className="w-4 h-4 inline ml-1" />مسوّق
            </button>
            <button onClick={() => onNavigate('merchant')} className="px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 rounded-lg transition">
              <Store className="w-4 h-4 inline ml-1" />تاجر
            </button>
            <button onClick={() => onNavigate('admin')} className="px-3 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50 rounded-lg transition">
              <Settings className="w-4 h-4 inline ml-1" />إدارة
            </button>
            <button onClick={() => onNavigate('login')} className="px-4 py-2 text-sm font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              دخول
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm mb-6">
              🚀 منصة التسويق بالعمولة — الإصدار 1.0
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              وصلة تربط التجار بالمسوقين
              <br />
              <span className="text-yellow-300">وتحوّل المبيعات إلى عمولات موثقة</span>
            </h2>
            <p className="text-lg md:text-xl text-indigo-100 mb-10 leading-relaxed max-w-3xl mx-auto">
              التاجر يوفر المنتج والمخزون والتوصيل، والمسوّق يجلب العملاء، ووصلة تتولى تتبع المبيعات وحساب العمولات وفق قواعد واضحة وقابلة للتدقيق.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => onNavigate('merchant')} className="px-8 py-4 bg-white text-indigo-700 font-bold text-lg rounded-xl hover:bg-indigo-50 transition shadow-lg">
                <Store className="w-5 h-5 inline ml-2" />ابدأ كتاجر
              </button>
              <button onClick={() => onNavigate('marketer')} className="px-8 py-4 bg-indigo-800/50 text-white font-bold text-lg rounded-xl hover:bg-indigo-800/70 transition border border-white/30">
                <UserPlus className="w-5 h-5 inline ml-2" />ابدأ كمسوّق
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">كيف تعمل وصلة؟</h3>
            <p className="text-gray-500 text-lg">دورة بيع كاملة من إضافة المنتج إلى اعتماد العمولة</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Store className="w-8 h-8" />, title: 'التاجر يضيف منتجاته', desc: 'يحدد السعر والمخزون وشروط التوصيل والإرجاع والعمولة', color: 'from-blue-500 to-blue-600' },
              { icon: <Users className="w-8 h-8" />, title: 'المسوّق يختار وينشئ رابطاً', desc: 'يتصفح الكتالوج ويحصل على رابط إحالة فريد لكل منتج', color: 'from-emerald-500 to-emerald-600' },
              { icon: <Link2 className="w-8 h-8" />, title: 'العميل يطلب عبر الرابط', desc: 'تُسجل الإحالة وتُحفظ لقطة السعر والعمولة وقت الطلب', color: 'from-purple-500 to-purple-600' },
              { icon: <Shield className="w-8 h-8" />, title: 'العمولة تُعتمد بعد التسليم', desc: 'تبقى معلقة حتى اكتمال شروط البيع والتسليم وسياسة الإرجاع', color: 'from-orange-500 to-orange-600' },
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }} className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>{step.icon}</div>
                <div className="text-sm font-bold text-indigo-600 mb-2">الخطوة {i + 1}</div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h4>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Lifecycle */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">دورة حياة العمولة</h3>
            <p className="text-gray-500 text-lg">7 حالات موثقة لكل عمولة — من الإنشاء إلى الدفع</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { label: 'معلقة', desc: 'طلب جديد', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
              { label: 'معتمدة', desc: 'بعد التسليم', color: 'bg-blue-50 border-blue-200 text-blue-700' },
              { label: 'مستحقة', desc: 'قابلة للسحب', color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
              { label: 'قيد الدفع', desc: 'جاري التحويل', color: 'bg-purple-50 border-purple-200 text-purple-700' },
              { label: 'مدفوعة', desc: 'تم التحويل', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
              { label: 'ملغاة', desc: 'مرتجع/ملغى', color: 'bg-red-50 border-red-200 text-red-700' },
              { label: 'موقوفة', desc: 'قيد المراجعة', color: 'bg-orange-50 border-orange-200 text-orange-700' },
            ].map((state, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }} className={`${state.color} border rounded-xl p-4 text-center`}>
                <div className="font-bold text-sm mb-1">{state.label}</div>
                <div className="text-xs opacity-80">{state.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">لماذا وصلة؟</h3>
            <p className="text-gray-500 text-lg">منصة مصممة للسوق اليمني مع قابلية التوسع</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Shield className="w-7 h-7" />, title: 'إسناد آمن وموثق', desc: 'رموز إحالة غير قابلة للتخمين مع حفظ هوية المسوق داخل الطلب وليس مجرد نقرة', color: 'bg-indigo-50 text-indigo-600' },
              { icon: <Lock className="w-7 h-7" />, title: 'لقطات مالية ثابتة', desc: 'يُحفظ السعر والعمولة وقت الطلب — تغييرهما لاحقاً لا يؤثر على الطلبات السابقة', color: 'bg-emerald-50 text-emerald-600' },
              { icon: <FileText className="w-7 h-7" />, title: 'سجل تدقيق كامل', desc: 'كل تغيير مالي أو حالة مؤثرة يُسجّل مع الفاعل والتوقيت والسبب', color: 'bg-purple-50 text-purple-600' },
              { icon: <BarChart3 className="w-7 h-7" />, title: 'مؤشرات أداء واضحة', desc: 'GMV وصافي المبيعات المؤهلة ومعدل التحويل والتسليم — بتعريفات مكتوبة', color: 'bg-orange-50 text-orange-600' },
              { icon: <Zap className="w-7 h-7" />, title: 'دعم الدفع عند الاستلام', desc: 'العمولة تبقى معلقة حتى تأكيد التسليم ومرور سياسة الإرجاع', color: 'bg-pink-50 text-pink-600' },
              { icon: <TrendingUp className="w-7 h-7" />, title: 'نظام سحب يدوي آمن', desc: 'طلبات سحب بمراجعات مالية وتسجيل مرجع الدفع وتأكيد من مستخدم مخول', color: 'bg-teal-50 text-teal-600' },
            ].map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="bg-gray-50 p-6 rounded-2xl hover:shadow-md transition">
                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>{feature.icon}</div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">أدوار وصلاحيات منفصلة</h3>
            <p className="text-gray-500">7 أدوار بصلاحيات محددة وفق مبدأ Least Privilege</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: <Store className="w-6 h-6" />, role: 'التاجر', desc: 'إدارة المنتجات والمخزون والطلبات' },
              { icon: <UserPlus className="w-6 h-6" />, role: 'المسوّق', desc: 'تصفح المنتجات وإنشاء الروابط ومتابعة الأرباح' },
              { icon: <Users className="w-6 h-6" />, role: 'العميل', desc: 'تصفح المنتجات وإرسال الطلبات ومتابعتها' },
              { icon: <Settings className="w-6 h-6" />, role: 'مدير المنصة', desc: 'إدارة الحسابات والسياسات والتسويات' },
            ].map((role, i) => (
              <div key={i} className="bg-white p-5 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-3">{role.icon}</div>
                <h4 className="font-bold text-gray-800 mb-1">{role.role}</h4>
                <p className="text-sm text-gray-500">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">مبدأ وصلة الأساسي</h3>
          <p className="text-xl text-indigo-200 mb-10 leading-relaxed max-w-3xl mx-auto">
            لا تُحتسب العمولة النهائية لمجرد النقر أو إنشاء الطلب. تُسجل الإحالة عند الطلب، وتظل العمولة معلقة حتى اكتمال شروط البيع والتسليم والسياسة المعتمدة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate('merchant')} className="px-8 py-4 bg-indigo-500 text-white font-bold text-lg rounded-xl hover:bg-indigo-600 transition">
              <Store className="w-5 h-5 inline ml-2" />لوحة التاجر
            </button>
            <button onClick={() => onNavigate('marketer')} className="px-8 py-4 bg-emerald-500 text-white font-bold text-lg rounded-xl hover:bg-emerald-600 transition">
              <UserPlus className="w-5 h-5 inline ml-2" />لوحة المسوّق
            </button>
            <button onClick={() => onNavigate('admin')} className="px-8 py-4 bg-purple-500 text-white font-bold text-lg rounded-xl hover:bg-purple-600 transition">
              <Settings className="w-5 h-5 inline ml-2" />لوحة الإدارة
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 وصلة | WASLA — منصة التسويق بالعمولة. مسودة عمل قابلة للتعديل.</p>
        </div>
      </footer>
    </div>
  );
}
