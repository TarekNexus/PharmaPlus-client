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
import toast from "react-hot-toast";
import { Pencil, Trash2, Plus } from "lucide-react";
import Loader from "@/components/dashboard/Loader";
import { Medicine } from "@/types";
import { sellerService } from "@/services/seller.service";

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [medicinesRes, categoriesData] = await Promise.all([
       sellerService.getAllMedicinesbySeller(),
        medicineService.getAllCategories(),
      ]);
      setMedicines(medicinesRes.data || []);
      setCategories(categoriesData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to fetch data ❌");
    } finally {
      setLoading(false);
    }
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
      await sellerService.createMedicineSeller({ ...formData, price, stock });
      toast.success("Medicine added successfully ");
      setIsAddDialogOpen(false);
      resetForm();
      fetchData();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      await sellerService.updateMedicineSeller(selectedMedicine.id, {
        ...formData,
        price,
        stock,
      });
      toast.success("Medicine updated successfully ");
      setIsEditDialogOpen(false);
      resetForm();
      setSelectedMedicine(null);
      fetchData();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      await sellerService.deleteMedicineSeller(selectedMedicine.id);
      toast.success("Medicine deleted successfully ");
      setIsDeleteDialogOpen(false);
      setSelectedMedicine(null);
      fetchData();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      price: 0,
      stock: 0,
      description: "",
      image: "",
      Manufacturer: "",
    });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMedicines = medicines.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(medicines.length / itemsPerPage);

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full">
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
              <TableHeader >
                <TableRow  className="bg-[#FF833B] text-white font-satoshi">
                  <TableHead className="text-sm sm:text-sm font-bold text-white">No</TableHead>
                  <TableHead className="text-sm sm:text-sm font-bold text-white">Name</TableHead>
                  <TableHead className="text-sm sm:text-sm font-bold text-white">Category</TableHead>
                  <TableHead className="text-sm sm:text-sm font-bold text-white">Price</TableHead>
                  <TableHead className="text-sm sm:text-sm font-bold text-white">Stock</TableHead>
                  <TableHead className="text-sm sm:text-sm font-bold text-white">Manufacturer</TableHead>
                  <TableHead className="text-sm sm:text-sm font-bold text-white">Description</TableHead>
                  <TableHead className="text-sm sm:text-sm text-right font-bold text-white">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {currentMedicines.map((medicine, index) => (
                  <TableRow key={medicine.id}  className="font-satoshi">
                    <TableCell className="text-xs sm:text-sm">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm font-medium">
                      {medicine.name}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">
                      {medicine.category.name}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">
                      ${medicine.price}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">{medicine.stock}</TableCell>
                    <TableCell className="text-xs sm:text-sm">
                      {medicine.Manufacturer || "N/A"}
                    </TableCell>
                    <TableCell
                      className="text-xs sm:text-sm max-w-50 truncate"
                      title={medicine.description}
                    >
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

          {/* Pagination Controls */}
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

        {/* add medicine  */}

      {/* Modal */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 z-50 p-4 flex items-start sm:items-center justify-center bg-black/50 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 w-[85vw] sm:w-150 max-h-[90vh] rounded-3xl shadow-lg flex flex-col">
            {/* Header */}
            <div className="px-4 sm:px-6 py-2 flex justify-end items-center rounded-t-3xl">
              <button
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                onClick={() => setIsAddDialogOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
              <h2 className="text-lg sm:text-xl text-center font-satoshi font-semibold">
                Add New Medicine
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
                      className="font-satoshi"
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
                      placeholder="0.00"
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
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                  />
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
                onClick={() => setIsAddDialogOpen(false)}
                className=""
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddMedicine}
                disabled={submitting}
                className="bg-[#FF833B] hover:bg-[#ff6f1f] ml-2"
              >
                {submitting ? "Adding..." : "Add Medicine"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {isEditDialogOpen && (
        <div className="fixed inset-0 z-50 p-4 flex items-start sm:items-center justify-center bg-black/50 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 w-[85vw] sm:w-150 max-h-[90vh] rounded-3xl shadow-lg flex flex-col">
            {/* Header */}
            <div className="px-4 sm:px-6 py-2 flex justify-end items-center rounded-t-3xl">
              <button
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                onClick={() => setIsEditDialogOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
              <h2 className="text-lg sm:text-xl text-center font-semibold font-satoshi">
                Edit Medicine
              </h2>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Name *</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Medicine name"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="edit-category">Category *</Label>
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-price">Price *</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="0.00"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="edit-stock">Stock *</Label>
                    <Input
                      id="edit-stock"
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
                  <Label htmlFor="edit-manufacturer">Manufacturer</Label>
                  <Input
                    id="edit-manufacturer"
                    value={formData.Manufacturer}
                    onChange={(e) =>
                      setFormData({ ...formData, Manufacturer: e.target.value })
                    }
                    placeholder="Manufacturer name"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="edit-image">Image URL</Label>
                  <Input
                    id="edit-image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description *</Label>
                  <Textarea
                    id="edit-description"
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
            <div className="px-4 sm:px-6  py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between bg-white dark:bg-gray-900 shrink-0">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className=""
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditMedicine}
                disabled={submitting}
                className="bg-[#FF833B] hover:bg-[#ff6f1f] ml-2"
              >
                {submitting ? "Updating..." : "Update Medicine"}
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
