import { env } from "@/env"; // if using env
// or use process.env.NEXT_PUBLIC_API_URL

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const categoryService = {
  // 🔵 GET all
  async getAll() {
    try {
      const res = await fetch(`${baseUrl}/api/admin/categories`, {
        credentials: "include",
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },

  // 🟢 CREATE
  async create(name: string) {
    try {
      const res = await fetch(`${baseUrl}/api/admin/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name }),
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },

  // 🟡 UPDATE
  async update(id: string, name: string) {
    try {
      const res = await fetch(`${baseUrl}/api/admin/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name }),
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },

 
  async delete(id: string) {
    try {
      const res = await fetch(`${baseUrl}/api/admin/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },
};
