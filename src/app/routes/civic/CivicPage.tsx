import React, {JSX, useEffect, useMemo, useState } from "react";
import { Search, MapPin, Phone, Mail } from "lucide-react";
import Card from "@/components/ui/Card";
import { format } from "date-fns";
import { getCivics } from "@/api/civicApi";
import type { Civic, PaginatedResponse } from "@/types/civic.types";

export default function CivicPage(): JSX.Element {
  const [pageData, setPageData] = useState<PaginatedResponse<Civic> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    fetchCivics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchCivics = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getCivics({
        page: currentPage,
        size: pageSize,
        ...(searchTerm ? { search: searchTerm } : {}),
      });
      if (!res) throw new Error("Failed to fetch civic data");
      setPageData(res);
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Unknown error");
      setPageData(null);
    } finally {
      setLoading(false);
    }
  };

  const civics = pageData?.content || [];

  const filtered = useMemo(() => {
    if (!searchTerm) return civics;
    const lower = searchTerm.toLowerCase();
    return civics.filter(c =>
      (c.title ?? "").toLowerCase().includes(lower) ||
      (c.description ?? "").toLowerCase().includes(lower) ||
      (c.cityName ?? "").toLowerCase().includes(lower) ||
      (c.extraAttributes?.services ?? []).join(" ").toLowerCase().includes(lower)
    );
  }, [civics, searchTerm]);

  if (loading) return <div className="p-8 text-center text-gray-600">Loading civic services…</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;
  if (civics.length === 0) return <div className="p-8 text-center text-gray-600">No civic entries found.</div>;

  const totalPages = pageData?.totalPages ?? 1;
  const totalElements = pageData?.totalElements ?? civics.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Civic Services</h1>
        <div className="w-80 relative">
          <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <input
            className="w-full pl-10 pr-3 py-2 border rounded-lg"
            placeholder="Search title, city or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { setCurrentPage(0); fetchCivics(); } }}
          />
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sky-50 border-b">
              <tr>
                <th className="text-left px-4 py-3">ID</th>
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-left px-4 py-3">City</th>
                <th className="text-left px-4 py-3">Address</th>
                <th className="text-left px-4 py-3">Contact</th>
                <th className="text-left px-4 py-3">24/7</th>
                <th className="text-left px-4 py-3">Last Verified</th>
                <th className="text-left px-4 py-3">Services</th>
                <th className="text-left px-4 py-3">Accessible</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b hover:bg-sky-50">
                  <td className="px-4 py-3">{c.id}</td>
                  <td className="px-4 py-3 font-medium">{c.title}</td>
                  <td className="px-4 py-3">{c.categoryName ?? "-"}</td>
                  <td className="px-4 py-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-sky-600" />{c.cityName ?? "-"}</td>
                  <td className="px-4 py-3">{c.address ?? "-"}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-600" />{c.contactPhone ?? (c.extraAttributes?.nonEmergencyPhone ?? "-")}</span>
                      <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-600" />{c.contactEmail ?? "-"}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{c.is24h7 ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">{c.lastVerified ? format(new Date(c.lastVerified), "dd MMM yyyy, HH:mm") : "-"}</td>
                  <td className="px-4 py-3">{c.extraAttributes?.services?.join(", ") ?? "-"}</td>
                  <td className="px-4 py-3">{c.extraAttributes?.wheelchairAccessible ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-sm text-gray-600">Page {currentPage + 1} of {totalPages} ({totalElements} entries)</p>
            <div className="flex items-center gap-2">
              <button onClick={() => { setCurrentPage(0); fetchCivics(); }} disabled={pageData?.first || loading} className="px-3 py-1 rounded bg-gray-100">First</button>
              <button onClick={() => { setCurrentPage(p => Math.max(0, p - 1)); fetchCivics(); }} disabled={pageData?.first || loading} className="px-3 py-1 rounded bg-gray-100">Prev</button>
              <button onClick={() => { setCurrentPage(p => Math.min(totalPages - 1, p + 1)); fetchCivics(); }} disabled={pageData?.last || loading} className="px-3 py-1 rounded bg-gray-100">Next</button>
              <button onClick={() => { setCurrentPage(totalPages - 1); fetchCivics(); }} disabled={pageData?.last || loading} className="px-3 py-1 rounded bg-gray-100">Last</button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}