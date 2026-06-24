const COLORS = [
  "#D9FF00", "#FF6B35", "#A855F7", "#EF4444", "#EC4899",
  "#22C55E", "#3B82F6", "#F59E0B", "#06B6D4", "#8B5CF6",
];

function getColor(initials) {
  let hash = 0;
  for (const ch of initials) hash += ch.charCodeAt(0);
  return COLORS[hash % COLORS.length];
}

export default function Avatar({ initials, size = 36 }) {
  const bg = getColor(initials);
  return (
    <div
      className="rounded-full flex items-center justify-center font-semibold text-[#0A0A0B] flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: bg, fontSize: size * 0.36 }}
    >
      {initials}
    </div>
  );
}
