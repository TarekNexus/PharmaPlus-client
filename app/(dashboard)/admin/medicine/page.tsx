/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */

"use client";

import { useEffect, useState } from "react";
import { medicineService, MedicineInput } from "@/services/medicine.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast, { Toaster } from "react-hot-toast";
import { Pencil, Trash2, Plus } from "lucide-react";
import Loader from "@/components/dashboard/Loader";
import Image from "next/image";
import { Medicine } from "@/types";

type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<MedicineInput>({
    name: "",
    category: { id: "" },
    price: "0",
    stock: "0",
    description: "",
    image: "",
    Manufacturer: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [medicinesRes, categoriesData] = await Promise.all([
        medicineService.getAllMedicines(),
        medicineService.getAllCategories(),
      ]);
      setMedicines(medicinesRes.data || []);
      setCategories(categoriesData);
    } catch (error) {
      toast.error("Failed to fetch data ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formDataUpload,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, image: data.secure_url }));
        setPreview(data.secure_url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleAddMedicine = async () => {
    const price = parseFloat(formData.price as string);
    const stock = parseInt(formData.stock as string);

    if (!formData.name || !formData.category?.id || price <= 0 || stock <= 0) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      await medicineService.createMedicine({ ...formData, price, stock });
      toast.success("Medicine added successfully ");
      setIsAddDialogOpen(false);
      resetForm();
      fetchData();
    } catch (error) {
      toast.error("Failed to add medicine ❌");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditMedicine = async () => {
    if (!selectedMedicine) return;

    const price = parseFloat(formData.price as string);
    const stock = parseInt(formData.stock as string);

    if (!formData.name || !formData.category?.id || price <= 0 || stock <= 0) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      await medicineService.updateMedicine(selectedMedicine.id, {
        ...formData,
        price,
        stock,
      });
      toast.success("Medicine updated successfully ");
      setIsEditDialogOpen(false);
      resetForm();
      setSelectedMedicine(null);
      fetchData();
    } catch (error) {
      toast.error("Failed to update medicine ❌");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMedicine = async () => {
    if (!selectedMedicine) return;

    setSubmitting(true);
    try {
      await medicineService.deleteMedicine(selectedMedicine.id);
      toast.success("Medicine deleted successfully ");
      setIsDeleteDialogOpen(false);
      setSelectedMedicine(null);
      fetchData();
    } catch (error) {
      toast.error("Failed to delete medicine ❌");
    } finally {
      setSubmitting(false);
    }
  };

  const openEditDialog = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setFormData({
      name: medicine.name,
      category: { id: medicine.category.id },
      price: medicine.price,
      stock: medicine.stock,
      description: medicine.description,
      image: medicine.image,
      Manufacturer: medicine.Manufacturer || "",
    });
    setPreview(medicine.image || null);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: { id: "" },
      price: "0",
      stock: "0",
      description: "",
      image: "",
      Manufacturer: "",
    });
    setPreview(null);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMedicines = medicines.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(medicines.length / itemsPerPage);

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full relative">
      <Toaster position="top-right" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-5">
        <h1 className="lg:text-3xl md:lg:text-3xl text-2xl font-satoshi font-bold text-[#FF833B] mb-4">
          Medicines Management
        </h1>
        <Button
          onClick={() => {
            resetForm();
            setIsAddDialogOpen(true);
          }}
          className="bg-[#FF833B] hover:bg-[#ff6f1f] w-full font-satoshi sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Medicine
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-60 sm:h-80">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-full overflow-x-auto rounded-lg shadow-sm">
            <Table className="min-w-250 w-full">
              <TableHeader>
                <TableRow className="bg-[#FF833B] text-white font-satoshi">
                  <TableHead>No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {currentMedicines.map((medicine, index) => (
                  <TableRow key={medicine.id} className="font-satoshi">
                    <TableCell>
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </TableCell>
                    <TableCell>{medicine.name}</TableCell>
                    <TableCell>{medicine.category.name}</TableCell>
                    <TableCell>${medicine.price}</TableCell>
                    <TableCell>{medicine.stock}</TableCell>
                    <TableCell>{medicine.Manufacturer || "N/A"}</TableCell>
                    <TableCell title={medicine.description} className="max-w-50 truncate">
                      {medicine.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(medicine)}
                          className="text-xs"
                        >
                          <Pencil className="h-3 w-3 sm:mr-1" />
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => openDeleteDialog(medicine)}
                          className="text-xs"
                        >
                          <Trash2 className="h-3 w-3 sm:mr-1" />
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-4 gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </Button>
            <span className="flex items-center px-2">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}

      {/* Add Medicine Modal */}
      {(isAddDialogOpen || isEditDialogOpen) && (
        <div className="fixed inset-0 z-50 p-4 flex items-start sm:items-center justify-center bg-black/50 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 w-[85vw] sm:w-150 max-h-[90vh] rounded-3xl shadow-lg flex flex-col">
            {/* Header */}
            <div className="px-4 sm:px-6 py-2 flex justify-end items-center rounded-t-3xl">
              <button
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                onClick={() => {
                  isAddDialogOpen
                    ? setIsAddDialogOpen(false)
                    : setIsEditDialogOpen(false);
                }}
              >
                ✕
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
              <h2 className="text-lg sm:text-xl text-center font-satoshi font-semibold">
                {isAddDialogOpen ? "Add New Medicine" : "Edit Medicine"}
              </h2>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2 font-satoshi">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    className="font-satoshi"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Medicine name"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category?.id || ""}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: { id: value } })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4 font-satoshi">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="0.00"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stock">Stock *</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Input
                    id="manufacturer"
                    value={formData.Manufacturer}
                    onChange={(e) =>
                      setFormData({ ...formData, Manufacturer: e.target.value })
                    }
                    placeholder="Manufacturer name"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="image">Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading || submitting}
                  />
                  {uploading && (
                    <span className="text-[#FF833B] mt-1">Uploading...</span>
                  )}
                  {preview && (
                    <div className="flex justify-center mt-2">
                      <Image
                        src={preview}
                        alt="Preview"
                        width={96}
                        height={96}
                        className="rounded-lg border"
                      />
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Medicine description"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between bg-white dark:bg-gray-900 shrink-0">
              <Button
                variant="outline"
                onClick={() => {
                  isAddDialogOpen
                    ? setIsAddDialogOpen(false)
                    : setIsEditDialogOpen(false);
                }}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                onClick={isAddDialogOpen ? handleAddMedicine : handleEditMedicine}
                disabled={submitting || uploading}
                className="bg-[#FF833B] hover:bg-[#ff6f1f] ml-2"
              >
                {submitting
                  ? isAddDialogOpen
                    ? "Adding..."
                    : "Updating..."
                  : isAddDialogOpen
                  ? "Add Medicine"
                  : "Update Medicine"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="w-2xl sm:max-w-106.25">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              medicine
              <strong className="block mt-2">{selectedMedicine?.name}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMedicine}
              disabled={submitting}
              className="bg-red-600"
            >
              {submitting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
