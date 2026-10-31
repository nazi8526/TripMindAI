import React from 'react';
import { PageView } from './Navbar';
import { 
  Sparkles, 
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onSelectCity: (cityId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCity }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const topCities = [
    { id: 'isfahan', name: 'اصفهان' },
    { id: 'shiraz', name: 'شیراز' },
    { id: 'yazd', name: 'یزد' },
    { id: 'qeshm', name: 'قشم' },
    { id: 'masuleh', name: 'ماسوله' },
    { id: 'tehran', name: 'تهران' },
    { id: 'tabriz', name: 'تبریز' },
    { id: 'chabahar', name: 'چابهار' },
    { id: 'kish', name: 'کیش' },
    { id: 'rasht', name: 'رشت' },
    { id: 'mashhad', name: 'مشهد' },
    { id: 'kerman', name: 'کرمان' },
  ];

  return (
    <footer className="bg-[#092B21] text-amber-50/90 pt-16 pb-8 border-t-2 border-[#C59B38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-[2px]">
                <div className="w-full h-full bg-[#0F4C3A] rounded-[14px] flex items-center justify-center">
                  <span className="text-amber-300 font-black text-lg">T</span>
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tight">
                  TripMind AI
                </span>
                <span className="text-xs font-bold text-amber-400 mr-2 bg-white/10 px-2 py-0.5 rounded-md">
                  in Iran
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify max-w-md">
              سامانه هوشمند و جامع گردشگری ایران؛ همراه شما در کشف جاذبه‌های کهن، شگفتی‌های طبیعی و چیدمان برنامه روزبه‌روز اختصاصی با احترام به هویت و معماری اصیل ایرانی.
            </p>

            <div className="pt-2 text-xs text-amber-200/90 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>«ایران را جوری سفر کن که دوست داری؛ باقی مسیر را با هم می‌چینیم.»</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wider border-b border-white/10 pb-2">
              بخش‌های اصلی سامانه
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button 
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  خانه و صفحه اصلی
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('destinations')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  مقاصد ایران (۳۲ شهر شاخص)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('guide')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  راهنمای سفر و مقایسه وسایل نقلیه
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  نظرات و روایت‌های گردشگران
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('site-feedback')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  ارسال نظر درباره سایت
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('support')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  ارتباط با پشتیبانی
                </button>
              </li>
            </ul>
          </div>

          {/* Featured Destinations (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wider border-b border-white/10 pb-2">
              دسترسی سریع به شهرهای محبوب
            </h4>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {topCities.map(city => (
                <button
                  key={city.id}
                  onClick={() => onSelectCity(city.id)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-amber-300 border border-white/5 text-slate-300 transition-all text-center cursor-pointer"
                >
                  {city.name}
                </button>
              ))}
            </div>

            <div className="pt-3 text-[11px] text-slate-400">
              مجموعه ۳۲ شهر شامل: تهران، اصفهان، شیراز، یزد، کاشان، مشهد، تبریز، چابهار، قشم، کیش، رشت، سنندج، خرم‌آباد، دزفول، شوش و...
            </div>
          </div>

        </div>

        {/* Colorful Prominent Slogan: تمام ایران سرا من است */}
        <div className="py-6 sm:py-8 border-t border-b border-white/10 text-center relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/60 via-amber-950/40 to-teal-950/60 p-4">
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <span className="text-amber-400 text-xl sm:text-2xl animate-pulse">✦</span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-wide bg-gradient-to-r from-amber-300 via-rose-300 via-emerald-300 to-amber-200 bg-clip-text text-transparent drop-shadow-md select-none">
              تمام ایران سرای من است
            </h3>
            <span className="text-amber-400 text-xl sm:text-2xl animate-pulse">✦</span>
          </div>
          <p className="text-xs text-amber-200/70 mt-2 font-medium">
            سرزمین تاریخ، فرهنگ، مهربانی و هزار رنگ پایدار
          </p>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <span>تمامی حقوق مادی و معنوی متعلق به</span>
            <span className="text-amber-300 font-bold">TripMind AI in Iran</span>
            <span>است.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 text-amber-300" />
            <span>بازگشت به ابتدای صفحه</span>
          </button>
        </div>

        {/* Very bottom line: CREATE BY N.P */}
        <div className="pt-4 border-t border-white/5 text-center">
          <span className="text-xs sm:text-sm font-black tracking-widest text-amber-300 bg-black/40 px-5 py-2 rounded-full border border-amber-400/30 shadow-md inline-block">
            CREATE BY N.P
          </span>
        </div>

      </div>
    </footer>
  );
};
