import React from "react";

const StatCard = ({ label, value, icon, accent = "primary" }) => {
  const accentClasses = {
    primary: "bg-primary-50 text-primary-700",
    accent: "bg-accent-400/10 text-accent-600",
  };

  return (
    <div className="card flex items-center gap-4">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${accentClasses[accent]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-ink-500">{label}</p>
        <p className="font-display text-2xl font-extrabold text-ink-900">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
