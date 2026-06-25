import React, { useEffect, useState } from "react";
import { getMyProviderProfile, saveProviderProfile } from "../services/providerService";
import { getProviderBookings, updateBookingStatus } from "../services/bookingService";
import BookingStatusBadge from "../components/BookingStatusBadge";
import StatCard from "../components/StatCard";

const categories = ["Electrician", "Plumber", "Carpenter", "AC Technician", "Painter", "Appliance Repair"];

const emptyForm = {
  providerName: "",
  category: "Electrician",
  experience: "",
  location: "",
  phone: "",
  pricing: "",
  description: "",
};

const ProviderDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const profileData = await getMyProviderProfile();
      if (profileData) {
        setProfile(profileData);
        setForm({
          providerName: profileData.providerName,
          category: profileData.category,
          experience: profileData.experience,
          location: profileData.location,
          phone: profileData.phone,
          pricing: profileData.pricing,
          description: profileData.description,
        });
      }
      const bookingData = await getProviderBookings();
      setBookings(bookingData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const data = await saveProviderProfile({
        ...form,
        experience: Number(form.experience),
        pricing: Number(form.pricing),
      });
      setProfile(data);
      setMessage("Profile saved successfully.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not save profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status } : b)));
    } catch (err) {
      console.error(err);
    }
  };

  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const acceptedCount = bookings.filter((b) => b.status === "accepted").length;

  if (loading) return <p className="px-6 py-16 text-center text-ink-500">Loading dashboard...</p>;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">Provider dashboard</h1>
      <p className="mt-1 text-ink-500">Manage your profile and incoming bookings.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <StatCard label="Total bookings" value={bookings.length} icon="📋" />
        <StatCard label="Pending requests" value={pendingCount} icon="⏳" accent="accent" />
        <StatCard label="Accepted jobs" value={acceptedCount} icon="✅" />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="card lg:col-span-1">
          <h2 className="font-display text-lg font-bold text-ink-900">
            {profile ? "Update your profile" : "Create your provider profile"}
          </h2>
          {message && <p className="mt-2 text-sm text-primary-600">{message}</p>}
          <form onSubmit={handleSaveProfile} className="mt-4 space-y-4">
            <div>
              <label className="label-field">Business / display name</label>
              <input className="input-field" required value={form.providerName} onChange={(e) => setForm({ ...form, providerName: e.target.value })} />
            </div>
            <div>
              <label className="label-field">Category</label>
              <select className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label-field">Experience (years)</label>
              <input type="number" min="0" className="input-field" required value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
            </div>
            <div>
              <label className="label-field">Location</label>
              <input className="input-field" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div>
              <label className="label-field">Phone</label>
              <input className="input-field" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="label-field">Starting price (₹)</label>
              <input type="number" min="0" className="input-field" required value={form.pricing} onChange={(e) => setForm({ ...form, pricing: e.target.value })} />
            </div>
            <div>
              <label className="label-field">Description</label>
              <textarea rows={3} className="input-field" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <button type="submit" disabled={saving} className="btn-primary w-full">
              {saving ? "Saving..." : "Save profile"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <h2 className="font-display text-lg font-bold text-ink-900">Booking requests</h2>
          <div className="mt-4 space-y-3">
            {bookings.length === 0 ? (
              <div className="card text-center text-ink-500">No bookings yet.</div>
            ) : (
              bookings.map((b) => (
                <div key={b._id} className="card flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-display font-bold text-ink-900">{b.customer?.name}</p>
                    <p className="text-sm text-ink-500">{b.customer?.phone || b.customer?.email}</p>
                    <p className="mt-1 text-sm text-ink-700">
                      {new Date(b.serviceDate).toLocaleDateString()} · Budget ₹{b.budgetAmount}
                    </p>
                    {b.notes && <p className="mt-1 text-xs text-ink-500">"{b.notes}"</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <BookingStatusBadge status={b.status} />
                    {b.status === "pending" && (
                      <>
                        <button onClick={() => handleStatusChange(b._id, "accepted")} className="btn-primary px-3 py-1.5 text-xs">Accept</button>
                        <button onClick={() => handleStatusChange(b._id, "rejected")} className="btn-secondary px-3 py-1.5 text-xs">Reject</button>
                      </>
                    )}
                    {b.status === "accepted" && (
                      <button onClick={() => handleStatusChange(b._id, "completed")} className="btn-secondary px-3 py-1.5 text-xs">Mark completed</button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
