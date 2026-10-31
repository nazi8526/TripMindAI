import React from 'react';
import { CityData } from '../data/citiesData';
import { 
  X, 
  MapPin, 
  Calendar, 
  Utensils, 
  Gift, 
  Landmark, 
  Trees, 
  Bed, 
  Compass, 
  MessageSquare,
  Sparkles,
  Star
} from 'lucide-react';

interface CityDetailModalProps {
  city: CityData | null;
  onClose: () => void;
  onPlanTripToCity: (city: CityData) => void;
  onViewCityReviews: (city: CityData) => void;
}

export const CityDetailModal: React.FC<CityDetailModalProps> = ({
  city,
  onClose,
  onPlanTripToCity,
  onViewCityReviews,
}) => {
  if (!city) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#D5CAAF] overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer shadow-md"
          aria-label="بستن پنجره"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. تصویر بزرگ و جذاب شهر */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-slate-900">
          <img
            src={city.coverImage}
            alt={city.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* 2. نام شهر و استان */}
          <div className="absolute bottom-6 right-6 left-6 text-white text-right">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-amber-500/90 text-stone-900 text-xs font-black px-2.5 py-1 rounded-lg">
                استان {city.province}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                منطقه {city.region} ایران
              </span>
              <span className="flex items-center gap-1 text-amber-300 text-xs font-bold mr-auto">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{city.rating}</span>
                <span className="text-white/80">({city.reviewsCount} نظر نمونه)</span>
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-2">
              سفر به {city.name}
            </h2>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 text-xs font-medium text-amber-100">
              {city.tags.map(t => (
                <span key={t} className="bg-black/40 px-2 py-0.5 rounded-md border border-white/20">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Body: The 10 sections */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          
          {/* Quick Info Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-white rounded-2xl border border-[#E5DCBE]">
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <Calendar className="w-4 h-4 text-[#0F4C3A]" />
              <span className="font-bold">بهترین فصل سفر:</span>
              <span>{city.bestSeason}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <Compass className="w-4 h-4 text-[#0F4C3A]" />
              <span className="font-bold">مدت اقامت پیشنهادی:</span>
              <span>{city.suggestedStayDays} روز</span>
            </div>
          </div>

          {/* 3. معرفی شهر در ۳ تا ۵ خط */}
          <section className="space-y-2">
            <h3 className="text-lg font-black text-[#0F4C3A] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              معرفی {city.name}
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-justify">
              {city.shortIntro}
            </p>
          </section>

          {/* 4. تاریخچه شهر */}
          <section className="space-y-2">
            <h3 className="text-lg font-black text-[#0F4C3A] flex items-center gap-2">
              <Landmark className="w-5 h-5 text-[#0F4C3A]" />
              تاریخچه و پیشینه تاریخی
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed text-justify bg-white/60 p-4 rounded-2xl border border-[#EAE3D2]">
              {city.history}
            </p>
          </section>

          {/* Grid for 5 & 6: جاذبه‌های تاریخی و طبیعی */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 5. جاذبه‌های تاریخی */}
            <div className="bg-white p-5 rounded-2xl border border-[#E5DCBE] space-y-3">
              <h4 className="text-base font-black text-[#0F4C3A] flex items-center gap-2">
                <Landmark className="w-4 h-4 text-amber-700" />
                جاذبه‌های تاریخی و باستانی
              </h4>
              <ul className="space-y-2">
                {city.historicalAttractions.map((item, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 6. جاذبه‌های طبیعی */}
            <div className="bg-white p-5 rounded-2xl border border-[#E5DCBE] space-y-3">
              <h4 className="text-base font-black text-[#0F4C3A] flex items-center gap-2">
                <Trees className="w-4 h-4 text-emerald-700" />
                جاذبه‌های طبیعی و گردشگری
              </h4>
              <ul className="space-y-2">
                {city.naturalAttractions.map((item, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Grid for 7 & 8: غذاهای محلی و سوغات */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 7. غذاهای محلی */}
            <div className="bg-white p-5 rounded-2xl border border-[#E5DCBE] space-y-3">
              <h4 className="text-base font-black text-[#0F4C3A] flex items-center gap-2">
                <Utensils className="w-4 h-4 text-rose-700" />
                غذاهای محلی و اصیل
              </h4>
              <ul className="space-y-2">
                {city.localFoods.map((item, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 8. صنایع‌دستی و سوغات */}
            <div className="bg-white p-5 rounded-2xl border border-[#E5DCBE] space-y-3">
              <h4 className="text-base font-black text-[#0F4C3A] flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-700" />
                صنایع‌دستی و سوغات شاخص
              </h4>
              <ul className="space-y-2">
                {city.souvenirs.map((item, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* 9. فعالیت‌های گردشگری */}
          <section className="bg-[#FAF4EA] p-5 rounded-2xl border border-[#E0D4BA] space-y-3">
            <h4 className="text-base font-black text-[#0F4C3A] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#0F4C3A]" />
              فعالیت‌های پیشنهادی در طول سفر
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {city.activities.map((act, i) => (
                <div key={i} className="bg-white/80 p-3 rounded-xl border border-amber-200/50 text-xs text-slate-800 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 10. پیشنهادهای اقامت */}
          <section className="space-y-3">
            <h4 className="text-base font-black text-[#0F4C3A] flex items-center gap-2">
              <Bed className="w-4 h-4 text-[#0F4C3A]" />
              پیشنهادهای اقامت (هتل‌ها و اقامتگاه‌های سنتی)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {city.accommodations.map((acc, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-[#E5DCBE] space-y-1.5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block mb-1">
                      {acc.type}
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                      {acc.name}
                    </h5>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    {acc.note}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#F3EDE2] border-t border-[#E3D9C3] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onViewCityReviews(city);
            }}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#0F4C3A] bg-white border border-[#D5CAAF] rounded-xl hover:bg-emerald-50 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-emerald-700" />
            <span>مشاهده نظرات و تجربیات گردشگران ({city.reviews.length} نظر نمونه)</span>
          </button>

          <div className="flex items-center gap-2 mr-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              بستن
            </button>

            <button
              onClick={() => {
                onClose();
                onPlanTripToCity(city);
              }}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-black text-white bg-[#0F4C3A] hover:bg-[#09382B] rounded-xl shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>طراحی برنامه سفر برای {city.name}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
