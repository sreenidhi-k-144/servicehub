import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const dashboardPathFor = (role) => {
  if (role === "provider") return "/provider/dashboard";
  if (role === "admin") return "/admin/dashboard";
  return "/customer/dashboard";
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(form);
      navigate(dashboardPathFor(data.role));
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-6 py-16">
      <div className="card w-full max-w-md">
        <h1 className="font-display text-2xl font-extrabold text-ink-900">Welcome back</h1>
        <p className="mt-1 text-sm text-ink-500">Log in to manage your bookings or services.</p>

        {error && (
          <div className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="label-field">Email address</label>
            <input
              type="email"
              required
              className="input-field"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="label-field">Password</label>
            <input
              type="password"
              required
              className="input-field"
              placeholder="Your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-500">
          New to ServiceHub?{" "}
          <Link to="/register" className="font-semibold text-primary-600">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
