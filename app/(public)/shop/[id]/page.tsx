"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { medicineService } from "@/services/medicine.service";
import { Medicine } from "@/types";

const Page = () => {
  const { id } = useParams<{ id: string }>();

  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMedicine = async () => {
      try {
        const result = await medicineService.getMedicineById(id);

        // your API returns the medicine directly
        setMedicine(result);
      } catch (error) {
        console.error("Error fetching medicine:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicine();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading medicine details...
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500">
        Medicine not found
      </div>
    );
  }
console.log("fron web",medicine);
  return (
    <section className="w-11/12 mx-auto mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl p-8 shadow">
        {/* Image */}
        <div className="relative h-87.5 rounded-xl overflow-hidden">
          <Image
            src={
              medicine.image?.startsWith("http")
                ? medicine.image
                : "/" + medicine.image
            }
            alt={medicine.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-semibold mb-3">
            {medicine.name}
          </h1>
          <h1 className="text-3xl font-semibold mb-3">
            {medicine.seller?.name}
            {medicine.seller?.email}
          </h1>

          <p className="text-gray-600 mb-4">
            {medicine.description}
          </p>

          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-medium">Category:</span>{" "}
              {medicine.category?.name}
            </p>
            <p>
              <span className="font-medium">Manufacturer:</span>{" "}
              {medicine.Manufacturer}
            </p>
            <p>
              <span className="font-medium">Stock:</span>{" "}
              {medicine.stock}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-2xl font-bold text-[#FF833B]">
              ${medicine.price}
            </span>

            <button className="px-6 py-3 rounded-lg bg-[#FF833B] text-white hover:bg-[#e9722f] transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
