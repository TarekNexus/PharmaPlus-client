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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<MedicineInput>({
    name: "",
    category: { id: "" },
    price: 0,
    stock: 0,
    description: "",
    image: "",
    Manufacturer: "",
  });

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to fetch data ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedicine = async () => {
    if (!formData.name || !formData.category?.id || formData.price <= 0 || formData.stock <= 0) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      await medicineService.createMedicine(formData);
      toast.success("Medicine added successfully ✅");
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

    if (!formData.name || !formData.category?.id || formData.price <= 0 || formData.stock <= 0) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      await medicineService.updateMedicine(selectedMedicine.id, formData);
      toast.success("Medicine updated successfully ✅");
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
      await medicineService.deleteMedicine(selectedMedicine.id);
      toast.success("Medicine deleted successfully ✅");
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

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-5">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Medicines Management</h1>
        <Button
          onClick={() => {
            resetForm();
            setIsAddDialogOpen(true);
          }}
          className="bg-[#FF833B] hover:bg-[#ff6f1f] w-full sm:w-auto"
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
        <div className="w-full overflow-x-auto rounded-lg shadow-sm">
          <Table className="min-w-250 w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs sm:text-sm">No</TableHead>
                <TableHead className="text-xs sm:text-sm">Name</TableHead>
                <TableHead className="text-xs sm:text-sm">Category</TableHead>
                <TableHead className="text-xs sm:text-sm">Price</TableHead>
                <TableHead className="text-xs sm:text-sm">Stock</TableHead>
                <TableHead className="text-xs sm:text-sm">Manufacturer</TableHead>
                <TableHead className="text-xs sm:text-sm">Description</TableHead>
                <TableHead className="text-xs sm:text-sm text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {medicines.map((medicine, index) => (
                <TableRow key={medicine.id}>
                  <TableCell className="text-xs sm:text-sm">{index + 1}</TableCell>
                  <TableCell className="text-xs sm:text-sm font-medium">{medicine.name}</TableCell>
                  <TableCell className="text-xs sm:text-sm">{medicine.category.name}</TableCell>
                  <TableCell className="text-xs sm:text-sm">${medicine.price}</TableCell>
                  <TableCell className="text-xs sm:text-sm">{medicine.stock}</TableCell>
                  <TableCell className="text-xs sm:text-sm">{medicine.Manufacturer || "N/A"}</TableCell>
                  <TableCell className="text-xs sm:text-sm max-w-50 truncate" title={medicine.description}>
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
      )}

      {/* Add Medicine Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="w-2xl sm:max-w-125 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Medicine</DialogTitle>
            <DialogDescription>Fill in the details to add a new medicine to your inventory.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Medicine name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category?.id || ""}
                onValueChange={(value) => setFormData({ ...formData, category: { id: value } })}
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
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
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
                    setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })
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
                onChange={(e) => setFormData({ ...formData, Manufacturer: e.target.value })}
                placeholder="Manufacturer name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Medicine description"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button onClick={handleAddMedicine} disabled={submitting} className="bg-[#FF833B] hover:bg-[#ff6f1f]">
              {submitting ? "Adding..." : "Add Medicine"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Medicine Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="w-2xl sm:max-w-125 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Medicine</DialogTitle>
            <DialogDescription>Update the medicine details below.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Medicine name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-category">Category *</Label>
              <Select
                value={formData.category?.id || ""}
                onValueChange={(value) => setFormData({ ...formData, category: { id: value } })}
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
                    setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
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
                    setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })
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
                onChange={(e) => setFormData({ ...formData, Manufacturer: e.target.value })}
                placeholder="Manufacturer name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input
                id="edit-image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description *</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Medicine description"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button onClick={handleEditMedicine} disabled={submitting} className="bg-[#FF833B] hover:bg-[#ff6f1f]">
              {submitting ? "Updating..." : "Update Medicine"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="w-2xl sm:max-w-106.25">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the medicine
              <strong className="block mt-2">{selectedMedicine?.name}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMedicine}
              disabled={submitting}
              className="bg-red-600 hover:bg-red-700"
            >
              {submitting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
