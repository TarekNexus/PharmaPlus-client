

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const categoryService = {

  async getAllCategory() {
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


  async createCategory(name: string) {
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

  async updateCategory(id: string, name: string) {
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

 
  async deleteCategory(id: string) {
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
