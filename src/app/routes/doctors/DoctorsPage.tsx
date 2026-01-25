import React, { JSX, useEffect, useMemo, useState } from "react";
import { Plus, ExternalLink, MapPin } from "lucide-react";
import Card from "@/components/ui/Card";
import { getDoctors } from "@/api/doctorApi";
import type { Doctor, PaginatedResponse } from "@/types/doctor.types";

export default function DoctorPage(): JSX.Element {
  const [pageData, setPageData] = useState<PaginatedResponse<Doctor> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
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
    cityId: 0,
    categoryId: 0,
    privatePatientsOnly: false,
    acceptsNewPatients: false,
    telemedicineAvailable: false,
    appointmentUrl: "",
    emergencyAppointments: false,
    consultationHours: {
        Mo: "",
        Di: "",
        Mi: "",
        Do: "",
        Fr: "",
        Sa: "",
        emergency: "",
    },
    extraAttributes: {
        focusAreas: [],
        barmerAccepted: false,
        technikerKrankenkasseAccepted: false,
        patientReviewsAvg: 0,
        yearsOfExperience: 0,
    },
});

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

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        
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
  if (doctors.length === 0) return <div className="p-8 text-center text-gray-600">No doctors found.</div>;

  const totalPages = pageData?.totalPages ?? 1;
  const totalElements = pageData?.totalElements ?? doctors.length;

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
          <h2 className="text-xl font-semibold mb-4">Create New Doctor</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <input
                type="text"
                placeholder="Title (e.g. Dr. / Prof.)"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-4 py-2 border rounded-lg"
            />

            <select
                value={formData.gender ?? ""}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="px-4 py-2 border rounded-lg"
            >
                <option value="">Gender (optional)</option>
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

            <input
                type="number"
                placeholder="City ID"
                value={String(formData.cityId ?? "")}
                onChange={(e) => setFormData({ ...formData, cityId: Number(e.target.value) || 0 })}
                className="px-4 py-2 border rounded-lg"
            />

            <input
                type="number"
                placeholder="Category ID"
                value={String(formData.categoryId ?? "")}
                onChange={(e) => setFormData({ ...formData, categoryId: Number(e.target.value) || 0 })}
                className="px-4 py-2 border rounded-lg"
            />

            <input
                type="url"
                placeholder="Appointment URL (optional)"
                value={formData.appointmentUrl}
                onChange={(e) => setFormData({ ...formData, appointmentUrl: e.target.value })}
                className="px-4 py-2 border rounded-lg"
            />

            <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
                <input
                    id="telemed"
                    type="checkbox"
                    checked={formData.telemedicineAvailable}
                    onChange={(e) => setFormData({ ...formData, telemedicineAvailable: e.target.checked })}
                    className="w-4 h-4"
                />
                <label htmlFor="telemed" className="text-sm">Telemedicine Available</label>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
                <input
                    id="privateOnly"
                    type="checkbox"
                    checked={formData.privatePatientsOnly}
                    onChange={(e) => setFormData({ ...formData, privatePatientsOnly: e.target.checked })}
                    className="w-4 h-4"
                />
                <label htmlFor="privateOnly" className="text-sm">Private Patients Only</label>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
                <input
                    id="acceptsNew"
                    type="checkbox"
                    checked={formData.acceptsNewPatients}
                    onChange={(e) => setFormData({ ...formData, acceptsNewPatients: e.target.checked })}
                    className="w-4 h-4"
                />
                <label htmlFor="acceptsNew" className="text-sm">Accepts New Patients</label>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
                <input
                    id="emergencyAppointments"
                    type="checkbox"
                    checked={formData.emergencyAppointments}
                    onChange={(e) => setFormData({ ...formData, emergencyAppointments: e.target.checked })}
                    className="w-4 h-4"
                />
                <label htmlFor="emergencyAppointments" className="text-sm">Emergency Appointments</label>
            </div>

            {/* Consultation hours */}
            <div className="md:col-span-2 grid grid-cols-2 gap-2">
                <input
                    type="text"
                    placeholder="Mo"
                    value={formData.consultationHours?.Mo ?? ""}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            consultationHours: { ...(formData.consultationHours || {}), Mo: e.target.value },
                        })
                    }
                    className="px-4 py-2 border rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Di"
                    value={formData.consultationHours?.Di ?? ""}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            consultationHours: { ...(formData.consultationHours || {}), Di: e.target.value },
                        })
                    }
                    className="px-4 py-2 border rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Mi"
                    value={formData.consultationHours?.Mi ?? ""}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            consultationHours: { ...(formData.consultationHours || {}), Mi: e.target.value },
                        })
                    }
                    className="px-4 py-2 border rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Do"
                    value={formData.consultationHours?.Do ?? ""}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            consultationHours: { ...(formData.consultationHours || {}), Do: e.target.value },
                        })
                    }
                    className="px-4 py-2 border rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Fr"
                    value={formData.consultationHours?.Fr ?? ""}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            consultationHours: { ...(formData.consultationHours || {}), Fr: e.target.value },
                        })
                    }
                    className="px-4 py-2 border rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Sa"
                    value={formData.consultationHours?.Sa ?? ""}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            consultationHours: { ...(formData.consultationHours || {}), Sa: e.target.value },
                        })
                    }
                    className="px-4 py-2 border rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Emergency Hours"
                    value={formData.consultationHours?.emergency ?? ""}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            consultationHours: { ...(formData.consultationHours || {}), emergency: e.target.value },
                        })
                    }
                    className="px-4 py-2 border rounded-lg"
                />
            </div>

            {/* Extra attributes */}
            <input
                type="text"
                placeholder="Focus Areas (comma separated)"
                value={(formData.extraAttributes.focusAreas || []).join(", ")}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        extraAttributes: {
                            ...formData.extraAttributes,
                            focusAreas: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        },
                    })
                }
                className="md:col-span-2 px-4 py-2 border rounded-lg"
            />

            <input
                type="number"
                min={0}
                placeholder="Years of Experience"
                value={String(formData.extraAttributes.yearsOfExperience ?? "")}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        extraAttributes: {
                            ...formData.extraAttributes,
                            yearsOfExperience: Number(e.target.value) || 0,
                        },
                    })
                }
                className="px-4 py-2 border rounded-lg"
            />

            <input
                type="number"
                step="0.1"
                min={0}
                max={5}
                placeholder="Patient Reviews Avg (0-5)"
                value={String(formData.extraAttributes.patientReviewsAvg ?? "")}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        extraAttributes: {
                            ...formData.extraAttributes,
                            patientReviewsAvg: Number(e.target.value) || 0,
                        },
                    })
                }
                className="px-4 py-2 border rounded-lg"
            />

            <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
                <input
                    id="barmer"
                    type="checkbox"
                    checked={formData.extraAttributes.barmerAccepted}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            extraAttributes: { ...formData.extraAttributes, barmerAccepted: e.target.checked },
                        })
                    }
                    className="w-4 h-4"
                />
                <label htmlFor="barmer" className="text-sm">Barmer Accepted</label>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
                <input
                    id="tk"
                    type="checkbox"
                    checked={formData.extraAttributes.technikerKrankenkasseAccepted}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            extraAttributes: { ...formData.extraAttributes, technikerKrankenkasseAccepted: e.target.checked },
                        })
                    }
                    className="w-4 h-4"
                />
                <label htmlFor="tk" className="text-sm">Techniker Krankenkasse Accepted</label>
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