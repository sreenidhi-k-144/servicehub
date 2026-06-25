import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProviderById } from "../services/providerService";
import { createBooking } from "../services/bookingService";

const BookAppointment = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [form, setForm] = useState({ serviceDate: "", budgetAmount: "", notes: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const data = await getProviderById(providerId);
        setProvider(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProvider();
  }, [providerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createBooking({ provider: providerId, ...form, budgetAmount: Number(form.budgetAmount) });
      setSuccess(true);
      setTimeout(() => navigate("/customer/bookings"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Could not create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">Schedule an appointment</h1>
      {provider && (
        <p className="mt-1 text-ink-500">
          Booking with <span className="font-semibold text-ink-900">{provider.providerName}</span> ({provider.category})
        </p>
      )}

      {success ? (
        <div className="card mt-6 text-center">
          <p className="font-display text-lg font-bold text-emerald-600">Booking request sent!</p>
          <p className="mt-1 text-ink-500">Redirecting to your booking history...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card mt-6 space-y-4">
          {error && <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</div>}

          <div>
            <label className="label-field">Preferred service date</label>
            <input
              type="date"
              required
              className="input-field"
              value={form.serviceDate}
              onChange={(e) => setForm({ ...form, serviceDate: e.target.value })}
            />
          </div>

          <div>
            <label className="label-field">Approximate budget (₹)</label>
            <input
              type="number"
              min="0"
              required
              className="input-field"
              placeholder="e.g. 1500"
              value={form.budgetAmount}
              onChange={(e) => setForm({ ...form, budgetAmount: e.target.value })}
            />
          </div>

          <div>
            <label className="label-field">Notes for the provider (optional)</label>
            <textarea
              rows={4}
              className="input-field"
              placeholder="Describe the issue or any details that might help"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Sending request..." : "Confirm booking request"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookAppointment;
