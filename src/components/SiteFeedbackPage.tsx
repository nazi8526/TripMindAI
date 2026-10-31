import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  Star, 
  CheckCircle, 
  AlertCircle, 
  Info,
  Clock
} from 'lucide-react';

export const SiteFeedbackPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('طراحی و ظاهر سایت');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const defaultFeedbacks = [
    {
      name: 'امیررضا بهرامی',
      subject: 'طراحی و ظاهر سایت',
      message: 'طراحی بر پایه رنگ سبز زمردی و نقوش ایرانی واقعاً حس اصالت به سایت داده. برنامه روزبه‌روز شهر اصفهان خیلی کارآمد بود.',
      rating: 5,
      date: 'امروز',
    },
    {
      name: 'سحر منصوری',
      subject: 'پیشنهاد امکانات',
      message: 'اضافه شدن فیلتر بودجه خیلی به تصمیم‌گیری کمک کرد. عالیه که ۳۲ شهر پوشش داده شده.',
      rating: 5,
      date: 'دیروز',
    },
  ];

  const [recentFeedbacks, setRecentFeedbacks] = useState<Array<{
    name: string;
    subject: string;
    message: string;
    rating: number;
    date: string;
    isUserSubmitted?: boolean;
  }>>(() => {
    try {
      const saved = localStorage.getItem('tripmind_user_feedbacks');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return defaultFeedbacks;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'لطفاً نام خود را وارد کنید.';
    }
    if (!message.trim() || message.trim().length < 10) {
      newErrors.message = 'لطفاً متن نظر خود را با حداقل ۱۰ کاراکتر بنویسید.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success save
    setErrors({});
    const newEntry = {
      name: name.trim(),
      subject,
      message: message.trim(),
      rating,
      date: 'هم‌اکنون',
      isUserSubmitted: true,
    };

    const updated = [newEntry, ...recentFeedbacks];
    setRecentFeedbacks(updated);
    try {
      localStorage.setItem('tripmind_user_feedbacks', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>صدای کاربران و مخاطبان</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#0F4C3A] tracking-tight">
            نظر شما درباره سایت ما
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            دیدگاه‌ها، پیشنهادها و انتقادات شما درباره امکانات، طراحی و تجربه کاربری وبسایت TripMind AI را با اشتیاق می‌خوانیم.
          </p>
        </div>

        {/* Demo status alert as requested */}
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-black block mb-0.5">وضعیت آزمایشی ذخیره‌سازی:</span>
            <span>
              نظرات ارسالی در این نسخه در حافظه محلی مرورگر ثبت می‌شوند. پس از پیاده‌سازی کامل بک‌اند، اطلاعات در دیتابیس پایدار ذخیره خواهند شد.
            </span>
          </div>
        </div>

        {/* Feedback Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-[#E1D7C1]">
          {submitted ? (
            <div className="text-center py-10 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                نظر ارزشمند شما با موفقیت ثبت شد!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                از اینکه وقت گذاشتید و تجربه خود را با تیم TripMind AI به اشتراک گذاشتید بی‌نهایت سپاسگزاریم. دیدگاه شما در ارتقای کیفیت سامانه به کار گرفته خواهد شد.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-6 py-2.5 bg-[#0F4C3A] text-white text-xs font-bold rounded-xl hover:bg-[#09382B] transition-colors cursor-pointer"
              >
                ارسال یک نظر دیگر
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 block">
                    نام و نام خانوادگی <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: سارا محمدی"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full bg-[#FAF7F2] border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] ${
                      errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-[#D5CAAF]'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email / Contact */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 block">
                    ایمیل یا شماره تماس (اختیاری)
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#D5CAAF] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
                  />
                </div>
              </div>

              {/* Subject & Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 block">
                    موضوع نظر <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#D5CAAF] rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] cursor-pointer"
                  >
                    <option value="طراحی و ظاهر سایت">طراحی، رنگ‌بندی و هویت بصری سایت</option>
                    <option value="برنامه‌ریز هوشمند سفر">کیفیت برنامه‌ریز سفر و پیشنهادها</option>
                    <option value="اطلاعات شهرهای ایران">محتوا و اطلاعات ۳۲ شهر توریستی</option>
                    <option value="پیشنهاد امکانات جدید">پیشنهاد امکانات و فیچرهای جدید</option>
                    <option value="گزارش باگ یا اشکال">گزارش مشکل فنی یا خطای محتوایی</option>
                    <option value="سایر موارد">سایر موضوعات</option>
                  </select>
                </div>

                {/* Rating */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 block">
                    امتیاز شما به وبسایت TripMind AI
                  </label>
                  <div className="flex items-center gap-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer transition-transform hover:scale-110"
                        title={`${star} ستاره`}
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-black text-slate-700 mr-2">
                      ({rating} از ۵)
                    </span>
                  </div>
                </div>

              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 block">
                  متن نظر و پیشنهاد <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="دیدگاه یا تجربه کار با سایت را با جزئیات بنویسید..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full bg-[#FAF7F2] border rounded-2xl p-3.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] leading-relaxed ${
                    errors.message ? 'border-rose-400 bg-rose-50/30' : 'border-[#D5CAAF]'
                  }`}
                />
                {errors.message && (
                  <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 py-3 px-8 bg-[#0F4C3A] hover:bg-[#09382B] text-white font-extrabold text-sm rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>ثبت و ارسال نظر</span>
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Recent Site Feedbacks (Demonstration of community feedback) */}
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-[#0F4C3A] flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>دیدگاه‌های اخیر کاربران درباره سایت:</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentFeedbacks.map((fb, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-[#E3DAC4] shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">{fb.name}</span>
                    {fb.isUserSubmitted && (
                      <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-md">
                        نظر شما (ذخیره‌شده)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(fb.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md inline-block">
                  {fb.subject}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {fb.message}
                </p>
                <div className="text-[10px] text-slate-400 text-left pt-1">
                  ثبت شده در {fb.date}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
