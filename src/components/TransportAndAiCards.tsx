import React, { useState } from 'react';
import { 
  Plane, 
  Train, 
  Bus, 
  Car, 
  Sparkles, 
  MessageSquare, 
  Check, 
  ArrowLeft 
} from 'lucide-react';

interface TransportAndAiCardsProps {
  onOpenPlannerWithPreference: (prompt: string) => void;
  onOpenTransportGuide: () => void;
}

export const TransportAndAiCards: React.FC<TransportAndAiCardsProps> = ({
  onOpenPlannerWithPreference,
  onOpenTransportGuide,
}) => {
  const [selectedTransport, setSelectedTransport] = useState<string>('train');
  const [activePreference, setActivePreference] = useState<string>('بیشتر طبیعت');

  const transports = [
    {
      id: 'flight',
      title: 'هواپیما',
      tagline: 'سریع و راحت',
      sub: 'مناسب مسافت‌های طولانی',
      icon: <Plane className="w-5 h-5 text-emerald-800" />,
      color: 'bg-sky-50 border-sky-200',
    },
    {
      id: 'train',
      title: 'قطار',
      tagline: 'آرام و اقتصادی',
      sub: 'مناسب مسیرهای خاص و کویری',
      icon: <Train className="w-5 h-5 text-emerald-800" />,
      color: 'bg-emerald-50 border-emerald-200',
    },
    {
      id: 'bus',
      title: 'اتوبوس',
      tagline: 'اقتصادی و در دسترس',
      sub: 'مناسب سفرهای شبانه و کم‌هزینه',
      icon: <Bus className="w-5 h-5 text-emerald-800" />,
      color: 'bg-amber-50 border-amber-200',
    },
    {
      id: 'car',
      title: 'خودرو شخصی',
      tagline: 'آزادی عمل بیشتر',
      sub: 'مناسب سفرهای خانوادگی و ماجراجویانه',
      icon: <Car className="w-5 h-5 text-emerald-800" />,
      color: 'bg-stone-50 border-stone-200',
    },
  ];

  const quickCustomizations = [
    'ارزان‌ترش کن',
    'بیشتر طبیعت',
    'غذاهای محلی بیشتر',
    'بناهای تاریخی بیشتر',
    'آرامش و سکوت',
  ];

  return (
    <section className="py-8 sm:py-12 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Transport Comparison (7 cols on lg) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DAC4] shadow-md flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-[#0F4C3A] mb-1.5">
                  بهترین وسیله نقلیه برای سفرت کدام است؟
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  با توجه به بودجه، زمان و شرایط سفر، مناسب‌ترین گزینه را انتخاب کن.
                </p>
              </div>

              {/* 4 Transport Options Matching Reference */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {transports.map((t) => {
                  const isSelected = selectedTransport === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTransport(t.id)}
                      className={`p-3 rounded-2xl border transition-all text-center flex flex-col justify-between cursor-pointer ${
                        isSelected 
                          ? 'border-[#0F4C3A] bg-emerald-50/70 shadow-sm ring-2 ring-[#0F4C3A]/20' 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div>
                        {/* Icon Badge */}
                        <div className="w-10 h-10 mx-auto rounded-full bg-white shadow-xs border border-slate-100 flex items-center justify-center mb-2">
                          {t.icon}
                        </div>
                        <h4 className="text-sm font-black text-slate-800 mb-1">
                          {t.title}
                        </h4>
                        <div className="text-[11px] font-bold text-emerald-800 leading-tight mb-1">
                          {t.tagline}
                        </div>
                        <div className="text-[10px] text-slate-500 leading-normal line-clamp-2">
                          {t.sub}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTransport(t.id);
                          onOpenTransportGuide();
                        }}
                        className={`mt-3 w-full py-1.5 px-2 text-[11px] font-bold rounded-xl transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#0F4C3A] text-white'
                            : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
                        }`}
                      >
                        مقایسه و انتخاب
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>راهنمای جامع فواصل، هزینه‌ها و مدت زمان سفر میان شهرهای ایران</span>
              <button 
                onClick={onOpenTransportGuide}
                className="font-bold text-[#0F4C3A] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>مشاهده جدول مقایسه</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: AI Dynamic Customizer (5 cols on lg) */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-[#D8CEB7] shadow-md bg-gradient-to-br from-[#F5EFE6] to-[#EBE0CD] p-6 sm:p-8 flex flex-col justify-between">
            
            {/* Visual background element */}
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#0F4C3A] text-amber-300">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0F4C3A]">
                    برنامه سفرت رو تغییر بده!
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    هر زمان می‌تونی شرایط جدیدت رو بگی تا برنامه رو برات بازنویسی کنیم.
                  </p>
                </div>
              </div>

              {/* Quick Customization Buttons (Matching Reference Image) */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-700 block">
                  تغییر سریع سبک برنامه:
                </span>
                <div className="flex flex-wrap gap-2">
                  {quickCustomizations.map((item) => {
                    const isPicked = activePreference === item;
                    return (
                      <button
                        key={item}
                        onClick={() => setActivePreference(item)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                          isPicked
                            ? 'bg-[#0F4C3A] text-white border-[#0F4C3A] shadow-xs'
                            : 'bg-white/80 text-slate-700 border-[#D5CAAF] hover:bg-white'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom AI Trigger Button */}
            <div className="relative z-10 pt-6">
              <button
                onClick={() => onOpenPlannerWithPreference(activePreference)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#0F4C3A] hover:bg-[#09382B] text-white font-black text-sm rounded-2xl shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-amber-300" />
                <span>گفت‌وگو و تنظیم هوشمند با «{activePreference}»</span>
              </button>
            </div>

          </div>

        </div>

        {/* Traditional Persian Ornamental Divider (Matching Reference Image) */}
        <div className="mt-14 mb-4 flex items-center justify-center">
          <div className="flex items-center gap-4 text-center">
            <div className="w-16 sm:w-32 h-[1px] bg-gradient-to-r from-transparent to-[#C59B38]" />
            <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-[#0F4C3A] tracking-wider">
              <span className="text-[#C59B38] text-lg">✦</span>
              <span>ایران، سرزمین هزار رنگ، هزار داستان ...</span>
              <span className="text-[#C59B38] text-lg">✦</span>
            </div>
            <div className="w-16 sm:w-32 h-[1px] bg-gradient-to-l from-transparent to-[#C59B38]" />
          </div>
        </div>

      </div>
    </section>
  );
};
