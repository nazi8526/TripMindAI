import React, { useState } from 'react';
import { CityData } from '../data/citiesData';
import { Heart, ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';

interface PopularDestinationsProps {
  cities: CityData[];
  onSelectCity: (city: CityData) => void;
  onViewAllDestinations: () => void;
}

export const PopularDestinations: React.FC<PopularDestinationsProps> = ({
  cities,
  onSelectCity,
  onViewAllDestinations,
}) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [startIndex, setStartIndex] = useState(0);

  // Pick top 8 popular cities for the homepage carousel
  const featuredCities = cities.slice(0, 8);
  const itemsPerPage = 4; // on large screens
  const maxIndex = Math.max(0, featuredCities.length - itemsPerPage);

  const toggleFavorite = (cityId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({
      ...prev,
      [cityId]: !prev[cityId]
    }));
  };

  const handlePrev = () => {
    setStartIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex(prev => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Matching Reference Image) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" />
              </svg>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F4C3A]">
                مقاصد محبوب ایران
              </h2>
            </div>
            <p className="text-sm font-medium text-slate-600">
              با توجه به علایق و بودجه، بهترین مقاصد را کشف کنید.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onViewAllDestinations}
              className="flex items-center gap-1.5 text-sm font-bold text-[#0F4C3A] hover:text-[#09382B] transition-colors cursor-pointer group"
            >
              <span>مشاهده همه مقاصد ({cities.length} شهر)</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </button>

            {/* Slider Navigation Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={startIndex === 0}
                className="w-9 h-9 rounded-full bg-white border border-[#D5CAAF] flex items-center justify-center text-slate-700 hover:bg-[#0F4C3A] hover:text-white hover:border-[#0F4C3A] disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-xs"
                aria-label="قبلی"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={startIndex >= maxIndex}
                className="w-9 h-9 rounded-full bg-white border border-[#D5CAAF] flex items-center justify-center text-slate-700 hover:bg-[#0F4C3A] hover:text-white hover:border-[#0F4C3A] disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-xs"
                aria-label="بعدی"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel / Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCities.slice(startIndex, startIndex + itemsPerPage).map((city) => {
            const isFav = !!favorites[city.id];
            return (
              <div
                key={city.id}
                onClick={() => onSelectCity(city)}
                className="bg-white rounded-3xl p-3.5 border border-[#E3DAC4] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
              >
                {/* Image Container with Favorite Button */}
                <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 to-emerald-100">
                  <img
                    src={city.coverImage}
                    alt={city.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback gradient if file fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Fallback pattern underneath */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${city.fallbackGradient} -z-10 flex items-center justify-center text-white text-xl font-bold`}>
                    {city.name}
                  </div>

                  {/* Favorite Heart Toggle */}
                  <button
                    onClick={(e) => toggleFavorite(city.id, e)}
                    className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors cursor-pointer"
                    aria-label="نشان کردن به عنوان علاقه‌مندی"
                  >
                    <Heart 
                      className={`w-4 h-4 transition-colors ${
                        isFav ? 'fill-rose-500 text-rose-500' : 'text-white'
                      }`} 
                    />
                  </button>

                  {/* Region badge */}
                  <div className="absolute bottom-2.5 right-2.5 bg-black/50 backdrop-blur-md text-amber-200 text-[11px] font-bold px-2 py-0.5 rounded-lg">
                    استان {city.province}
                  </div>
                </div>

                {/* Card Content */}
                <div className="pt-3.5 pb-2 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-black text-[#0F4C3A] mb-1">
                      {city.name}
                    </h3>

                    {/* Tags with diamond separators (Exact match to reference) */}
                    <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium py-1">
                      {city.tags.slice(0, 3).map((tag, i) => (
                        <React.Fragment key={tag}>
                          <span>{tag}</span>
                          {i < 2 && <span className="text-amber-600 text-[9px]">♦</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Button: «مشاهده جزئیات» (Deep emerald rounded button from reference) */}
                  <div className="pt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCity(city);
                      }}
                      className="w-full py-2.5 px-4 bg-[#0F4C3A] hover:bg-[#09382B] text-white text-xs font-bold rounded-2xl transition-all shadow-xs group-hover:shadow-md cursor-pointer"
                    >
                      مشاهده جزئیات
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
