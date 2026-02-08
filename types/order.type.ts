import type { Medicine } from "./medicine.type";

export type OrderItem = {
  id: string;
  orderId: string;
  medicineId: string;
  quantity: number;
  price: number;
  medicine: Medicine;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type Order = {
  id: string;
  userId: string;
  status: string;
  address: string;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  user?: User;
};
