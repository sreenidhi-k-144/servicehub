import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser, getStats } from "../services/adminService";
import { getProviders, deleteProvider } from "../services/providerService";
import { getAllBookings } from "../services/bookingService";
import StatCard from "../components/StatCard";
import BookingStatusBadge from "../components/BookingStatusBadge";

const tabs = ["Overview", "Users", "Providers", "Bookings"];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [stats, setStats] = useState({ totalUsers: 0, totalProviders: 0, totalAdmins: 0 });
  const [users, setUsers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [statsData, usersData, providersData, bookingsData] = await Promise.all([
        getStats(),
        getAllUsers(),
        getProviders(),
        getAllBookings(),
      ]);
      setStats(statsData);
      setUsers(usersData);
      setProviders(providersData);
      setBookings(bookingsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Remove this user permanently?")) return;
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  const handleDeleteProvider = async (id) => {
    if (!window.confirm("Remove this provider permanently?")) return;
    await deleteProvider(id);
    setProviders((prev) => prev.filter((p) => p._id !== id));
  };

  if (loading) return <p className="px-6 py-16 text-center text-ink-500">Loading admin dashboard...</p>;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">Admin dashboard</h1>
      <p className="mt-1 text-ink-500">Manage users, providers and bookings across ServiceHub.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <StatCard label="Customers" value={stats.totalUsers} icon="👤" />
        <StatCard label="Providers" value={stats.totalProviders} icon="🛠️" accent="accent" />
        <StatCard label="Admins" value={stats.totalAdmins} icon="🔐" />
      </div>

      <div className="mt-8 flex gap-2 border-b border-slate-200">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`border-b-2 px-4 py-2 text-sm font-semibold ${activeTab === t ? "border-primary-600 text-primary-700" : "border-transparent text-ink-500"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <div className="card mt-6">
          <p className="text-ink-700">
            ServiceHub currently has <strong>{stats.totalUsers}</strong> customers and <strong>{stats.totalProviders}</strong> service providers,
            with <strong>{bookings.length}</strong> total bookings placed on the platform.
          </p>
        </div>
      )}

      {activeTab === "Users" && (
        <div className="mt-6 space-y-3">
          {users.map((u) => (
            <div key={u._id} className="card flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-display font-bold text-ink-900">{u.name}</p>
                <p className="text-sm text-ink-500">{u.email} · <span className="capitalize">{u.role}</span></p>
              </div>
              {u.role !== "admin" && (
                <button onClick={() => handleDeleteUser(u._id)} className="btn-secondary px-3 py-1.5 text-xs text-rose-600">
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === "Providers" && (
        <div className="mt-6 space-y-3">
          {providers.map((p) => (
            <div key={p._id} className="card flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-display font-bold text-ink-900">{p.providerName}</p>
                <p className="text-sm text-ink-500">{p.category} · {p.location} · ₹{p.pricing}</p>
              </div>
              <button onClick={() => handleDeleteProvider(p._id)} className="btn-secondary px-3 py-1.5 text-xs text-rose-600">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Bookings" && (
        <div className="mt-6 space-y-3">
          {bookings.map((b) => (
            <div key={b._id} className="card flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-display font-bold text-ink-900">{b.customer?.name} → {b.provider?.providerName}</p>
                <p className="text-sm text-ink-500">{b.provider?.category} · Budget ₹{b.budgetAmount}</p>
              </div>
              <BookingStatusBadge status={b.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
