import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProviderById } from "../services/providerService";
import { useAuth } from "../context/AuthContext";

const ProviderDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const data = await getProviderById(id);
        setProvider(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProvider();
  }, [id]);

  const handleBookClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/book/${id}`);
  };

  if (loading) return <p className="px-6 py-16 text-center text-ink-500">Loading provider details...</p>;
  if (!provider) return <p className="px-6 py-16 text-center text-ink-500">Provider not found.</p>;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <Link to="/providers" className="text-sm font-medium text-primary-600">&larr; Back to providers</Link>

      <div className="card mt-6 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <span className="badge">{provider.category}</span>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-ink-900">{provider.providerName}</h1>
          <p className="mt-2 flex items-center gap-1 text-ink-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {provider.location}
          </p>

          <h3 className="mt-6 font-display font-bold text-ink-900">About this professional</h3>
          <p className="mt-2 text-ink-700">
            {provider.description || "This provider has not added a description yet, but is ready to help with your service needs."}
          </p>

          <h3 className="mt-6 font-display font-bold text-ink-900">Contact</h3>
          <p className="mt-2 text-ink-700">{provider.phone}</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-6">
          <p className="text-sm text-ink-500">Starting at</p>
          <p className="font-display text-3xl font-extrabold text-ink-900">₹{provider.pricing}</p>

          <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 text-sm">
            <span className="text-ink-500">Experience</span>
            <span className="font-semibold text-ink-900">{provider.experience} years</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-ink-500">Rating</span>
            <span className="font-semibold text-ink-900">★ {provider.avgRating?.toFixed(1) || "4.5"}</span>
          </div>

          <button onClick={handleBookClick} className="btn-primary mt-6 w-full">
            Schedule appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetails;
