import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Electrician", icon: "⚡", desc: "Wiring, fittings & repairs" },
  { name: "Plumber", icon: "🔧", desc: "Leaks, pipes & installations" },
  { name: "Carpenter", icon: "🪚", desc: "Furniture & woodwork" },
  { name: "AC Technician", icon: "❄️", desc: "Service, gas & installation" },
  { name: "Painter", icon: "🎨", desc: "Interior & exterior painting" },
  { name: "Appliance Repair", icon: "🛠️", desc: "Washing machines, fridges & more" },
];

const steps = [
  { title: "Tell us what you need", desc: "Pick a category and browse vetted professionals near you." },
  { title: "Compare & choose", desc: "Check experience, pricing and reviews before deciding." },
  { title: "Book in seconds", desc: "Pick a date and share your budget — the pro takes it from there." },
];

const Landing = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="section-eyebrow">Trusted local professionals</span>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-ink-900 md:text-5xl">
              Get the job done by a pro who actually shows up.
            </h1>
            <p className="mt-5 max-w-md text-lg text-ink-500">
              ServiceHub connects you with verified electricians, plumbers, carpenters and more — book in minutes, set your own budget, no haggling.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/providers" className="btn-primary text-base">
                Find a professional
              </Link>
              <Link to="/register" className="btn-secondary text-base">
                List your services
              </Link>
            </div>
            <div className="mt-10 flex gap-8 text-sm text-ink-500">
              <div>
                <p className="font-display text-2xl font-extrabold text-ink-900">2,400+</p>
                <p>Verified professionals</p>
              </div>
              <div>
                <p className="font-display text-2xl font-extrabold text-ink-900">18,000+</p>
                <p>Jobs completed</p>
              </div>
              <div>
                <p className="font-display text-2xl font-extrabold text-ink-900">4.7/5</p>
                <p>Average rating</p>
              </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="card -rotate-2 absolute left-6 top-8 w-64">
              <p className="text-sm font-semibold text-ink-900">⚡ Ramesh Kumar</p>
              <p className="text-xs text-ink-500">Electrician · 8 yrs experience</p>
              <p className="mt-2 text-xs text-emerald-600 font-semibold">Booking accepted</p>
            </div>
            <div className="card rotate-2 ml-24 mt-32 w-64">
              <p className="text-sm font-semibold text-ink-900">🔧 Asha Plumbing Co.</p>
              <p className="text-xs text-ink-500">Plumber · 5 yrs experience</p>
              <p className="mt-2 text-xs text-primary-600 font-semibold">Starting at ₹399</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <span className="section-eyebrow">What do you need help with?</span>
          <h2 className="font-display text-3xl font-extrabold text-ink-900">Browse by category</h2>
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.name}
              to={`/providers?category=${encodeURIComponent(c.name)}`}
              className="card flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-cardHover"
            >
              <span className="text-3xl">{c.icon}</span>
              <p className="mt-3 font-display font-bold text-ink-900">{c.name}</p>
              <p className="mt-1 text-xs text-ink-500">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-ink-900 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <span className="section-eyebrow">Simple by design</span>
            <h2 className="font-display text-3xl font-extrabold text-white">How ServiceHub works</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="font-display text-3xl font-extrabold text-accent-500">0{i + 1}</span>
                <h3 className="mt-4 font-display text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col items-center justify-between gap-8 rounded-3xl bg-primary-600 px-8 py-12 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-white md:text-3xl">
              Are you a skilled professional?
            </h2>
            <p className="mt-2 max-w-md text-primary-100">
              Create your profile, set your pricing, and start getting bookings from customers in your area today.
            </p>
          </div>
          <Link to="/register" className="btn-accent shrink-0 text-base">
            Join as a provider
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
