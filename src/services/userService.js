import { mockUsers } from "../data/mockData";

let users = [...mockUsers];

export const userService = {
  getAll() {
    return Promise.resolve([...users]);
  },

  updateStatus(id, status) {
    users = users.map((u) => (u.id === id ? { ...u, status } : u));
    return Promise.resolve(users.find((u) => u.id === id));
  },

  delete(id) {
    users = users.filter((u) => u.id !== id);
    return Promise.resolve(true);
  },
};
