// cart.service.ts
export type CartItem = {
  id: string;        // unique per cart entry
  medicineId: string; // product/medicine ID
  title: string;
  price: number;
  image: string;
  quantity: number;
  selected: boolean;
};

// 🔹 Get all cart items
export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

// 🔹 Add an item to cart
export const addToCart = (item: Omit<CartItem, "id" | "selected">) => {
  const cart = getCart();

  const existing = cart.find(c => c.medicineId === item.medicineId);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push({
      ...item,
      id: crypto.randomUUID(),
      selected: true,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

// 🔹 Update the whole cart
export const updateCart = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// 🔹 Increase quantity of a specific item
export const increaseQuantity = (id: string) => {
  const cart = getCart().map(item =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  );
  updateCart(cart);
  return cart;
};

// 🔹 Decrease quantity of a specific item
export const decreaseQuantity = (id: string) => {
  let cart = getCart().map(item =>
    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
  );
  // Remove item if quantity goes to 0
  cart = cart.filter(item => item.quantity > 0);
  updateCart(cart);
  return cart;
};

// 🔹 Remove an item completely
export const removeItem = (id: string) => {
  const cart = getCart().filter(item => item.id !== id);
  updateCart(cart);
  return cart;
};

// 🔹 Toggle selected state
export const toggleSelect = (id: string) => {
  const cart = getCart().map(item =>
    item.id === id ? { ...item, selected: !item.selected } : item
  );
  updateCart(cart);
  return cart;
};

// 🔹 Unselect all items
export const unselectAll = () => {
  const cart = getCart().map(item => ({ ...item, selected: false }));
  updateCart(cart);
  return cart;
};
