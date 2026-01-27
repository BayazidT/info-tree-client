import React, { JSX, useEffect, useMemo, useState } from "react";
import { Plus, ExternalLink, MapPin, Eye, Trash2 } from "lucide-react";
import Card from "@/components/ui/Card";
import { createDoctor, getDoctors, findDoctorById } from "@/api/doctorApi";
import type { Doctor, PaginatedResponse } from "@/types/doctor.types";
import { useNavigate } from "react-router-dom";
import DoctorDetails from "@/components/doctor/DoctorDetails";
export default function DoctorPage(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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
    Sun: "",
  },
  extraAttributes: {
    focusAreas: [],
    patientReviewsAvg: 4.5,
    hospitals: [
      {
        hospitalName: "",
        availability: "",
        contactDetails: "",
      },
    ],
  },
});

// Fetch a single doctor using id from the URL and populate formData
useEffect(() => {
  const fetchDoctorById = async () => {
    try {
      setLoading(true);
      setError(null);

      // Attempt to extract numeric id from the current pathname (e.g. /doctor/3)
      const match = window.location.pathname.match(/\/(\d+)(?:\/)?$/);
      const idFromUrl = match ? match[1] : null;
      if (!idFromUrl) {
        setError("Doctor id not found in URL");
        return;
      }

      const res = await findDoctorById(idFromUrl);
      // findDoctorById might return a Fetch Response or the already-parsed doctor object.
      let doctor: any;
      if (res && typeof (res as Response).ok === "boolean" && typeof (res as Response).text === "function") {
        const fetchRes = res as Response;
        if (!fetchRes.ok) {
          const txt = await fetchRes.text().catch(() => fetchRes.statusText);
          throw new Error(txt || `Failed to fetch doctor (${fetchRes.status})`);
        }
        doctor = await fetchRes.json();
      } else {
        // assume res is already the parsed doctor object
        doctor = res;
      }

      // remove id when setting formData (CreateDoctor omits id)
      const { id, ...rest } = doctor;
      const normalized: Doctor = {
        title: rest.title ?? "",
        firstName: rest.firstName ?? "",
        lastName: rest.lastName ?? "",
        gender: rest.gender ?? "",
        idNumber: rest.idNumber ?? "",
        address: rest.address ?? "",
        cityName: rest.cityName ?? "",
        categoryId: rest.categoryId ?? 0,
        privatePatientsOnly: rest.privatePatientsOnly ?? false,
        acceptsNewPatients: rest.acceptsNewPatients ?? false,
        telemedicineAvailable: rest.telemedicineAvailable ?? false,
        appointmentUrl: rest.appointmentUrl ?? "",
        emergencyAppointments: rest.emergencyAppointments ?? false,
        consultationHours: rest.consultationHours ?? { Sat: "", Sun: "" },
        extraAttributes: {
          ...(rest.extraAttributes ?? {}),
          focusAreas: rest.extraAttributes?.focusAreas ?? [],
          patientReviewsAvg: rest.extraAttributes?.patientReviewsAvg ?? 4.5,
          hospitals:
            rest.extraAttributes?.hospitals?.length > 0
              ? rest.extraAttributes.hospitals
              : [
                  {
                    hospitalName: "",
                    availability: "",
                    contactDetails: "",
                  },
                ],
        },
      };

      setFormData(normalized);
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Unknown error fetching doctor");
    } finally {
      setLoading(false);
    }
  };

  fetchDoctorById();
  // run once on mount
}, []);

  
    return (
      <div className="space-y-6">
        <DoctorDetails doctor={formData} />
      </div>
    );
  }