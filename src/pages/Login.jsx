import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiEyeLine, RiEyeOffLine, RiFlashlightLine as RiZapLine, RiLoader4Line } from "react-icons/ri";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [formError, setFormError] = useState({});

  function validate() {
    const errs = {};
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.password) errs.password = "Password is required";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFormError(errs); return; }
    setFormError({});
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch {
      // error shown via hook
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D9FF00] flex items-center justify-center">
              <RiZapLine className="text-[#0A0A0B] text-xl" />
            </div>
            <span className="font-heading text-3xl tracking-wider">GYMATCH</span>
          </div>
        </div>

        <div className="card p-8">
          <div className="mb-8">
            <h2 className="font-heading text-3xl tracking-wide mb-1">Admin Login</h2>
            <p className="text-[#8A8A94] text-sm">Sign in to manage the GYMatch platform</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-xs font-semibold text-[#8A8A94] uppercase tracking-wider block mb-2">
                Email
              </label>
              <input
                type="text"
                className={`input ${formError.email ? "border-[#FF4444]" : ""}`}
                placeholder="admin@gymatch.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
              />
              {formError.email && (
                <p className="text-[#FF4444] text-xs mt-1.5">{formError.email}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-[#8A8A94] uppercase tracking-wider block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  className={`input pr-10 ${formError.password ? "border-[#FF4444]" : ""}`}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64646C] hover:text-white transition-colors"
                >
                  {showPass ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>
              {formError.password && (
                <p className="text-[#FF4444] text-xs mt-1.5">{formError.password}</p>
              )}
            </div>

            {error && (
              <div className="bg-[#FF444415] border border-[#FF444430] rounded-lg p-3">
                <p className="text-[#FF4444] text-sm">{error}</p>
              </div>
            )}

            <button type="submit" className="btn-primary justify-center py-3 mt-1" disabled={loading}>
              {loading ? (
                <>
                  <RiLoader4Line className="spinner" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#2A2A30]">
            <p className="text-[#64646C] text-xs text-center">
              Demo credentials: admin@gymatch.com / admin123
            </p>
          </div>
        </div>

        <p className="text-center text-[#64646C] text-xs mt-6">
          GYMatch Admin Panel · v1.0.0
        </p>
      </div>
    </div>
  );
}
