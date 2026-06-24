import { NavLink, useNavigate } from "react-router-dom";
import {
  RiDashboardLine,
  RiUserLine,
  RiListCheck2,
  RiLogoutBoxLine,
  RiCloseLine,
  RiFlashlightLine as RiZapLine,
} from "react-icons/ri";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: RiDashboardLine },
  { to: "/users", label: "Users", icon: RiUserLine },
  { to: "/categories", label: "Categories", icon: RiListCheck2 },
];

export default function Sidebar({ open, onClose, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate("/login");
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-40 flex flex-col
          w-64 bg-[#0E0E10] border-r border-[#2A2A30]
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2A2A30]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D9FF00] flex items-center justify-center">
              <RiZapLine className="text-[#0A0A0B] text-lg" />
            </div>
            <span className="font-heading text-xl tracking-wider">GYMATCH</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden w-7 h-7 rounded-md flex items-center justify-center text-[#8A8A94] hover:text-white transition-colors"
          >
            <RiCloseLine />
          </button>
        </div>

        <div className="px-3 py-4 flex-1 overflow-y-auto">
          <p className="text-[#64646C] text-[10px] font-semibold uppercase tracking-widest px-3 mb-3">
            Navigation
          </p>
          <nav className="flex flex-col gap-1">
            {NAV.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-[#D9FF0015] text-[#D9FF00] border border-[#D9FF0030]"
                      : "text-[#8A8A94] hover:text-white hover:bg-[#2A2A30]"
                  }`
                }
              >
                <Icon className="text-base flex-shrink-0" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="px-3 pb-5 border-t border-[#2A2A30] pt-4">
          <div className="px-3 py-2 mb-3">
            <p className="text-xs font-semibold text-white">Admin Account</p>
            <p className="text-[10px] text-[#64646C] mt-0.5">admin@gymatch.com</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#8A8A94] hover:text-[#FF4444] hover:bg-[#FF444410] transition-all duration-150 w-full"
          >
            <RiLogoutBoxLine className="text-base" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
