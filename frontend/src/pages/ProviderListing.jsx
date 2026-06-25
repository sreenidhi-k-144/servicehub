import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProviders } from "../services/providerService";
import ProviderCard from "../components/ProviderCard";

const categories = ["All", "Electrician", "Plumber", "Carpenter", "AC Technician", "Painter", "Appliance Repair"];

const ProviderListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const category = searchParams.get("category") || "All";

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const data = await getProviders({ category, search });
      setProviders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProviders();
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-ink-900">Find a professional</h1>
        <p className="mt-1 text-ink-500">Browse verified providers and book the right one for your job.</p>
      </div>

      <form onSubmit={handleSearchSubmit} className="mb-6 flex gap-3">
        <input
          className="input-field"
          placeholder="Search by name, location or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn-primary shrink-0">Search</button>
      </form>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSearchParams(c === "All" ? {} : { category: c })}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              category === c ? "bg-primary-600 text-white" : "bg-white text-ink-700 border border-slate-200 hover:border-primary-300"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-ink-500">Loading providers...</p>
      ) : providers.length === 0 ? (
        <div className="card text-center text-ink-500">No providers found. Try a different category or search term.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((p) => (
            <ProviderCard key={p._id} provider={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderListing;
