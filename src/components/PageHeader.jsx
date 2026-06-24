export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h1 className="font-heading text-4xl tracking-wide">{title}</h1>
        {subtitle && <p className="text-[#8A8A94] text-sm mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
