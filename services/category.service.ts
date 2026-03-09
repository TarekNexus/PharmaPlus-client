/* eslint-disable @typescript-eslint/no-explicit-any */


const baseUrl= process.env.NEXT_PUBLIC_API_URL 

export const categoryService = {

  async getAllCategory(cookieStore: any) {
    try {
      const res = await fetch(`${baseUrl}/api/admin/categories`, {
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },


  async createCategory(name: string,cookieStore: any) {
    try {
      const res = await fetch(`${baseUrl}/api/admin/categories`, {
        method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
       
        body: JSON.stringify({ name }),
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },

  async updateCategory(id: string, name: string,cookieStore: any) {
    try {
      const res = await fetch(`${baseUrl}/api/admin/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        
        body: JSON.stringify({ name }),
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },

 
  async deleteCategory(id: string,cookieStore: any) {
    try {
      const res = await fetch(`${baseUrl}/api/admin/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },
};
