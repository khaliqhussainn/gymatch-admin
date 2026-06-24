const ADMIN_CREDENTIALS = {
  email: "admin@gymatch.com",
  password: "admin123",
};

const AUTH_KEY = "gymatch_admin_auth";

export const authService = {
  login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          email === ADMIN_CREDENTIALS.email &&
          password === ADMIN_CREDENTIALS.password
        ) {
          const user = { email, name: "Admin", role: "super_admin" };
          localStorage.setItem(AUTH_KEY, JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error("Invalid email or password."));
        }
      }, 800);
    });
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
  },

  getUser() {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  isAuthenticated() {
    return Boolean(this.getUser());
  },
};
