import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, Lock, User, Store, TrendingUp, Shield, Eye, EyeOff } from 'lucide-react';
import WaslaLogo from '../components/WaslaLogo';

interface LoginPageProps {
  onNavigate: (page: any) => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'marketer' | 'merchant'>('marketer');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-wasla-canvas">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('landing')} className="text-wasla-muted hover:text-wasla-navy transition"><ArrowRight className="w-5 h-5" /></button>
            <WaslaLogo variant="full" size="md" />
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-wasla-navy mb-2">{mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}</h2>
            <p className="text-sm text-wasla-muted">{mode === 'login' ? 'أدخل بياناتك للوصول إلى حسابك' : 'اختر نوع حسابك وأدخل بياناتك'}</p>
          </div>

          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button onClick={() => setRole('marketer')} className={`p-4 rounded-xl border-2 transition text-center ${role === 'marketer' ? 'border-wasla-teal bg-wasla-teal/5' : 'border-gray-200 hover:border-gray-300'}`}>
                <TrendingUp className={`w-6 h-6 mx-auto mb-2 ${role === 'marketer' ? 'text-wasla-teal-dark' : 'text-wasla-muted'}`} />
                <div className={`font-bold text-sm ${role === 'marketer' ? 'text-wasla-teal-dark' : 'text-wasla-navy'}`}>مسوّق</div>
                <div className="text-xs text-wasla-muted mt-1">روّج منتجات واربح عمولات</div>
              </button>
              <button onClick={() => setRole('merchant')} className={`p-4 rounded-xl border-2 transition text-center ${role === 'merchant' ? 'border-wasla-navy bg-wasla-navy/5' : 'border-gray-200 hover:border-gray-300'}`}>
                <Store className={`w-6 h-6 mx-auto mb-2 ${role === 'merchant' ? 'text-wasla-navy' : 'text-wasla-muted'}`} />
                <div className={`font-bold text-sm ${role === 'merchant' ? 'text-wasla-navy' : 'text-wasla-navy'}`}>تاجر</div>
                <div className="text-xs text-wasla-muted mt-1">اعرض منتجاتك للبيع</div>
              </button>
            </div>
          )}

          <div className="space-y-4">
            {mode === 'register' && (
              <div className="relative">
                <User className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-wasla-muted" />
                <input type="text" className="w-full border border-gray-200 rounded-lg pr-10 pl-4 py-3 text-sm focus:ring-2 focus:ring-wasla-teal focus:border-wasla-teal outline-none" placeholder="الاسم الكامل" />
              </div>
            )}
            <div className="relative">
              <Phone className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-wasla-muted" />
              <input type="tel" className="w-full border border-gray-200 rounded-lg pr-10 pl-4 py-3 text-sm focus:ring-2 focus:ring-wasla-teal focus:border-wasla-teal outline-none" placeholder="رقم الهاتف" dir="ltr" />
            </div>
            {mode === 'register' && (
              <div className="relative">
                <Mail className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-wasla-muted" />
                <input type="email" className="w-full border border-gray-200 rounded-lg pr-10 pl-4 py-3 text-sm focus:ring-2 focus:ring-wasla-teal focus:border-wasla-teal outline-none" placeholder="البريد الإلكتروني (اختياري)" dir="ltr" />
              </div>
            )}
            <div className="relative">
              <Lock className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-wasla-muted" />
              <input type={showPassword ? 'text' : 'password'} className="w-full border border-gray-200 rounded-lg pr-10 pl-10 py-3 text-sm focus:ring-2 focus:ring-wasla-teal focus:border-wasla-teal outline-none" placeholder="كلمة المرور" dir="ltr" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-wasla-muted hover:text-wasla-navy">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'login' && (
            <div className="text-left mt-3">
              <a href="#" className="text-sm text-wasla-teal-dark hover:text-wasla-teal transition">نسيت كلمة المرور؟</a>
            </div>
          )}

          <button
            onClick={() => {
              if (role === 'marketer') onNavigate('marketer');
              else if (role === 'merchant') onNavigate('merchant');
              else onNavigate('admin');
            }}
            className="w-full mt-6 py-3 bg-wasla-navy text-white font-bold rounded-lg hover:bg-wasla-navy/90 transition"
          >
            {mode === 'login' ? 'دخول' : 'إنشاء الحساب'}
          </button>

          <div className="text-center mt-6">
            <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-sm text-wasla-teal-dark hover:text-wasla-teal transition">
              {mode === 'login' ? 'ليس لديك حساب؟ أنشئ حساباً جديداً' : 'لديك حساب بالفعل؟ سجل دخولك'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-wasla-muted justify-center mb-3">
              <Shield className="w-3 h-3" />
              <span>دخول سريع للتجربة</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => onNavigate('merchant')} className="py-2 text-xs bg-wasla-navy/5 text-wasla-navy rounded-lg hover:bg-wasla-navy/10 transition font-medium">دخول كتاجر</button>
              <button onClick={() => onNavigate('marketer')} className="py-2 text-xs bg-wasla-teal/10 text-wasla-teal-dark rounded-lg hover:bg-wasla-teal/20 transition font-medium">دخول كمسوّق</button>
              <button onClick={() => onNavigate('admin')} className="py-2 text-xs bg-wasla-gold/10 text-wasla-gold rounded-lg hover:bg-wasla-gold/20 transition font-medium">دخول كمدير</button>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 text-center">
          <p className="text-xs text-wasla-muted">
            بإنشائك حساباً فإنك توافق على <a href="#" className="text-wasla-teal-dark hover:text-wasla-teal">شروط الاستخدام</a> و<a href="#" className="text-wasla-teal-dark hover:text-wasla-teal">سياسة الخصوصية</a>
          </p>
          <p className="text-xs text-wasla-muted mt-2">
            AUTH-05: يحتفظ النظام بالموافقة على الشروط وإصدار السياسة وتاريخ الموافقة
          </p>
        </div>
      </div>
    </div>
  );
}
