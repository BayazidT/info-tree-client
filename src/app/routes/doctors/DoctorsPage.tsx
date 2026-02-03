import React, { JSX, useEffect, useMemo, useState } from "react";
import { Plus, ExternalLink, MapPin, Eye, Trash2 } from "lucide-react";
import Card from "@/components/ui/Card";
import { createDoctor, getDoctors } from "@/api/doctorApi";
import type { Doctor, PaginatedResponse } from "@/types/doctor.types";
import { useNavigate } from "react-router-dom";
import { getDoctorDepartments } from "@/api/doctorDepartmentApi";
import { DoctorDepartment } from "@/types/doctorDepartment.typs";
import { set } from "date-fns";
export default function DoctorPage(): JSX.Element {
  const navigate = useNavigate();
  const [pageData, setPageData] = useState<PaginatedResponse<Doctor> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [department, setDepartment] = useState<DoctorDepartment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
type CreateDoctor = Omit<Doctor, "id">;

const [formData, setFormData] = useState<CreateDoctor>({
    title: "",
    firstName: "",
    lastName: "",
    gender: "",
    idNumber: "",
    address: "",
    cityId: 1,
    categoryId: 5,
    privatePatientsOnly: false,
    acceptsNewPatients: false,
    telemedicineAvailable: false,
    appointmentUrl: "",
    emergencyAppointments: false,
    consultationHours: {
        Sat: "",
        Sun: ""
    },
    extraAttributes: {
        focusAreas: [],
        patientReviewsAvg: 4.5,
        hospitals:[{
            hospitalName: "",
            availability: "",
            contactDetails: "",
        }],
    },
});

const [focusAreasText, setFocusAreasText] = useState<string>((formData.extraAttributes?.focusAreas || []).join(", "));

useEffect(() => {
    setFocusAreasText((formData.extraAttributes?.focusAreas || []).join(", "));
}, [showForm, JSON.stringify(formData.extraAttributes?.focusAreas)]);

  useEffect(() => {
    fetchDoctors();
    fetchDoctorDepartments()
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
const fetchDoctorDepartments = async () => {
    try {
      const departments = await getDoctorDepartments();
      setDepartment(departments);
      console.log('Doctor Departments:', departments);
    } catch (err) {
      console.error('Failed to fetch doctor departments:', err);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await createDoctor(formData);
        setShowForm(false);
        setFormData({
            title: "",
            firstName: "",
            lastName: "",});
        setFocusAreasText("");
        fetchDoctors(); // Refresh list
      } catch (err) {
        alert('Failed to create doctor');
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

  const totalPages = pageData?.totalPages ?? 1;
  const totalElements = pageData?.totalElements ?? doctors.length;

    function handleDelete(id: string | number | undefined): void {
        if (id === undefined || id === null) return;
        if (!confirm("Are you sure you want to delete this doctor?")) return;

        (async () => {
            try {
                setLoading(true);
                setError(null);

                // Attempt delete via backend endpoint. Adjust URL if your API differs
                const res = await fetch(`/api/doctors/${id}`, { method: "DELETE" });
                if (!res.ok) {
                    const text = await res.text().catch(() => res.statusText);
                    throw new Error(text || `Delete failed with status ${res.status}`);
                }

                // Optimistically remove the deleted doctor from state
                setPageData((prev) => {
                    if (!prev) return prev;
                    const newContent = prev.content.filter((d) => String(d.id) !== String(id));
                    return {
                        ...prev,
                        content: newContent,
                        totalElements: Math.max(0, (prev.totalElements ?? prev.content.length) - 1),
                    };
                });

                // Refresh list to ensure server/state stay in sync
                fetchDoctors();
            } catch (err: any) {
                console.error(err);
                setError(err?.message ?? "Failed to delete doctor");
                alert("Failed to delete doctor");
            } finally {
                setLoading(false);
            }
        })();
    }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Doctors</h1>
        {!showForm && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition"
        >
          <Plus className="w-5 h-5" />
          New Doctor
        </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Entry of a New Doctor</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
                type="text"
                placeholder="Title (e.g. Dr. / Prof.)"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-4 py-2 border rounded-lg"
            />
            <select
              value={formData.departmentId ?? ""}
              onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
              className="px-4 py-2 border rounded-lg text-gray-800 bg-white"
          >
              <option value="">Department</option>
              {department.map((dept) => (
                  <option key={dept.id} value={dept.id} className="text-gray-800">
                      {dept.nameBn || dept.nameEn}
                  </option>
              ))}
          </select>
            <input
                type="text"
                required
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="px-4 py-2 border rounded-lg"
            />
            <input
                type="text"
                required
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="px-4 py-2 border rounded-lg"
            />

            

            <select
                value={formData.gender ?? ""}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="px-4 py-2 border rounded-lg"
            >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>

            <input
                type="text"
                placeholder="ID Number"
                value={formData.idNumber}
                onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                className="px-4 py-2 border rounded-lg"
            />
            <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="px-4 py-2 border rounded-lg"
            />
           
            {/* Extra attributes */}
            <input
                type="text"
                placeholder="Focus Areas (comma separated)"
                value={focusAreasText}
                onChange={(e) => setFocusAreasText(e.target.value)}
                onBlur={() =>
                    setFormData((prev) => ({
                        ...prev,
                        extraAttributes: {
                            ...prev.extraAttributes,
                            focusAreas: focusAreasText.split(",").map((s) => s.trim()).filter(Boolean),
                        },
                    }))
                }
                className="md:col-span-2 px-4 py-2 border rounded-lg"
            />

            {/* Hospitals: multiple entries with add/remove */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-gray-700">Hospitals</label>
              {((formData.extraAttributes?.hospitals ?? []) as { hospitalName?: string; availability?: string; contactDetails?: string }[]).map((h, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end">
                  <input
                    type="text"
                    placeholder="Hospital Name"
                    value={h.hospitalName || ""}
                    onChange={(e) =>
                      setFormData((prev) => {
                        const extra = prev.extraAttributes || {};
                        const hospitals = [...(extra.hospitals || [])];
                        hospitals[idx] = { ...(hospitals[idx] || {}), hospitalName: e.target.value };
                        return { ...prev, extraAttributes: { ...extra, hospitals } };
                      })
                    }
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Availability (e.g. Mon-Fri 9am-5pm)"
                    value={h.availability || ""}
                    onChange={(e) =>
                      setFormData((prev) => {
                        const extra = prev.extraAttributes || {};
                        const hospitals = [...(extra.hospitals || [])];
                        hospitals[idx] = { ...(hospitals[idx] || {}), availability: e.target.value };
                        return { ...prev, extraAttributes: { ...extra, hospitals } };
                      })
                    }
                    className="px-4 py-2 border rounded-lg"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Contact Details"
                      value={h.contactDetails || ""}
                      onChange={(e) =>
                        setFormData((prev) => {
                          const extra = prev.extraAttributes || {};
                          const hospitals = [...(extra.hospitals || [])];
                          hospitals[idx] = { ...(hospitals[idx] || {}), contactDetails: e.target.value };
                          return { ...prev, extraAttributes: { ...extra, hospitals } };
                        })
                      }
                      className="flex-1 px-4 py-2 border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => {
                          const extra = prev.extraAttributes || {};
                          const hospitals = [...(extra.hospitals || [])];
                          hospitals.splice(idx, 1);
                          return { ...prev, extraAttributes: { ...extra, hospitals } };
                        })
                      }
                      className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => {
                      const extra = prev.extraAttributes || {};
                      const hospitals = [...(extra.hospitals || [])];
                      hospitals.push({ hospitalName: "", availability: "", contactDetails: "" });
                      return { ...prev, extraAttributes: { ...extra, hospitals } };
                    })
                  }
                  className="inline-flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Hospital
                </button>
              </div>
            </div>

            <div className="md:col-span-2 flex gap-4">
                <button
                    type="submit"
                    className="bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700"
                >
                    Create Doctor
                </button>
                <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-300 px-6 py-3 rounded-lg hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
          </form>
        </div>
      )}
{doctors.length > 0 && (
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
                <th className="text-left px-4 py-3">Action</th>
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
                  <td className="px-6 py-5 text-right flex justify-end gap-2">
                            <button
                                onClick={() => navigate(`/admin/doctors/${d.id}`)}
                              className="text-sky-600 hover:bg-sky-50 p-3 rounded-lg transition"
                              title="View details"
                            >
                              <Eye className="w-5 h-5" />
                            </button>

                            <button
                              onClick={() => handleDelete(d.id)}
                              className="text-red-600 hover:bg-red-50 p-3 rounded-lg transition"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
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
    )}
    {doctors.length === 0 && (
        <div className="p-8 text-center text-gray-600">No doctors found.</div>
    )}
    </div>
  );
}