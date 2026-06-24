import { RiArrowUpLine, RiArrowDownLine } from "react-icons/ri";

export default function StatCard({ label, value, trend, icon: Icon, accent }) {
  const isPositive = trend >= 0;

  return (
    <div className="card p-6 flex flex-col gap-4 hover:border-[#3A3A42] transition-colors duration-200">
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
          style={{ backgroundColor: accent ? `${accent}18` : "#D9FF0018", color: accent || "#D9FF00" }}
        >
          {Icon && <Icon />}
        </div>
        <span
          className={`flex items-center gap-0.5 text-xs font-semibold ${isPositive ? "text-[#22C55E]" : "text-[#FF4444]"}`}
        >
          {isPositive ? <RiArrowUpLine /> : <RiArrowDownLine />}
          {Math.abs(trend)}%
        </span>
      </div>
      <div>
        <p className="text-[#8A8A94] text-sm mb-1">{label}</p>
        <p className="font-heading text-4xl tracking-wide" style={{ color: accent || "#FFFFFF" }}>
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
      </div>
    </div>
  );
}
