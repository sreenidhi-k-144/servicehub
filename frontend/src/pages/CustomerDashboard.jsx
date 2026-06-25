import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyBookings } from "../services/bookingService";
import StatCard from "../components/StatCard";
import BookingStatusBadge from "../components/BookingStatusBadge";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const pending = bookings.filter((b) => b.status === "pending").length;
  const accepted = bookings.filter((b) => b.status === "accepted").length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">Welcome back, {user?.name?.split(" ")[0]}</h1>
      <p className="mt-1 text-ink-500">Here's an overview of your bookings.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <StatCard label="Total bookings" value={bookings.length} icon="📋" />
        <StatCard label="Pending" value={pending} icon="⏳" accent="accent" />
        <StatCard label="Accepted" value={accepted} icon="✅" />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-ink-900">Recent bookings</h2>
        <div className="flex gap-3">
          <Link to="/providers" className="btn-secondary">Browse providers</Link>
          <Link to="/customer/bookings" className="btn-primary">View all</Link>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {loading ? (
          <p className="text-ink-500">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <div className="card text-center text-ink-500">
            You have no bookings yet. <Link to="/providers" className="font-semibold text-primary-600">Find a professional</Link> to get started.
          </div>
        ) : (
          bookings.slice(0, 5).map((b) => (
            <div key={b._id} className="card flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-display font-bold text-ink-900">{b.provider?.providerName}</p>
                <p className="text-sm text-ink-500">{b.provider?.category} · {new Date(b.serviceDate).toLocaleDateString()} · Budget ₹{b.budgetAmount}</p>
              </div>
              <BookingStatusBadge status={b.status} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
