import React from 'react';
import { 
  Compass, 
  BedDouble, 
  CalendarRange, 
  Car, 
  Calculator 
} from 'lucide-react';

interface FeaturesStripProps {
  onFeatureClick?: (featureId: string) => void;
}

export const FeaturesStrip: React.FC<FeaturesStripProps> = ({ onFeatureClick }) => {
  const features = [
    {
      id: 'smart-destination',
      title: 'پیشنهاد مقصد هوشمند',
      desc: 'بر اساس علایق و بودجه شما',
      icon: <Compass className="w-6 h-6 text-[#0F4C3A]" />,
    },
    {
      id: 'lodging',
      title: 'اقامتگاه‌های مناسب',
      desc: 'هتل‌ها، اقامتگاه‌های بوم‌گردی و سنتی',
      icon: <BedDouble className="w-6 h-6 text-[#0F4C3A]" />,
    },
    {
      id: 'custom-itinerary',
      title: 'برنامه سفر اختصاصی',
      desc: 'بهترین زمان‌ها و مناسب‌ترین مسیرها',
      icon: <CalendarRange className="w-6 h-6 text-[#0F4C3A]" />,
    },
    {
      id: 'transport-compare',
      title: 'مقایسه وسیله نقلیه',
      desc: 'هواپیما، قطار، اتوبوس و خودرو شخصی',
      icon: <Car className="w-6 h-6 text-[#0F4C3A]" />,
    },
    {
      id: 'budget-calculator',
      title: 'محاسبه هزینه سفر',
      desc: 'شفاف، تفکیک‌شده و دقیق',
      icon: <Calculator className="w-6 h-6 text-[#0F4C3A]" />,
    },
  ];

  return (
    <section className="py-6 sm:py-10 bg-[#F4EFE6]/70 border-y border-[#E5DCBE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-[#E2D6BA]">
          {features.map((item, idx) => (
            <div 
              key={item.id}
              onClick={() => onFeatureClick?.(item.id)}
              className={`flex flex-col items-center text-center p-3 cursor-pointer group transition-all duration-200 hover:translate-y-[-2px] ${
                idx > 0 ? 'pt-4 md:pt-3' : ''
              }`}
            >
              {/* Distinctive Round Badge Matching Reference */}
              <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border-2 border-[#D5CAAF] flex items-center justify-center shadow-xs mb-3 group-hover:border-[#0F4C3A] group-hover:bg-emerald-50/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-emerald-100/60 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-sm sm:text-base font-extrabold text-[#0F4C3A] mb-1 group-hover:text-emerald-950 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 max-w-[190px] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
