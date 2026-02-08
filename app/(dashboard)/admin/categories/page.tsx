"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { categoryService } from "@/services/category.service";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/dashboard/Loader";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  // fetch
  const fetchCategories = async () => {
    setLoading(true);
    const res = await categoryService.getAllCategory();
    if (res?.success) setCategories(res.data);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, []);

  // create
  const handleCreate = async () => {
    if (!newCategory.trim()) return;

    const res = await categoryService.createCategory(newCategory);

    if (res?.success) {
      Swal.fire({
        icon: "success",
        title: "Category Added",
        timer: 1200,
        showConfirmButton: false,
      });
      setNewCategory("");
      fetchCategories();
    } else {
      Swal.fire("Error", "Failed to create", "error");
    }
  };

  // update
  const handleUpdate = async (id: string) => {
    const res = await categoryService.updateCategory(id, editName);

    if (res?.success) {
      Swal.fire({
        icon: "success",
        title: "Updated",
        timer: 1200,
        showConfirmButton: false,
      });
      setEditingId(null);
      fetchCategories();
    } else {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  // delete
  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Delete Category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    const res = await categoryService.deleteCategory(id);

    if (res?.success) {
      Swal.fire("Deleted!", "", "success");
      fetchCategories();
    } else {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  return (
   <div className="p-4 space-y-6">
  <h1 className="text-3xl font-bold">Category Management</h1>

  {/* Add category */}
  <Card>
    <CardContent className="flex flex-col sm:flex-row gap-3 p-5">
      <Input
        placeholder="Enter category name..."
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        className="flex-1"
      />
      <Button onClick={handleCreate} className="gap-2 bg-[#FF833B] w-full sm:w-auto">
        <Plus size={16} /> Add
      </Button>
    </CardContent>
  </Card>

  {/* Loader */}
  {loading ? (
    <div className="flex justify-center items-center h-[50vh]">
      <Loader />
    </div>
  ) : (
    <Card>
      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-sm min-w-125 sm:min-w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Category Name</th>
              <th className="p-4 text-left">Created</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat, i) => (
              <tr key={cat.id} className="border-t">
                <td className="p-4">{i + 1}</td>

                {/* name */}
                <td className="p-4">
                  {editingId === cat.id ? (
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    cat.name
                  )}
                </td>

                {/* date */}
                <td className="p-4">
                  {new Date(cat.createdAt).toLocaleDateString()}
                </td>

                {/* actions */}
                <td className="p-4 flex flex-wrap justify-center gap-2">
                  {editingId === cat.id ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleUpdate(cat.id)}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setEditingId(cat.id);
                          setEditName(cat.name);
                        }}
                      >
                        <Pencil size={16} />
                      </Button>

                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(cat.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )}
</div>

  );
}
