interface WaslaLogoProps {
  variant?: 'full' | 'icon' | 'arabic' | 'english';
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export default function WaslaLogo({ variant = 'full', theme = 'light', size = 'md' }: WaslaLogoProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14'
  };

  const navy = '#15243A';
  const teal = '#00BFA6';
  const gold = '#F4B740';
  const white = '#FFFFFF';

  const primaryColor = theme === 'dark' ? white : navy;

  // Icon only - two connected circles with gold arrow
  const Icon = () => (
    <svg viewBox="0 0 48 48" className={`${sizeClasses[size]} w-auto`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* First circle (Merchant) */}
      <circle cx="16" cy="24" r="10" stroke={primaryColor} strokeWidth="3" fill="none" />
      {/* Second circle (Marketer) */}
      <circle cx="32" cy="24" r="10" stroke={teal} strokeWidth="3" fill="none" />
      {/* Connection point - gold arrow */}
      <path d="M22 24 L26 24" stroke={gold} strokeWidth="3" strokeLinecap="round" />
      <path d="M24 21 L27 24 L24 27" stroke={gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );

  // Full logo with Arabic and English text
  const FullLogo = () => (
    <div className="flex items-center gap-3">
      <Icon />
      <div className="flex flex-col">
        <span className={`text-xl font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-wasla-navy'}`}>وصلة</span>
        <span className={`text-[10px] font-medium tracking-wider leading-tight ${theme === 'dark' ? 'text-white/70' : 'text-wasla-muted'}`}>WASLA</span>
      </div>
    </div>
  );

  // Arabic only
  const ArabicLogo = () => (
    <div className="flex items-center gap-2">
      <Icon />
      <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-wasla-navy'}`}>وصلة</span>
    </div>
  );

  // English only
  const EnglishLogo = () => (
    <div className="flex items-center gap-2">
      <Icon />
      <span className={`text-2xl font-bold tracking-wide ${theme === 'dark' ? 'text-white' : 'text-wasla-navy'}`} style={{ fontFamily: 'Inter, sans-serif' }}>WASLA</span>
    </div>
  );

  switch (variant) {
    case 'icon':
      return <Icon />;
    case 'arabic':
      return <ArabicLogo />;
    case 'english':
      return <EnglishLogo />;
    case 'full':
    default:
      return <FullLogo />;
  }
}
