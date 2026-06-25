import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", role: "customer" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await register(form);
      if (data.role === "provider") navigate("/provider/dashboard");
      else navigate("/customer/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-6 py-16">
      <div className="card w-full max-w-md">
        <h1 className="font-display text-2xl font-extrabold text-ink-900">Create your account</h1>
        <p className="mt-1 text-sm text-ink-500">Join ServiceHub as a customer or a service provider.</p>

        {error && (
          <div className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="label-field">I want to</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "customer" })}
                className={`rounded-xl border px-4 py-2.5 text-sm font-semibold ${form.role === "customer" ? "border-primary-500 bg-primary-50 text-primary-700" : "border-slate-200 text-ink-500"}`}
              >
                Hire a professional
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "provider" })}
                className={`rounded-xl border px-4 py-2.5 text-sm font-semibold ${form.role === "provider" ? "border-primary-500 bg-primary-50 text-primary-700" : "border-slate-200 text-ink-500"}`}
              >
                Offer my services
              </button>
            </div>
          </div>

          <div>
            <label className="label-field">Full name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="input-field" placeholder="Priya Sharma" />
          </div>

          <div>
            <label className="label-field">Email address</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="input-field" placeholder="you@example.com" />
          </div>

          <div>
            <label className="label-field">Phone number</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="98765 43210" />
          </div>

          <div>
            <label className="label-field">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} className="input-field" placeholder="At least 6 characters" />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary-600">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
