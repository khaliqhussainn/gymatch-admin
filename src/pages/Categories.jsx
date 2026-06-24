import { useState, useEffect } from "react";
import { RiAddLine, RiEditLine, RiDeleteBinLine, RiBuildingLine } from "react-icons/ri";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import SearchBar from "../components/SearchBar";
import { categoryService } from "../services/categoryService";

const EMPTY_FORM = { name: "", icon: "🏋️", description: "", color: "#D9FF00" };
const ICON_OPTIONS = ["🏋️", "⚡", "🧘", "🥊", "♀️", "🏃", "🚴", "🤸", "🏊", "🥋"];
const COLOR_OPTIONS = ["#D9FF00", "#FF6B35", "#A855F7", "#EF4444", "#EC4899", "#22C55E", "#3B82F6", "#F59E0B"];

export default function Categories() {
  const [cats, setCats] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    categoryService.getAll().then(setCats);
  }, []);

  const filtered = cats.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  function openCreate() {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(cat) {
    setEditTarget(cat);
    setForm({ name: cat.name, icon: cat.icon, description: cat.description, color: cat.color });
    setErrors({});
    setModalOpen(true);
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.description.trim()) errs.description = "Description is required";
    return errs;
  }

  async function handleSave() {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    try {
      if (editTarget) {
        const updated = await categoryService.update(editTarget.id, form);
        setCats((prev) => prev.map((c) => (c.id === editTarget.id ? updated : c)));
      } else {
        const created = await categoryService.create(form);
        setCats((prev) => [...prev, created]);
      }
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    await categoryService.delete(id);
    setCats((prev) => prev.filter((c) => c.id !== id));
    setDeleteTarget(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Categories"
        subtitle="Manage gym categories shown in the mobile app"
        action={
          <button className="btn-primary" onClick={openCreate}>
            <RiAddLine />
            Add Category
          </button>
        }
      />

      <div className="flex items-center gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search categories…" />
        <span className="text-[#64646C] text-sm ml-auto">{filtered.length} categories</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((cat) => (
          <div key={cat.id} className="card p-5 flex flex-col gap-4 hover:border-[#3A3A42] transition-colors group">
            <div className="flex items-start justify-between">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${cat.color}18`, border: `1px solid ${cat.color}30` }}
              >
                {cat.icon}
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEdit(cat)}
                  className="w-7 h-7 rounded-md flex items-center justify-center text-[#8A8A94] hover:text-white hover:bg-[#2A2A30] transition-all text-sm"
                >
                  <RiEditLine />
                </button>
                <button
                  onClick={() => setDeleteTarget(cat)}
                  className="w-7 h-7 rounded-md flex items-center justify-center text-[#8A8A94] hover:text-[#FF4444] hover:bg-[#FF444415] transition-all text-sm"
                >
                  <RiDeleteBinLine />
                </button>
              </div>
            </div>
            <div>
              <h3 className="font-heading text-xl tracking-wide" style={{ color: cat.color }}>
                {cat.name}
              </h3>
              <p className="text-[#8A8A94] text-sm mt-1 leading-relaxed">{cat.description}</p>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-[#2A2A30]">
              <RiBuildingLine className="text-[#64646C] text-sm" />
              <span className="text-sm text-[#64646C]">{cat.gymCount} gyms</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-[#64646C]">
            No categories found.
          </div>
        )}
      </div>

      {modalOpen && (
        <Modal
          title={editTarget ? "Edit Category" : "Add Category"}
          onClose={() => setModalOpen(false)}
        >
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-[#8A8A94] uppercase tracking-wider block mb-2">
                Category Name
              </label>
              <input
                type="text"
                className={`input ${errors.name ? "border-[#FF4444]" : ""}`}
                placeholder="e.g. CrossFit"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <p className="text-[#FF4444] text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-[#8A8A94] uppercase tracking-wider block mb-2">
                Description
              </label>
              <textarea
                rows={2}
                className={`input resize-none ${errors.description ? "border-[#FF4444]" : ""}`}
                placeholder="Brief description of this category"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              {errors.description && <p className="text-[#FF4444] text-xs mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-[#8A8A94] uppercase tracking-wider block mb-2">
                Icon
              </label>
              <div className="flex flex-wrap gap-2">
                {ICON_OPTIONS.map((ico) => (
                  <button
                    key={ico}
                    type="button"
                    onClick={() => setForm({ ...form, icon: ico })}
                    className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center border transition-all ${
                      form.icon === ico
                        ? "border-[#D9FF00] bg-[#D9FF0015]"
                        : "border-[#2A2A30] hover:border-[#64646C]"
                    }`}
                  >
                    {ico}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#8A8A94] uppercase tracking-wider block mb-2">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {COLOR_OPTIONS.map((col) => (
                  <button
                    key={col}
                    type="button"
                    onClick={() => setForm({ ...form, color: col })}
                    className={`w-8 h-8 rounded-lg border-2 transition-all ${
                      form.color === col ? "border-white scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: col }}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button className="btn-ghost flex-1" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button className="btn-primary flex-1 justify-center" onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : editTarget ? "Save Changes" : "Create Category"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmModal
          title="Delete Category"
          message={`Permanently delete "${deleteTarget.name}"? All gyms in this category may be affected.`}
          danger
          onConfirm={() => handleDelete(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
