import { motion } from 'framer-motion';
import WaslaLogo from '../components/WaslaLogo';
import { Users, BarChart3, Link2, Shield, Store, UserPlus, Settings, FileText, Lock, Zap, ArrowLeft } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: any) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-wasla-canvas">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <WaslaLogo variant="full" size="md" />
          <div className="flex items-center gap-2">
            <button onClick={() => onNavigate('marketer')} className="px-3 py-2 text-sm font-medium text-wasla-teal-dark hover:bg-teal-50 rounded-lg transition">
              مسوّق
            </button>
            <button onClick={() => onNavigate('merchant')} className="px-3 py-2 text-sm font-medium text-wasla-navy hover:bg-gray-50 rounded-lg transition">
              تاجر
            </button>
            <button onClick={() => onNavigate('admin')} className="px-3 py-2 text-sm font-medium text-wasla-muted hover:bg-gray-50 rounded-lg transition">
              إدارة
            </button>
            <button onClick={() => onNavigate('login')} className="px-5 py-2 text-sm font-bold bg-wasla-navy text-white rounded-lg hover:bg-wasla-navy/90 transition">
              دخول
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-wasla-navy text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-wasla-teal rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-wasla-gold rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-1.5 bg-wasla-teal/20 border border-wasla-teal/30 rounded-full text-sm mb-6 text-wasla-teal">
              🚀 منصة التسويق بالعمولة — الإصدار 1.0
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              منتجات أكثر. فرص أوسع.
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto">
              منصة تجمع التجار بالمسوقين وتمنح كل عملية بيع مساراً واضحاً من الرابط إلى العمولة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => onNavigate('merchant')} className="px-8 py-4 bg-wasla-teal text-wasla-navy font-bold text-lg rounded-xl hover:bg-wasla-teal/90 transition shadow-lg">
                <Store className="w-5 h-5 inline ml-2" />وسّع مبيعاتك
              </button>
              <button onClick={() => onNavigate('marketer')} className="px-8 py-4 bg-white/10 text-white font-bold text-lg rounded-xl hover:bg-white/20 transition border border-white/30">
                <UserPlus className="w-5 h-5 inline ml-2" />سوّق واربح
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-wasla-teal/10 rounded-2xl flex items-center justify-center">
                <Store className="w-8 h-8 text-wasla-teal-dark" />
              </div>
              <h3 className="text-lg font-bold text-wasla-navy mb-2">للتاجر</h3>
              <p className="text-wasla-muted text-sm leading-relaxed">وسّع مبيعاتك عبر شبكة مسوقين. كل رابط واضح، وكل طلب قابل للتتبع.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-wasla-gold/10 rounded-2xl flex items-center justify-center">
                <UserPlus className="w-8 h-8 text-wasla-gold" />
              </div>
              <h3 className="text-lg font-bold text-wasla-navy mb-2">للمسوّق</h3>
              <p className="text-wasla-muted text-sm leading-relaxed">سوّق منتجات موثوقة، وتابع عمولتك بوضوح. كل عمولة مبنية على سجل مفهوم.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-wasla-navy/10 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-wasla-navy" />
              </div>
              <h3 className="text-lg font-bold text-wasla-navy mb-2">للجميع</h3>
              <p className="text-wasla-muted text-sm leading-relaxed">من المنتج إلى العميل، كل خطوة قابلة للقياس. عدالة وشفافية في كل عملية.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-wasla-canvas">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-wasla-navy mb-4">كيف تعمل وصلة؟</h3>
            <p className="text-wasla-muted text-lg">دورة بيع كاملة من إضافة المنتج إلى اعتماد العمولة</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Store className="w-8 h-8" />, title: 'التاجر يضيف منتجاته', desc: 'يحدد السعر والمخزون وشروط التوصيل والإرجاع والعمولة', color: 'bg-wasla-navy text-white' },
              { icon: <Users className="w-8 h-8" />, title: 'المسوّق يختار وينشئ رابطاً', desc: 'يتصفح الكتالوج ويحصل على رابط إحالة فريد لكل منتج', color: 'bg-wasla-teal text-wasla-navy' },
              { icon: <Link2 className="w-8 h-8" />, title: 'العميل يطلب عبر الرابط', desc: 'تُسجل الإحالة وتُحفظ لقطة السعر والعمولة وقت الطلب', color: 'bg-wasla-teal-dark text-white' },
              { icon: <Shield className="w-8 h-8" />, title: 'العمولة تُعتمد بعد التسليم', desc: 'تبقى معلقة حتى اكتمال شروط البيع والتسليم وسياسة الإرجاع', color: 'bg-wasla-gold text-wasla-navy' },
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }} className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>{step.icon}</div>
                <div className="text-sm font-bold text-wasla-teal-dark mb-2">الخطوة {i + 1}</div>
                <h4 className="text-lg font-bold text-wasla-navy mb-2">{step.title}</h4>
                <p className="text-wasla-muted text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Lifecycle */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-wasla-navy mb-4">دورة حياة العمولة</h3>
            <p className="text-wasla-muted text-lg">7 حالات موثقة لكل عمولة — من الإنشاء إلى الدفع</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { label: 'معلقة', desc: 'طلب جديد', bg: 'bg-wasla-gold/10', text: 'text-wasla-gold', border: 'border-wasla-gold/30' },
              { label: 'معتمدة', desc: 'بعد التسليم', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
              { label: 'مستحقة', desc: 'قابلة للسحب', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
              { label: 'قيد الدفع', desc: 'جاري التحويل', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
              { label: 'مدفوعة', desc: 'تم التحويل', bg: 'bg-wasla-success/10', text: 'text-wasla-success', border: 'border-wasla-success/30' },
              { label: 'ملغاة', desc: 'مرتجع/ملغى', bg: 'bg-wasla-error/10', text: 'text-wasla-error', border: 'border-wasla-error/30' },
              { label: 'موقوفة', desc: 'قيد المراجعة', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
            ].map((state, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }} className={`${state.bg} ${state.border} border rounded-xl p-4 text-center`}>
                <div className={`font-bold text-sm mb-1 ${state.text}`}>{state.label}</div>
                <div className="text-xs text-wasla-muted">{state.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-wasla-canvas">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-wasla-navy mb-4">لماذا وصلة؟</h3>
            <p className="text-wasla-muted text-lg">منصة مصممة للسوق اليمني مع قابلية التوسع</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Shield className="w-7 h-7" />, title: 'إسناد آمن وموثق', desc: 'رموز إحالة غير قابلة للتخمين مع حفظ هوية المسوق داخل الطلب وليس مجرد نقرة', color: 'bg-wasla-navy/5 text-wasla-navy' },
              { icon: <Lock className="w-7 h-7" />, title: 'لقطات مالية ثابتة', desc: 'يُحفظ السعر والعمولة وقت الطلب — تغييرهما لاحقاً لا يؤثر على الطلبات السابقة', color: 'bg-wasla-teal/10 text-wasla-teal-dark' },
              { icon: <FileText className="w-7 h-7" />, title: 'سجل تدقيق كامل', desc: 'كل تغيير مالي أو حالة مؤثرة يُسجّل مع الفاعل والتوقيت والسبب', color: 'bg-wasla-gold/10 text-wasla-gold' },
              { icon: <BarChart3 className="w-7 h-7" />, title: 'مؤشرات أداء واضحة', desc: 'GMV وصافي المبيعات المؤهلة ومعدل التحويل والتسليم — بتعريفات مكتوبة', color: 'bg-wasla-success/10 text-wasla-success' },
              { icon: <Zap className="w-7 h-7" />, title: 'دعم الدفع عند الاستلام', desc: 'العمولة تبقى معلقة حتى تأكيد التسليم ومرور سياسة الإرجاع', color: 'bg-wasla-error/10 text-wasla-error' },
              { icon: <Users className="w-7 h-7" />, title: 'نظام سحب يدوي آمن', desc: 'طلبات سحب بمراجعات مالية وتسجيل مرجع الدفع وتأكيد من مستخدم مخول', color: 'bg-indigo-50 text-indigo-600' },
            ].map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>{feature.icon}</div>
                <h4 className="text-lg font-bold text-wasla-navy mb-2">{feature.title}</h4>
                <p className="text-wasla-muted text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-wasla-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">مبدأ وصلة الأساسي</h3>
          <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto">
            لا تُحتسب العمولة النهائية لمجرد النقر أو إنشاء الطلب. تُسجل الإحالة عند الطلب، وتظل العمولة معلقة حتى اكتمال شروط البيع والتسليم والسياسة المعتمدة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate('merchant')} className="px-8 py-4 bg-wasla-teal text-wasla-navy font-bold text-lg rounded-xl hover:bg-wasla-teal/90 transition">
              <Store className="w-5 h-5 inline ml-2" />لوحة التاجر
            </button>
            <button onClick={() => onNavigate('marketer')} className="px-8 py-4 bg-white/10 text-white font-bold text-lg rounded-xl hover:bg-white/20 transition border border-white/30">
              <UserPlus className="w-5 h-5 inline ml-2" />لوحة المسوّق
            </button>
            <button onClick={() => onNavigate('admin')} className="px-8 py-4 bg-wasla-gold text-wasla-navy font-bold text-lg rounded-xl hover:bg-wasla-gold/90 transition">
              <Settings className="w-5 h-5 inline ml-2" />لوحة الإدارة
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-wasla-navy text-white/60 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <WaslaLogo variant="full" theme="dark" size="sm" />
            <p className="text-sm">© 2025 وصلة | WASLA — منصة التسويق بالعمولة</p>
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="hover:text-white transition">الشروط</a>
              <a href="#" className="hover:text-white transition">الخصوصية</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
