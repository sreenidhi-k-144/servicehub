import React from "react";

const styles = {
  pending: "bg-amber-50 text-amber-600",
  accepted: "bg-emerald-50 text-emerald-600",
  rejected: "bg-rose-50 text-rose-600",
  completed: "bg-primary-50 text-primary-700",
};

const BookingStatusBadge = ({ status }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${styles[status] || styles.pending}`}>
      {status}
    </span>
  );
};

export default BookingStatusBadge;
