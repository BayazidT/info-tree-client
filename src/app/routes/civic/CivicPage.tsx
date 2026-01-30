import React, {JSX, useEffect, useMemo, useState } from "react";
import { Search, MapPin, Phone, Mail } from "lucide-react";
import Card from "@/components/ui/Card";
import { format } from "date-fns";
import { createCivic, getCivics } from "@/api/civicApi";
import type { Civic, CivicCreate, PaginatedResponse } from "@/types/civic.types";

export default function CivicPage(): JSX.Element {
  const [pageData, setPageData] = useState<PaginatedResponse<Civic> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState<CivicCreate>({
  title: "",
  description: "",
  address: "",
  cityId: 1,
  categoryId: 2,
  contactPhone: "",
  contactEmail: "",
  is24h7: false,
  lastVerified: "2026-01-29T01:30:00Z",
  isActive: true,
  extraAttributes: {
    nonEmergencyPhone: "",
    services: [],
  },
});

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement form submission logic here
    const res = await createCivic(formData);
    console.log("Created civic:", res);
    fetchCivics();
    throw new Error("Function not implemented.");
  }

  if (loading) return <div className="p-8 text-center text-gray-600">Loading emergency services…</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;
  const totalPages = pageData?.totalPages ?? 1;
  const totalElements = pageData?.totalElements ?? civics.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Emergency Services</h1>
        <div className="flex items-center gap-4">
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

          {/* Modal toggle using hidden checkbox to avoid adding new hooks */}
          <div className="relative">
            <input id="add-civic-modal" type="checkbox" className="hidden peer" />

            <label
              htmlFor="add-civic-modal"
              className="inline-flex items-center gap-2 px-3 py-2 bg-sky-600 text-white rounded cursor-pointer"
            >
              Add Service
            </label>

            {/* Modal overlay — becomes visible when checkbox (peer) is checked */}
            <div className="peer-checked:flex hidden fixed inset-0 z-50 items-center justify-center bg-black/40 p-4">
              <div className="bg-white p-6 rounded shadow max-w-lg w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">New Emergency Service</h2>
            <label htmlFor="add-civic-modal" className="cursor-pointer text-gray-600">Close</label>
          </div>

          {/* Basic form markup — replace with actual submit handler as needed */}
         <form
            className="space-y-3"
            onSubmit={handleSubmit}
          >
            {/* Title */}
            <input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Service title"
              className="w-full border px-3 py-2 rounded"
              required
            />

            {/* Description */}
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Description"
              className="w-full border px-3 py-2 rounded"
              rows={3}
            />

            <input
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Address"
                className="w-full border px-3 py-2 rounded"
              />

            {/* Contact */}
            <div className="grid grid-cols-2 gap-2">
              <input
                value={formData.contactPhone}
                onChange={(e) =>
                  setFormData({ ...formData, contactPhone: e.target.value })
                }
                placeholder="Emergency phone"
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) =>
                  setFormData({ ...formData, contactEmail: e.target.value })
                }
                placeholder="Contact email"
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            {/* Extra attributes */}
            <div className="grid grid-cols-2 gap-2">
              <input
                value={formData.extraAttributes?.nonEmergencyPhone ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    extraAttributes: {
                      ...formData.extraAttributes,
                      nonEmergencyPhone: e.target.value,
                    },
                  })
                }
                placeholder="Non-emergency phone"
                className="w-full border px-3 py-2 rounded"
              />

              <input
value={formData.extraAttributes?.services?.join(", ") ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    extraAttributes: {
                      ...formData.extraAttributes,
                      services: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    },
                  })
                }
                placeholder="Services (comma separated)"
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            {/* Flags */}
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.is24h7}
                  onChange={(e) =>
                    setFormData({ ...formData, is24h7: e.target.checked })
                  }
                  className="h-4 w-4"
                />
                Open 24/7
              </label>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <label
                htmlFor="add-civic-modal"
                className="px-3 py-2 rounded border cursor-pointer"
              >
                Cancel
              </label>

              <button
                type="submit"
                className="px-3 py-2 rounded bg-sky-600 text-white"
              >
                Save
              </button>
            </div>
          </form>


              </div>
            </div>
          </div>
        </div>
      </div>
{ filtered.length > 0 ? (
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
  ) : (
    <div className="text-center py-10">
      <p className="text-gray-600">No civic services found..</p>
    </div>
  )}
  </div>)
}