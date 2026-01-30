import React, { JSX, useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { createDoctor, getDoctors } from "@/api/doctorApi";
import type { Doctor, PaginatedResponse } from "@/types/doctor.types";
import { useNavigate } from "react-router-dom";
import { Category } from "@/types/category.types";
import { City } from "@/types/city.types";
import { getCategories } from "@/api/categoryApi";
import { getCities } from "@/api/cityApi";
import { CivicCreate } from "@/types/civic.types";
import { createCivic } from "@/api/civicApi";

export default function DoctorPage(): JSX.Element {
    
  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);
    const [servicesInput, setServicesInput] = useState("");

    const [formData, setFormData] = useState<CivicCreate>({
    title: "",
    description: "",
    address: "",
    cityId: 0,
    categoryId: 0,
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


  useEffect(() => {
    // Fetch categories and cities
    getInitialData();
  }, []);

const getInitialData = async () => {
    // Fetch categories and cities
    const categoriesResponse = await getCategories();
    const citiesResponse = await getCities();
    setCategories(categoriesResponse);
    setCities(citiesResponse);
  }

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
            const res = await createCivic(formData);
            alert('Emergency created successfully');
            setServicesInput("");
            setFormData({
                title: "",
                description: "",
                address: "",
                cityId: 0,
                categoryId: 0,
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
      // Refresh list
      } catch (err) {
        alert('Failed to create emergency');
      }
    };
  return (
    <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Entry of a New Emergency Information</h2>
          <form 
                onSubmit={handleSubmit} 
                className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6"
                >
                <h2 className="text-2xl font-semibold text-gray-800">Add New Entry</h2>

                {/* Title */}
                <div>
                    <label className="block mb-1 text-gray-700 font-medium">Title</label>
                    <input
                    type="text"
                    placeholder="Enter title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                    />
                </div>

                {/* Description (second field) */}
                <div>
                    <label className="block mb-1 text-gray-700 font-medium">Description</label>
                    <textarea
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter a brief description"
                    className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    rows={4}
                    required
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="block mb-1 text-gray-700 font-medium">Address</label>
                    <input
                    type="text"
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                    />
                </div>
                <div>
                    <label className="block mb-1 text-gray-700 font-medium">Contact Number</label>
                    <input
                    type="text"
                    placeholder="Enter contact number"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                    />
                </div>
                <div>
                    <label className="block mb-1 text-gray-700 font-medium">Email Address</label>
                    <input
                    type="text"
                    placeholder="Enter email address"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* City */}
                    <div>
                    <label className="block mb-1 text-gray-700 font-medium">City</label>
                    <select
                        value={formData.cityId ?? ""}
                        onChange={(e) =>
                        setFormData({ ...formData, cityId: parseInt(e.target.value) })
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                        <option value="">Select city (optional)</option>
                        {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                        ))}
                    </select>
                    </div>

                    {/* Category */}
                    <div>
                    <label className="block mb-1 text-gray-700 font-medium">Category</label>
                    <select
                        value={formData.categoryId ?? ""}
                        onChange={(e) =>
                        setFormData({ ...formData, categoryId: parseInt(e.target.value) })
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                        <option value="">Select category (optional)</option>
                        {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                        ))}
                    </select>
                    </div>
                </div>

                {/* Extra Attributes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label className="block mb-1 text-gray-700 font-medium">Non-emergency Phone</label>
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
                        placeholder="Enter phone number"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    </div>

                    <div>
                    <label className="block mb-1 text-gray-700 font-medium">Services</label>
                    <input
                        value={servicesInput}
                        onChange={(e) => setServicesInput(e.target.value)}
                        onBlur={() => {
                            // Convert string to array when the user leaves the input
                            setFormData({
                            ...formData,
                            extraAttributes: {
                                ...formData.extraAttributes,
                                services: servicesInput
                                .split(/[,]+/) // split by commas only
                                .map((s) => s.trim())
                                .filter(Boolean),
                            },
                            });
                        }}
                        placeholder="Enter services, separated by commas"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />

                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                    type="submit"
                    className="bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition"
                    >
                    Submit
                    </button>
                </div>
                </form>

        </div>
    </div>
  );
}