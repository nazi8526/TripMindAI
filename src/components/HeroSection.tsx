import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Coins, 
  Heart, 
  Send, 
  Compass,
  ArrowLeft,
  ChevronDown
} from 'lucide-react';

interface HeroSectionProps {
  onStartPlanning: (initialData?: {
    origin?: string;
    duration?: string;
    budget?: string;
    interest?: string;
  }) => void;
  onExploreDestinations: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onStartPlanning, 
  onExploreDestinations 
}) => {
  const [origin, setOrigin] = useState('تهران');
  const [duration, setDuration] = useState('۴ روز (آخر هفته و تعطیلات)');
  const [budget, setBudget] = useState('متوسط (۵ تا ۱۰ میلیون)');
  const [interest, setInterest] = useState('مکان‌های تاریخی و فرهنگی');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartPlanning({
      origin,
      duration,
      budget,
      interest
    });
  };

  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16 bg-[#FAF7F2]">
      
      {/* Background Decorator / Ambient Light */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-1/3 w-[600px] h-[600px] bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Banner Card (Mirrors the reference image visual hierarchy) */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E3D9C3] bg-gradient-to-b from-[#FAF7F2] to-[#F3EDE2]">
          
          {/* Hero Visual Asset */}
          <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[580px] overflow-hidden">
            {/* The user-provided reference illustration */}
            <img 
              src="/public/assets/aistudio/file_0000000089148210a9b53413e386b1fd_083ca389.png" 
              alt="جاذبه‌های گردشگری و معماری کهن ایران - TripMind AI" 
              className="w-full h-full object-cover object-top filter brightness-[1.02]"
              referrerPolicy="no-referrer"
            />

            {/* Gradient Scrim for Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/25 lg:to-black/80 pointer-events-none" />

            {/* Hero Copy Overlay (Right-aligned in RTL, matching the reference image layout) */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 lg:p-14 text-white">
              
              {/* Top Tagline / Kicker */}
              <div className="flex items-center gap-2 self-start lg:self-end">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-amber-200 border border-white/25">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  نسل نوین گردشگری هوشمند ایران
                </span>
              </div>

              {/* Main Headline & Subtitle */}
              <div className="max-w-2xl self-end text-right space-y-4">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight drop-shadow-md text-white text-balance">
                  ایران را جوری سفر کن که دوست داری
                </h1>

                <p className="text-base sm:text-xl font-medium text-amber-100/95 leading-relaxed drop-shadow-sm max-w-xl">
                  مقصدت را پیدا کن؛ باقی مسیر را با هم می‌چینیم. با چند سؤال ساده، جاذبه‌ها، هتل و برنامه روزبه‌روز اختصاصی خود را دریافت کن.
                </p>

                {/* Primary Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onStartPlanning()}
                    className="flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-extrabold text-[#09382B] bg-gradient-to-r from-[#D4AF37] to-[#F3DE97] hover:from-[#c29b2b] hover:to-[#e7d085] rounded-2xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 text-[#0F4C3A]" />
                    <span>سفر منو طراحی کن</span>
                  </button>

                  <button
                    onClick={onExploreDestinations}
                    className="flex items-center gap-2 px-5 py-3.5 text-sm sm:text-base font-bold text-white bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 rounded-2xl transition-colors cursor-pointer"
                  >
                    <span>مشاهده ۳۲ شهر توریستی</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom spacer for floating search bar */}
              <div className="h-4 sm:h-10 lg:h-12" />
            </div>
          </div>

          {/* Floating Smart Planner Search Bar (Exact layout from the reference image) */}
          <div className="relative -mt-16 sm:-mt-20 mx-4 sm:mx-8 mb-6 z-20">
            <div className="bg-[#FAF7F2] rounded-3xl p-4 sm:p-6 shadow-2xl border border-[#DCD3BE]">
              
              {/* Badge on top */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EAE3D4]">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#0F4C3A] text-amber-300 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    با هوش مصنوعی
                  </span>
                  <span className="text-xs font-semibold text-slate-600 hidden sm:inline">
                    برنامه‌ریزی سریع مسیر، بودجه و هتل‌ها در کمتر از ۱ دقیقه
                  </span>
                </div>
                <span className="text-xs font-medium text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                  ۳۲ مقصد منتخب ایران
                </span>
              </div>

              {/* Interactive Search Inputs Row */}
              <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
                
                {/* 1. مبدأ سفر */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1 text-xs font-bold text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-[#0F4C3A]" />
                    <span>مبدأ سفر</span>
                  </label>
                  <div className="relative">
                    <select
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full appearance-none bg-white border border-[#D5CAAF] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] cursor-pointer"
                    >
                      <option value="تهران">تهران</option>
                      <option value="مشهد">مشهد</option>
                      <option value="اصفهان">اصفهان</option>
                      <option value="شیراز">شیراز</option>
                      <option value="تبریز">تبریز</option>
                      <option value="رشت">رشت</option>
                      <option value="اهواز">اهواز</option>
                      <option value="یزد">یزد</option>
                      <option value="کرمان">کرمان</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* 2. تاریخ یا مدت سفر */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1 text-xs font-bold text-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-[#0F4C3A]" />
                    <span>مدت یا زمان سفر</span>
                  </label>
                  <div className="relative">
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full appearance-none bg-white border border-[#D5CAAF] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] cursor-pointer"
                    >
                      <option value="۲ روز (سفر کوتاه)">۲ روز (سفر کوتاه آخر هفته)</option>
                      <option value="۴ روز (تعطیلات رسمی)">۴ روز (تعطیلات رسمی و کامل)</option>
                      <option value="۷ روز (یک هفته رویایی)">۷ روز (سفر جامع یک هفته‌ای)</option>
                      <option value="۱۰ روز (کشف ایرانگردی)">۱۰ روز (ایرانگردی عمیق)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* 3. بودجه سفر */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1 text-xs font-bold text-slate-700">
                    <Coins className="w-3.5 h-3.5 text-[#0F4C3A]" />
                    <span>بودجه تقریبی سفر</span>
                  </label>
                  <div className="relative">
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full appearance-none bg-white border border-[#D5CAAF] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] cursor-pointer"
                    >
                      <option value="اقتصادی (تا ۵ میلیون)">اقتصادی (بک‌پکری و هاستل)</option>
                      <option value="متوسط (۵ تا ۱۰ میلیون)">متوسط (اقامتگاه سنتی و خانوادگی)</option>
                      <option value="لوکس (۱۰ تا ۲۰ میلیون)">لوکس و راحت (هتل ۵ ستاره)</option>
                      <option value="ویژه (بدون محدودیت)">ویژه و اختصاصی (VIP)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* 4. علایق شما */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1 text-xs font-bold text-slate-700">
                    <Heart className="w-3.5 h-3.5 text-rose-600" />
                    <span>علایق اصلی شما</span>
                  </label>
                  <div className="relative">
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full appearance-none bg-white border border-[#D5CAAF] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] cursor-pointer"
                    >
                      <option value="طبیعت‌گردی و کوهستان">طبیعت‌گردی، جنگل و کوهستان</option>
                      <option value="مکان‌های تاریخی و فرهنگی">مکان‌های تاریخی و شاهکارهای کهن</option>
                      <option value="دریا و سواحل جنوب و شمال">دریا، ساحل و تفریحات آبی</option>
                      <option value="کویرنوردی و رصد ستارگان">کویرنوردی و شب‌های پرستاره</option>
                      <option value="غذاهای محلی و شکم‌گردی">غذاهای محلی و رستوران‌های سنتی</option>
                      <option value="آرامش و استراحت">آرامش، بوم‌گردی و ریلکسیشن</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* 5. دکمه جستجو */}
                <div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0F4C3A] hover:bg-[#09382B] text-white font-extrabold text-sm rounded-xl shadow-md transition-all cursor-pointer group"
                  >
                    <span>جستجو</span>
                    <Send className="w-4 h-4 text-amber-300 transition-transform group-hover:-translate-x-1" />
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
