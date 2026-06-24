import { mockCategories } from "../data/mockData";

let categories = [...mockCategories];
let nextId = categories.length + 1;

export const categoryService = {
  getAll() {
    return Promise.resolve([...categories]);
  },

  create(data) {
    const newCat = { ...data, id: nextId++, gymCount: 0 };
    categories = [...categories, newCat];
    return Promise.resolve(newCat);
  },

  update(id, data) {
    categories = categories.map((c) => (c.id === id ? { ...c, ...data } : c));
    return Promise.resolve(categories.find((c) => c.id === id));
  },

  delete(id) {
    categories = categories.filter((c) => c.id !== id);
    return Promise.resolve(true);
  },
};
