import { useState, useEffect } from "react";
import { RiUserForbidLine, RiUserFollowLine, RiDeleteBinLine } from "react-icons/ri";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Avatar from "../components/Avatar";
import ConfirmModal from "../components/ConfirmModal";
import { userService } from "../services/userService";

const STATUS_FILTERS = ["all", "active", "suspended", "inactive"];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    userService.getAll().then(setUsers);
  }, []);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchSearch && matchStatus;
  });

  async function handleStatusChange(id, status) {
    await userService.updateStatus(id, status);
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
    setConfirm(null);
  }

  async function handleDelete(id) {
    await userService.delete(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setConfirm(null);
  }

  const columns = [
    {
      key: "name",
      label: "User",
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <Avatar initials={row.avatar} size={34} />
          <div>
            <p className="font-medium text-sm">{val}</p>
          </div>
        </div>
      ),
    },
    { key: "email", label: "Email", render: (v) => <span className="text-[#8A8A94]">{v}</span> },
    {
      key: "status",
      label: "Status",
      render: (v) => <span className={`badge badge-${v}`}>{v}</span>,
    },
    { key: "joinDate", label: "Joined", render: (v) => <span className="text-[#8A8A94]">{v}</span> },
    {
      key: "gymVisits",
      label: "Visits",
      render: (v) => <span className="font-semibold text-[#D9FF00]">{v}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          {row.status === "active" ? (
            <button
              title="Suspend"
              onClick={() =>
                setConfirm({ type: "suspend", id: row.id, name: row.name })
              }
              className="w-7 h-7 rounded-md flex items-center justify-center text-[#8A8A94] hover:text-[#FF4444] hover:bg-[#FF444415] transition-all text-base"
            >
              <RiUserForbidLine />
            </button>
          ) : (
            <button
              title="Activate"
              onClick={() =>
                setConfirm({ type: "activate", id: row.id, name: row.name })
              }
              className="w-7 h-7 rounded-md flex items-center justify-center text-[#8A8A94] hover:text-[#22C55E] hover:bg-[#22C55E15] transition-all text-base"
            >
              <RiUserFollowLine />
            </button>
          )}
          <button
            title="Delete"
            onClick={() =>
              setConfirm({ type: "delete", id: row.id, name: row.name })
            }
            className="w-7 h-7 rounded-md flex items-center justify-center text-[#8A8A94] hover:text-[#FF4444] hover:bg-[#FF444415] transition-all text-base"
          >
            <RiDeleteBinLine />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="User Management"
        subtitle={`${users.length} registered users`}
      />

      <div className="flex flex-wrap items-center gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or email…" />
        <div className="flex items-center gap-2">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-all duration-150 capitalize ${
                statusFilter === f
                  ? "bg-[#D9FF0015] text-[#D9FF00] border-[#D9FF0030]"
                  : "border-[#2A2A30] text-[#8A8A94] hover:border-[#64646C] hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="text-[#64646C] text-sm ml-auto">{filtered.length} results</span>
      </div>

      <div className="card p-6">
        <Table columns={columns} data={filtered} emptyMessage="No users match your filters." />
      </div>

      {confirm?.type === "suspend" && (
        <ConfirmModal
          title="Suspend User"
          message={`Are you sure you want to suspend ${confirm.name}? They will lose access to the platform.`}
          danger
          onConfirm={() => handleStatusChange(confirm.id, "suspended")}
          onCancel={() => setConfirm(null)}
        />
      )}
      {confirm?.type === "activate" && (
        <ConfirmModal
          title="Activate User"
          message={`Restore access for ${confirm.name}? They will be able to use the platform again.`}
          onConfirm={() => handleStatusChange(confirm.id, "active")}
          onCancel={() => setConfirm(null)}
        />
      )}
      {confirm?.type === "delete" && (
        <ConfirmModal
          title="Delete User"
          message={`Permanently delete ${confirm.name}? This action cannot be undone.`}
          danger
          onConfirm={() => handleDelete(confirm.id)}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}
