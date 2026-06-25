import React from "react";
import { Link } from "react-router-dom";

const categoryIcon = {
  Electrician: "⚡",
  Plumber: "🔧",
  Carpenter: "🪚",
  "AC Technician": "❄️",
  Painter: "🎨",
  "Appliance Repair": "🛠️",
};

const ProviderCard = ({ provider }) => {
  return (
    <div className="card group flex flex-col hover:-translate-y-1 hover:shadow-cardHover">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-2xl">
          {categoryIcon[provider.category] || "🔨"}
        </div>
        <span className="badge">{provider.category}</span>
      </div>

      <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{provider.providerName}</h3>
      <p className="mt-1 flex items-center gap-1 text-sm text-ink-500">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        {provider.location}
      </p>

      <p className="mt-3 line-clamp-2 text-sm text-ink-500">{provider.description || "Reliable, experienced and ready to help with your service needs."}</p>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs text-ink-500">Starting at</p>
          <p className="font-display font-bold text-ink-900">₹{provider.pricing}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-ink-500">Experience</p>
          <p className="font-display font-bold text-ink-900">{provider.experience} yrs</p>
        </div>
      </div>

      <Link to={`/providers/${provider._id}`} className="btn-primary mt-5 w-full">
        View profile
      </Link>
    </div>
  );
};

export default ProviderCard;
