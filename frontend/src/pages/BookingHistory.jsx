import React, { useEffect, useState } from "react";
import { getMyBookings } from "../services/bookingService";
import BookingStatusBadge from "../components/BookingStatusBadge";

const BookingHistory = () => {
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

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">Booking history</h1>
      <p className="mt-1 text-ink-500">All your service requests in one place.</p>

      <div className="mt-8 space-y-3">
        {loading ? (
          <p className="text-ink-500">Loading...</p>
        ) : bookings.length === 0 ? (
          <div className="card text-center text-ink-500">No bookings yet.</div>
        ) : (
          bookings.map((b) => (
            <div key={b._id} className="card flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-display font-bold text-ink-900">{b.provider?.providerName}</p>
                <p className="text-sm text-ink-500">{b.provider?.category} · {b.provider?.location}</p>
              </div>
              <div className="text-sm text-ink-700">
                <p>Date: {new Date(b.serviceDate).toLocaleDateString()}</p>
                <p>Budget: ₹{b.budgetAmount}</p>
              </div>
              <BookingStatusBadge status={b.status} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
