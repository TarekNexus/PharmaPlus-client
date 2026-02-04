"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Medicine, Category } from "@/types";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input";
import Link from "next/link";

interface Props {
  medicines: Medicine[];
  categories: Category[];
}

export default function Card({ medicines, categories }: Props) {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedManufacturer, setSelectedManufacturer] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Price inputs as strings so user can delete freely
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("1000");

  const itemsPerPage = 9;

  // Unique manufacturers
  const manufacturers = useMemo(
  () => Array.from(new Set(medicines.map((med) => med.Manufacturer).filter((m): m is string => !!m))),
  [medicines]
);

  // Filtered medicines
  const filteredMedicines = useMemo(() => {
    return medicines.filter((med) => {
      const categoryMatch = activeTab === "All" || med.category.name === activeTab;
      const manufacturerMatch = selectedManufacturer === "All" || med.Manufacturer === selectedManufacturer;

      // Convert strings to numbers; empty string fallback
      const min = Number(minPrice || 0);
      const max = Number(maxPrice || Infinity);
      const priceMatch = med.price >= min && med.price <= max;

      const searchMatch = med.name.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && manufacturerMatch && priceMatch && searchMatch;
    });
  }, [medicines, activeTab, selectedManufacturer, minPrice, maxPrice, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentMedicines = filteredMedicines.slice(indexOfFirst, indexOfLast);

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  return (
    <section className="mx-auto w-11/12 mt-10 rounded-[25px] py-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center items-center">
        {/* Search */}
        <Input
          type="text"
          placeholder="Search medicine..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-2 w-48"
        />

        {/* Category Tabs */}
        {["All", ...(categories?.map((cat) => cat.name) || [])].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab
                ? "bg-[#FF833B] text-white"
                : "bg-[#FFFBF5] border border-[#211F1A] text-[#21201B] hover:border-[#FF833B]"
            }`}
          >
            {tab}
          </button>
        ))}

        {/* Manufacturer Filter */}
        <Select
          value={selectedManufacturer}
          onValueChange={(value) => {
            setSelectedManufacturer(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="All Manufacturers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Manufacturers</SelectItem>
            {manufacturers.map((manu) => (
              <SelectItem key={manu} value={manu}>
                {manu}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Price Inputs */}
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Min $"
            className="w-20"
          />
          <span className="text-gray-500">-</span>
          <Input
            type="number"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Max $"
            className="w-20"
          />
        </div>
      </div>

      {/* Medicines Grid */}
      {currentMedicines.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentMedicines.map((med) => (
            <Link key={med.id} href={`/shop/${med.id}`}>
              <div className="group bg-white rounded-2xl overflow-hidden duration-300 shadow hover:bg-[#F7F2E9]">
                <div className="relative h-56 overflow-hidden pt-3 px-3">
                  {med.image ? (
                    <Image
                      src={med.image.startsWith("http") ? med.image : "/" + med.image}
                      alt={med.name}
                      width={381}
                      height={222}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-xl">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {med.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{med.description}</p>
                  <p className="text-sm text-gray-600 mb-4">{med.Manufacturer}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#FF833B] font-semibold">${med.price}</span>
                    <span className="text-gray-500 font-medium">Stock: {med.stock}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-16">
          <p className="text-lg font-semibold">No medicines found for these filters</p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3 mt-10">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 disabled:opacity-40"
        >
          ‹
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-sm ${
                currentPage === page
                  ? "bg-[#FF833B] text-white"
                  : "bg-[#FFF8F3] text-gray-800 hover:bg-[#FFE4D0]"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 disabled:opacity-40"
        >
          ›
        </button>
      </div>
    </section>
  );
}
