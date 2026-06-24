import { useLocation } from "react-router-dom";
import { RiMenu2Line, RiBellLine } from "react-icons/ri";
import Avatar from "./Avatar";

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/users": "User Management",
  "/categories": "Category Management",
};

export default function Navbar({ onMenuClick }) {
  const { pathname } = useLocation();
  const title = PAGE_TITLES[pathname] || "Admin";

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-[#2A2A30] bg-[#0A0A0B] sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#8A8A94] hover:text-white hover:bg-[#2A2A30] transition-all"
        >
          <RiMenu2Line className="text-xl" />
        </button>
        <h1 className="font-heading text-2xl tracking-wide">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-[#8A8A94] hover:text-white hover:bg-[#2A2A30] transition-all border border-[#2A2A30]">
          <RiBellLine className="text-lg" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#D9FF00]" />
        </button>
        <div className="flex items-center gap-2.5 pl-3 border-l border-[#2A2A30]">
          <Avatar initials="AD" size={32} />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white leading-none">Admin</p>
            <p className="text-[10px] text-[#64646C] mt-0.5">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
