import React from 'react';
import { Scale, Clock, Sparkles, ShieldCheck, Award, HeartHandshake, CheckCircle2, ChevronRight } from 'lucide-react';

export default function TrustPillars() {
  const pillars = [
    {
      icon: Scale,
      title: '100% Digital Weighing Certified',
      urdu: 'سو فیصد درست ڈیجیٹل تول',
      desc: 'Traditional vendors add heavy wet soil or cheat on manual weights. We use high-precision, government-calibrated electronic digital scales.',
      color: 'from-emerald-500 to-green-600',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700'
    },
    {
      icon: Clock,
      title: 'Direct 4:00 AM Mandi Auction',
      urdu: 'صبح ۴ بجے سبزی منڈی سے تازہ خریداری',
      desc: 'We buy directly from farmers and wholesale commission agents at the dawn auction. No stale stock kept in hot warehouses.',
      color: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50',
      text: 'text-blue-700'
    },
    {
      icon: Sparkles,
      title: 'Triple-Stage Washed & Graded',
      urdu: 'تین مرحلہ وار صفائی اور چھانٹی',
      desc: 'Vegetables are washed to remove clay, dirt, and dust before weighing. You only pay for clean, usable food, not mud.',
      color: 'from-amber-500 to-orange-600',
      bg: 'bg-amber-50',
      text: 'text-amber-700'
    },
    {
      icon: ShieldCheck,
      title: 'No-Questions Replacement Guarantee',
      urdu: 'بغیر کسی بحث کے فوری تبدیلی',
      desc: 'If any vegetable or fruit doesn’t meet your culinary standards, our rider replaces it on your doorstep or refunds instantly.',
      color: 'from-rose-500 to-red-600',
      bg: 'bg-rose-50',
      text: 'text-rose-700'
    }
  ];

  return (
    <section className="bg-gradient-to-b from-white via-brand-50/30 to-white py-12 border-t border-gray-100">
      <div className="w-full px-2 sm:px-4 lg:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="bg-brand-100 text-brand-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Why Choose Engineer Sabzi Valy?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            The Engineer’s Standards of Purity & Honesty
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Founded by an engineer who applied scientific precision, fair market economics, and strict hygiene to Pakistan’s vegetable supply chain.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs hover:shadow-hover hover:border-brand-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.text} flex items-center justify-center mb-4 shadow-xs`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs text-brand-800 font-urdu font-semibold mb-1">
                    {item.urdu}
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-50 flex items-center gap-1 text-[11px] font-bold text-brand-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Quality Assured</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Numbers Strip */}
        <div className="mt-10 bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-brand-400">50,000+</div>
            <div className="text-xs text-brand-100 mt-1">Families Served</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-brand-400">100%</div>
            <div className="text-xs text-brand-100 mt-1">Digital Calibrated Scales</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-brand-400">4:00 AM</div>
            <div className="text-xs text-brand-100 mt-1">Dawn Mandi Procurement</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-brand-400">4.9 / 5.0</div>
            <div className="text-xs text-brand-100 mt-1">Customer Rating Average</div>
          </div>
        </div>

      </div>
    </section>
  );
}

