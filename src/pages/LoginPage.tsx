import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Link2, Phone, Mail, Lock, User, Store, TrendingUp, Shield, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: any) => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'marketer' | 'merchant'>('marketer');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('landing')} className="text-gray-500 hover:text-gray-700"><ArrowRight className="w-5 h-5" /></button>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center"><Link2 className="w-6 h-6 text-white" /></div>
            <div><h1 className="text-xl font-bold text-gray-800">وصلة</h1><p className="text-xs text-gray-400">WASLA</p></div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}</h2>
            <p className="text-sm text-gray-500">{mode === 'login' ? 'أدخل بياناتك للوصول إلى حسابك' : 'اختر نوع حسابك وأدخل بياناتك'}</p>
          </div>

          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button onClick={() => setRole('marketer')} className={`p-4 rounded-xl border-2 transition text-center ${role === 'marketer' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <TrendingUp className={`w-6 h-6 mx-auto mb-2 ${role === 'marketer' ? 'text-emerald-600' : 'text-gray-400'}`} />
                <div className={`font-bold text-sm ${role === 'marketer' ? 'text-emerald-700' : 'text-gray-600'}`}>مسوّق</div>
                <div className="text-xs text-gray-400 mt-1">روّج منتجات واربح عمولات</div>
              </button>
              <button onClick={() => setRole('merchant')} className={`p-4 rounded-xl border-2 transition text-center ${role === 'merchant' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <Store className={`w-6 h-6 mx-auto mb-2 ${role === 'merchant' ? 'text-blue-600' : 'text-gray-400'}`} />
                <div className={`font-bold text-sm ${role === 'merchant' ? 'text-blue-700' : 'text-gray-600'}`}>تاجر</div>
                <div className="text-xs text-gray-400 mt-1">اعرض منتجاتك للبيع</div>
              </button>
            </div>
          )}

          <div className="space-y-4">
            {mode === 'register' && (
              <div className="relative">
                <User className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" className="w-full border rounded-lg pr-10 pl-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="الاسم الكامل" />
              </div>
            )}
            <div className="relative">
              <Phone className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="tel" className="w-full border rounded-lg pr-10 pl-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="رقم الهاتف" dir="ltr" />
            </div>
            {mode === 'register' && (
              <div className="relative">
                <Mail className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" className="w-full border rounded-lg pr-10 pl-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="البريد الإلكتروني (اختياري)" dir="ltr" />
              </div>
            )}
            <div className="relative">
              <Lock className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type={showPassword ? 'text' : 'password'} className="w-full border rounded-lg pr-10 pl-10 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="كلمة المرور" dir="ltr" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'login' && (
            <div className="text-left mt-3">
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">نسيت كلمة المرور؟</a>
            </div>
          )}

          <button
            onClick={() => {
              if (role === 'marketer') onNavigate('marketer');
              else if (role === 'merchant') onNavigate('merchant');
              else onNavigate('admin');
            }}
            className="w-full mt-6 py-3 bg-gradient-to-l from-indigo-600 to-purple-700 text-white font-bold rounded-lg hover:from-indigo-700 hover:to-purple-800 transition"
          >
            {mode === 'login' ? 'دخول' : 'إنشاء الحساب'}
          </button>

          <div className="text-center mt-6">
            <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-sm text-indigo-600 hover:text-indigo-700">
              {mode === 'login' ? 'ليس لديك حساب؟ أنشئ حساباً جديداً' : 'لديك حساب بالفعل؟ سجل دخولك'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center gap-2 text-xs text-gray-500 justify-center mb-3">
              <Shield className="w-3 h-3" />
              <span>دخول سريع للتجربة</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => onNavigate('merchant')} className="py-2 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium">دخول كتاجر</button>
              <button onClick={() => onNavigate('marketer')} className="py-2 text-xs bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition font-medium">دخول كمسوّق</button>
              <button onClick={() => onNavigate('admin')} className="py-2 text-xs bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition font-medium">دخول كمدير</button>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            بإنشائك حساباً فإنك توافق على <a href="#" className="text-indigo-500">شروط الاستخدام</a> و<a href="#" className="text-indigo-500">سياسة الخصوصية</a>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            AUTH-05: يحتفظ النظام بالموافقة على الشروط وإصدار السياسة وتاريخ الموافقة
          </p>
        </div>
      </div>
    </div>
  );
}
