import React, { useState } from 'react';
import { Star, CheckCircle, ChevronDown, MessageSquare, Quote, HelpCircle } from 'lucide-react';

export default function CustomerReviews() {
  const [openFaq, setOpenFaq] = useState(0);

  const reviews = [
    {
      name: 'Dr. Fatima Tariq',
      location: 'DHA Phase 5, Lahore',
      rating: 5,
      date: 'Yesterday',
      comment: 'The potatoes and onions were completely dry and soil-free. When I checked the weight on my own kitchen digital scale, it was exact to the gram! Never going back to street vendors.',
      verified: true
    },
    {
      name: 'Engr. Zeeshan Haider',
      location: 'Johar Town, Lahore',
      rating: 5,
      date: '3 days ago',
      comment: 'As a fellow engineer, I deeply appreciate the transparency. The daily Mandi rate card lets me see exactly what wholesale rates are. Great quality Chaunsa mangoes and Bhindi.',
      verified: true
    },
    {
      name: 'Mrs. Sabeen Raza',
      location: 'Model Town, Lahore',
      rating: 5,
      date: '1 week ago',
      comment: 'The Weekly Family Bachat Basket is a lifesaver for our household of five. Everything from green chillies to ginger came fresh, neatly packed in food-grade bags.',
      verified: true
    }
  ];

  const faqs = [
    {
      q: 'How does Engineer Sabzi Valy guarantee accurate weight?',
      a: 'Unlike traditional carts that use rusted stone weights or manipulate manual scales, every single order is weighed on government-calibrated digital electronic scales. Produce is pre-cleaned so you do not pay for heavy wet mud or soil.'
    },
    {
      q: 'What are your delivery timings and areas?',
      a: 'We deliver across major sectors of Lahore (DHA, Gulberg, Johar Town, Bahria, Model Town, Cantt). Delivery slots run morning (8-11:30 AM), afternoon (1-4:30 PM), and evening (5:30-9 PM).'
    },
    {
      q: 'What is your return / replacement policy?',
      a: 'We offer an unconditional 100% replacement guarantee. If any vegetable or fruit does not meet your quality expectations, inform us on WhatsApp and our delivery rider will replace it on your doorstep or refund the amount.'
    },
    {
      q: 'Can I send fresh vegetables and fruit baskets to my parents from abroad?',
      a: 'Yes! Hundreds of overseas Pakistanis in the UK, UAE, USA, and Canada order through our website or WhatsApp to send fresh groceries directly to their families in Lahore .'
    }
  ];

  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200/60">
      <div className="w-full px-2 sm:px-4 lg:px-6">
        
        {/* Reviews Title */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="bg-brand-100 text-brand-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Customer Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Loved by 50,000+ Pakistani Kitchens
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Real feedback from home chefs, working professionals, and families.
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400">{rev.date}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-gray-900">{rev.name}</h4>
                  <p className="text-[11px] text-gray-400">{rev.location}</p>
                </div>
                {rev.verified && (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                    <CheckCircle className="w-3 h-3" />
                    Verified Order
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FAQs Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Frequently Asked Questions (عمومی سوالات)
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Everything you need to know about our sourcing, digital scales, and delivery
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-gray-800 flex items-center justify-between gap-3 cursor-pointer hover:bg-gray-50"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-brand-600 shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-brand-600' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

