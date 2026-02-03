import React from "react";

type ConsultationHours = {
    [day: string]: string;
};

type Hospital = {
    hospitalName: string;
    availability: string;
    contactDetails: string;
};

type ExtraAttributes = {
    focusAreas: string[];
    patientReviewsAvg?: number;
    hospitals?: Hospital[];
};

export type Doctor = {
    title?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    idNumber?: string;
    address?: string;
    cityName?: string;
    categoryId?: number;
    departmentNameEn?: string;
    departmentNameBn?: string;
    privatePatientsOnly?: boolean;
    acceptsNewPatients?: boolean;
    telemedicineAvailable?: boolean;
    appointmentUrl?: string;
    emergencyAppointments?: boolean;
    consultationHours?: ConsultationHours;
    extraAttributes?: ExtraAttributes;
};

type Props = {
    doctor: Doctor;
};

const empty = (v?: any) =>
    v === undefined || v === null || (typeof v === "string" && v.trim() === "")
        ? "—"
        : v;

export default function DoctorDetails({ doctor }: Props) {
    const {
        title,
        firstName,
        lastName,
        gender,
        idNumber,
        address,
        cityName,
        categoryId,
        departmentNameEn,
        departmentNameBn,
        privatePatientsOnly,
        acceptsNewPatients,
        telemedicineAvailable,
        appointmentUrl,
        emergencyAppointments,
        consultationHours,
        extraAttributes,
    } = doctor || {};
    const hospitals = extraAttributes?.hospitals ?? [];

    return (
        <div>
            <section className="mb-6">
                <nav className="mb-4 text-sm" aria-label="Breadcrumb">
                    <a href="/admin/doctors" className="inline-flex items-center text-sky-600 hover:underline">
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to doctors
                    </a>
                </nav>

                <div className="bg-white shadow-sm border border-sky-200 rounded-lg p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-3xl font-bold">
                                {(
                                    (firstName ?? title ?? lastName ?? "Doctor").charAt(0) +
                                    (lastName ? lastName.charAt(0) : "")
                                ).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                                <div className="text-xl font-semibold text-sky-900 truncate">
                                    {`${title ? title + " " : ""}${firstName ?? ""} ${lastName ?? ""}`.trim() || "—"}
                                </div>
                                <div className="text-sm text-sky-600 mt-1">
                                    {typeof categoryId === "number" ? `Category ${categoryId}` : "Category not specified"}
                                </div>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="text-xs bg-sky-50 text-sky-700 px-2 py-1 rounded-full border border-sky-100">
                                        ID: {empty(idNumber)}
                                    </span>
                                    <span className="text-xs bg-sky-50 text-sky-700 px-2 py-1 rounded-full border border-sky-100">
                                        City: {empty(cityName)}
                                    </span>

                                    {telemedicineAvailable ? (
                                        <span className="text-xs bg-sky-100 text-sky-800 px-2 py-1 rounded-full border border-sky-200">
                                            Telemedicine
                                        </span>
                                    ) : null}
                                    {privatePatientsOnly ? (
                                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full border border-amber-200">
                                            Private only
                                        </span>
                                    ) : null}
                                    {acceptsNewPatients ? (
                                        <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full border border-emerald-200">
                                            Accepting
                                        </span>
                                    ) : null}
                                    {emergencyAppointments ? (
                                        <span className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-full border border-red-100">
                                            Emergency
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="ml-auto flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end gap-2">
                                {appointmentUrl ? (
                                    <a
                                        href={appointmentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded-md text-sm hover:bg-sky-700"
                                    >
                                        Book appointment
                                    </a>
                                ) : (
                                    <button
                                        disabled
                                        className="inline-flex items-center px-4 py-2 bg-sky-100 text-sky-400 rounded-md text-sm cursor-not-allowed"
                                    >
                                        No appointment
                                    </button>
                                )}

                                <div className="text-xs text-sky-500">
                                    {consultationHours && Object.keys(consultationHours).length > 0
                                        ? "Schedule available"
                                        : "No schedule"}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 bg-sky-50 rounded-md p-2">
                                <div className="text-center px-2">
                                    <div className="text-sm text-sky-600">Reviews</div>
                                    <div className="text-lg font-semibold text-sky-900">
                                        {extraAttributes?.patientReviewsAvg ? extraAttributes.patientReviewsAvg.toFixed(1) : "—"}
                                    </div>
                                </div>
                                <div className="text-center px-2 border-l border-r border-sky-100">
                                    <div className="text-sm text-sky-600">Hospitals</div>
                                    <div className="text-lg font-semibold text-sky-900">
                                        {extraAttributes?.hospitals?.length ?? 0}
                                    </div>
                                </div>
                                <div className="text-center px-2">
                                    <div className="text-sm text-sky-600">Availability</div>
                                    <div className="text-lg font-semibold text-sky-900">
                                        {emergencyAppointments ? "24/7" : telemedicineAvailable ? "Remote" : "In-person"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-1 bg-sky-50 border border-sky-100 rounded-md p-4">
                            <div className="text-sm text-sky-600 font-medium">Focus areas</div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {extraAttributes?.focusAreas && extraAttributes.focusAreas.length > 0 ? (
                                    extraAttributes.focusAreas.map((f, i) => (
                                        <span
                                            key={i}
                                            className="text-xs bg-white text-sky-700 px-2 py-1 rounded-full border border-sky-100"
                                        >
                                            {f}
                                        </span>
                                    ))
                                ) : (
                                    <div className="text-sky-500">—</div>
                                )}
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 bg-white border border-sky-100 rounded-md p-4">
                            <div className="text-sm text-sky-600 font-medium">Profile summary</div>
                            <div className="mt-2 text-sky-700 text-sm">
                                <div>
                                    <strong className="text-sky-900">Name:</strong>{" "}
                                    {`${empty(title)} ${empty(firstName)} ${empty(lastName)}`.replace(/\s+/g, " ")}
                                </div>
                                <div className="mt-1">
                                    <strong className="text-sky-900">Gender:</strong> {empty(gender)}
                                </div>
                                <div className="mt-1">
                                    <strong className="text-sky-900">ID:</strong> {empty(idNumber)}
                                </div>
                                <div className="mt-2 text-sky-600">
                                    {/* brief hospitals preview */}
                                    <strong className="text-sky-900">Hospitals:</strong>{" "}
                                    {extraAttributes?.hospitals && extraAttributes.hospitals.length > 0 ? (
                                        <span>
                                            {extraAttributes.hospitals.slice(0, 2).map((h, idx) => (
                                                <span key={idx} className="inline-block">
                                                    {h.hospitalName}{idx < Math.min(1, hospitals.length - 1) ? ", " : ""}
                                                </span>
                                            ))}
                                            {extraAttributes.hospitals.length > 2 ? ` +${extraAttributes.hospitals.length - 2} more` : ""}
                                        </span>
                                    ) : (
                                        "—"
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-3 bg-sky-50 border border-sky-100 rounded-md p-4">
                            <div className="text-sm text-sky-600 font-medium">Upcoming consultation hours (preview)</div>
                            <div className="mt-2 text-sky-700">
                                <div>
                                    <strong className="text-sky-900">Focus areas:</strong>{" "}
                                    {extraAttributes?.focusAreas && extraAttributes.focusAreas.length > 0
                                        ? extraAttributes.focusAreas.join(", ")
                                        : "—"}
                                </div>

                                <div className="mt-2">
                                    <strong className="text-sky-900">Patient reviews (avg):</strong>{" "}
                                    {typeof extraAttributes?.patientReviewsAvg === "number"
                                        ? extraAttributes.patientReviewsAvg.toFixed(1)
                                        : "—"}
                                </div>

                                <div className="mt-3">
                                    <strong className="text-sky-900">Hospitals:</strong>
                                    {hospitals.length > 0 ? (
                                        <div className={hospitals.length > 1 ? "mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2" : "mt-2 space-y-2"}>
                                            {hospitals.map((h, i) => (
                                                <div key={i} className="bg-white border border-sky-100 rounded-md p-3">
                                                    <div className="font-medium text-sky-900">{h.hospitalName}</div>
                                                    <div className="text-sm text-sky-600">Availability: {empty(h.availability)}</div>
                                                    <div className="text-sm text-sky-600">Contact: {empty(h.contactDetails)}</div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-sky-500">—</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
    );
}