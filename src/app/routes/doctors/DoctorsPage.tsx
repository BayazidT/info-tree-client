import React, { JSX, useEffect, useMemo, useState } from "react";
import { Search, ExternalLink, MapPin } from "lucide-react";
import Card from "@/components/ui/Card";
import { getDoctors } from "@/api/doctorApi";
import type { Doctor, PaginatedResponse } from "@/types/doctor.types";

export default function DoctorPage(): JSX.Element {
  const [pageData, setPageData] = useState<PaginatedResponse<Doctor> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    fetchDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getDoctors({ page: currentPage, size: pageSize, search: searchTerm });
      if (!res) throw new Error("Failed to fetch doctors");
      setPageData(res);
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Unknown error");
      setPageData(null);
    } finally {
      setLoading(false);
    }
  };

  const doctors = pageData?.content || [];

  const filtered = useMemo(() => {
    if (!searchTerm) return doctors;
    const lower = searchTerm.toLowerCase();
    return doctors.filter((d) =>
      (d.fullName ?? `${d.firstName ?? ""} ${d.lastName ?? ""}`).toLowerCase().includes(lower) ||
      (d.cityName ?? "").toLowerCase().includes(lower) ||
      (d.extraAttributes?.focusAreas ?? []).join(" ").toLowerCase().includes(lower)
    );
  }, [doctors, searchTerm]);

  if (loading) return <div className="p-8 text-center text-gray-600">Loading doctors…</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;
  if (doctors.length === 0) return <div className="p-8 text-center text-gray-600">No doctors found.</div>;

  const totalPages = pageData?.totalPages ?? 1;
  const totalElements = pageData?.totalElements ?? doctors.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Doctors</h1>
        <div className="w-80 relative">
          <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <input
            className="w-full pl-10 pr-3 py-2 border rounded-lg"
            placeholder="Search by name, city or focus..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { setCurrentPage(0); fetchDoctors(); } }}
          />
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sky-50 border-b">
              <tr>
                <th className="text-left px-4 py-3">ID</th>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3">City</th>
                <th className="text-left px-4 py-3">Address</th>
                <th className="text-left px-4 py-3">Years</th>
                <th className="text-left px-4 py-3">Rating</th>
                <th className="text-left px-4 py-3">Focus Areas</th>
                <th className="text-left px-4 py-3">Telemed</th>
                <th className="text-left px-4 py-3">Appointment</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-b hover:bg-sky-50">
                  <td className="px-4 py-3">{d.id}</td>
                  <td className="px-4 py-3 font-medium">{d.fullName ?? `${d.firstName ?? ""} ${d.lastName ?? ""}`.trim()}</td>
                  <td className="px-4 py-3">{d.title ?? "-"}</td>
                  <td className="px-4 py-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-sky-600" />{d.cityName ?? "-"}</td>
                  <td className="px-4 py-3">{d.address ?? "-"}</td>
                  <td className="px-4 py-3">{d.extraAttributes?.yearsOfExperience ?? "-"}</td>
                  <td className="px-4 py-3">{d.extraAttributes?.patientReviewsAvg ?? "-"}</td>
                  <td className="px-4 py-3">{d.extraAttributes?.focusAreas?.join(", ") ?? "-"}</td>
                  <td className="px-4 py-3">{d.telemedicineAvailable ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">
                    {d.appointmentUrl ? (
                      <a href={d.appointmentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sky-600">
                        <ExternalLink className="w-4 h-4" /> Book
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-sm text-gray-600">Page {currentPage + 1} of {totalPages} ({totalElements} doctors)</p>
            <div className="flex items-center gap-2">
              <button onClick={() => { setCurrentPage(0); fetchDoctors(); }} disabled={pageData?.first || loading} className="px-3 py-1 rounded bg-gray-100">First</button>
              <button onClick={() => { setCurrentPage(p => Math.max(0, p - 1)); fetchDoctors(); }} disabled={pageData?.first || loading} className="px-3 py-1 rounded bg-gray-100">Prev</button>
              <button onClick={() => { setCurrentPage(p => Math.min(totalPages - 1, p + 1)); fetchDoctors(); }} disabled={pageData?.last || loading} className="px-3 py-1 rounded bg-gray-100">Next</button>
              <button onClick={() => { setCurrentPage(totalPages - 1); fetchDoctors(); }} disabled={pageData?.last || loading} className="px-3 py-1 rounded bg-gray-100">Last</button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}