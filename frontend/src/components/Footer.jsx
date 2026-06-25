import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-slate-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-extrabold text-ink-900">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600 text-white text-sm">S</span>
            ServiceHub
          </div>
          <p className="mt-3 max-w-xs text-sm text-ink-500">
            Connecting you with verified electricians, plumbers, carpenters and more, in your neighborhood.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-ink-900">For customers</h4>
          <ul className="space-y-2 text-sm text-ink-500">
            <li><Link to="/providers" className="hover:text-primary-600">Browse providers</Link></li>
            <li><Link to="/register" className="hover:text-primary-600">Create an account</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-ink-900">For professionals</h4>
          <ul className="space-y-2 text-sm text-ink-500">
            <li><Link to="/register" className="hover:text-primary-600">List your services</Link></li>
            <li><Link to="/login" className="hover:text-primary-600">Provider login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-ink-900">Company</h4>
          <ul className="space-y-2 text-sm text-ink-500">
            <li>support@servicehub.app</li>
            <li>Mon - Sat, 9am - 7pm</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-100 py-5 text-center text-xs text-ink-500">
        © {new Date().getFullYear()} ServiceHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
