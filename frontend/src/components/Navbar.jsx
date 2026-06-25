import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const dashboardPathFor = (role) => {
  if (role === "provider") return "/provider/dashboard";
  if (role === "admin") return "/admin/dashboard";
  return "/customer/dashboard";
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-extrabold text-ink-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">S</span>
          Service<span className="text-primary-600">Hub</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/providers" className="text-sm font-medium text-ink-700 hover:text-primary-600">
            Find a pro
          </Link>
          {!user && (
            <>
              <Link to="/login" className="text-sm font-medium text-ink-700 hover:text-primary-600">
                Log in
              </Link>
              <Link to="/register" className="btn-primary">
                Get started
              </Link>
            </>
          )}
          {user && (
            <>
              <Link to={dashboardPathFor(user.role)} className="text-sm font-medium text-ink-700 hover:text-primary-600">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn-secondary">
                Log out
              </button>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {open && (
        <div className="flex flex-col gap-3 border-t border-slate-100 bg-white px-6 py-4 md:hidden">
          <Link to="/providers" onClick={() => setOpen(false)} className="text-sm font-medium text-ink-700">
            Find a pro
          </Link>
          {!user && (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="text-sm font-medium text-ink-700">
                Log in
              </Link>
              <Link to="/register" onClick={() => setOpen(false)} className="btn-primary w-fit">
                Get started
              </Link>
            </>
          )}
          {user && (
            <>
              <Link to={dashboardPathFor(user.role)} onClick={() => setOpen(false)} className="text-sm font-medium text-ink-700">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn-secondary w-fit">
                Log out
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
