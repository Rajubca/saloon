'use client';

import React, { useState, useEffect } from 'react';
import { BeforeAfterEntry, Category } from '@/types';
import { useToast } from '@/components/ui/Toast';
import Modal from '@/components/ui/Modal';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Loader2,
  Sparkles,
  MoveHorizontal,
  MoveVertical,
  Image as ImageIcon,
} from 'lucide-react';

export default function AdminBeforeAfterPage() {
  const { showToast } = useToast();
  const [entries, setEntries] = useState<BeforeAfterEntry[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [activeMediaTarget, setActiveMediaTarget] = useState<'before' | 'after'>('before');
  const [editingEntry, setEditingEntry] = useState<BeforeAfterEntry | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    before_image: '',
    after_image: '',
    category_id: 1,
    tags: '',
    orientation: 'horizontal',
    initial_slider_position: 50,
    before_label: 'BEFORE',
    after_label: 'AFTER',
    display_order: 0,
    is_featured: 0,
    is_published: 1,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [res, catRes] = await Promise.all([
        fetch('/api/before-after'),
        fetch('/api/categories?type=service'),
      ]);
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries || []);
      }
      if (catRes.ok) {
        const cData = await catRes.json();
        setCategories(cData.categories || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingEntry(null);
    setFormData({
      title: '',
      description: '',
      before_image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
      after_image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      category_id: categories[0]?.id || 1,
      tags: '',
      orientation: 'horizontal',
      initial_slider_position: 50,
      before_label: 'BEFORE',
      after_label: 'AFTER',
      display_order: 0,
      is_featured: 1,
      is_published: 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (entry: BeforeAfterEntry) => {
    setEditingEntry(entry);
    setFormData({
      title: entry.title,
      description: entry.description || '',
      before_image: entry.before_image,
      after_image: entry.after_image,
      category_id: entry.category_id || 1,
      tags: entry.tags || '',
      orientation: entry.orientation,
      initial_slider_position: entry.initial_slider_position,
      before_label: entry.before_label,
      after_label: entry.after_label,
      display_order: entry.display_order,
      is_featured: Number(entry.is_featured),
      is_published: Number(entry.is_published),
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.before_image || !formData.after_image) {
      showToast('Please provide a title, before image, and after image.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const url = editingEntry ? `/api/before-after/${editingEntry.id}` : '/api/before-after';
      const method = editingEntry ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save transformation');

      showToast(editingEntry ? 'Transformation updated' : 'Transformation created', 'success');
      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      showToast(err.message || 'Error saving transformation', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this before/after entry?')) return;
    try {
      const res = await fetch(`/api/before-after/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Transformation deleted', 'success');
        setEntries((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (e) {
      showToast('Failed to delete', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-cream-50">Before / After Manager</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage live interactive before and after slider comparisons visible across the website.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Transformation</span>
        </button>
      </div>

      {/* Grid of Transformations */}
      {isLoading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-gold-400 animate-spin mx-auto" />
          <p className="text-xs text-neutral-400 mt-2">Loading transformations...</p>
        </div>
      ) : entries.length === 0 ? (
        <div className="py-16 text-center bg-obsidian-900/40 rounded-3xl border border-neutral-800">
          <Layers className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-cream-100">No transformations yet</p>
          <p className="text-xs text-neutral-400 mt-1">Add your first before/after client result.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="p-5 rounded-3xl bg-obsidian-900/60 border border-gold-500/20 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Visual Preview Thumbnails */}
                <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden bg-obsidian-950 border border-neutral-800 mb-4 aspect-[16/10]">
                  <div className="relative w-full h-full">
                    <img src={entry.before_image} alt="Before" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-neutral-300">
                      {entry.before_label}
                    </span>
                  </div>
                  <div className="relative w-full h-full">
                    <img src={entry.after_image} alt="After" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-gold-500/80 text-[9px] font-mono text-black font-bold">
                      {entry.after_label}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">
                    {entry.category_name || 'Hair Service'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {entry.orientation === 'vertical' ? (
                      <span title="Vertical Split">
                        <MoveVertical className="w-3.5 h-3.5 text-neutral-500" />
                      </span>
                    ) : (
                      <span title="Horizontal Split">
                        <MoveHorizontal className="w-3.5 h-3.5 text-neutral-500" />
                      </span>
                    )}
                    {Boolean(entry.is_featured) && (
                      <span className="text-[9px] font-bold text-gold-400 uppercase">★ Featured</span>
                    )}
                  </div>
                </div>

                <h3 className="font-serif font-bold text-cream-100 text-base line-clamp-1">
                  {entry.title}
                </h3>

                {entry.description && (
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {entry.description}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="mt-5 pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                  entry.is_published ? 'bg-gold-500/15 text-gold-400' : 'bg-neutral-800 text-neutral-400'
                }`}>
                  {entry.is_published ? 'Published' : 'Hidden'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(entry)}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-gold-500 hover:text-black text-neutral-400"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(entry.id)}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-red-500/20 text-neutral-400 hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEntry ? 'Edit Transformation' : 'Add New Transformation'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
              Transformation Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Brassy Orange to Cool Nordic Blonde Balayage"
              className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Before Image URL *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  required
                  value={formData.before_image}
                  onChange={(e) => setFormData({ ...formData, before_image: e.target.value })}
                  placeholder="Before photo URL"
                  className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    setActiveMediaTarget('before');
                    setIsMediaPickerOpen(true);
                  }}
                  className="px-3 py-2 rounded-xl bg-neutral-900 border border-gold-500/30 text-gold-400 text-xs font-semibold shrink-0"
                >
                  Pick
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                After Image URL *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  required
                  value={formData.after_image}
                  onChange={(e) => setFormData({ ...formData, after_image: e.target.value })}
                  placeholder="After photo URL"
                  className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    setActiveMediaTarget('after');
                    setIsMediaPickerOpen(true);
                  }}
                  className="px-3 py-2 rounded-xl bg-neutral-900 border border-gold-500/30 text-gold-400 text-xs font-semibold shrink-0"
                >
                  Pick
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Before Floating Label
              </label>
              <input
                type="text"
                value={formData.before_label}
                onChange={(e) => setFormData({ ...formData, before_label: e.target.value })}
                placeholder="BEFORE"
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                After Floating Label
              </label>
              <input
                type="text"
                value={formData.after_label}
                onChange={(e) => setFormData({ ...formData, after_label: e.target.value })}
                placeholder="AFTER"
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Slider Orientation
              </label>
              <select
                value={formData.orientation}
                onChange={(e) => setFormData({ ...formData, orientation: e.target.value as any })}
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              >
                <option value="horizontal">Horizontal (Left / Right)</option>
                <option value="vertical">Vertical (Top / Bottom)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Initial Position (%)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={formData.initial_slider_position}
                onChange={(e) => setFormData({ ...formData, initial_slider_position: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
              Description / Technique Details
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Explain the correction technique, formulas, or treatment used"
              className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-1.5 text-xs text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.is_featured)}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked ? 1 : 0 })}
                className="rounded bg-neutral-800 border-neutral-700 text-gold-500"
              />
              <span>Featured on Homepage</span>
            </label>
            <label className="flex items-center gap-1.5 text-xs text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.is_published)}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked ? 1 : 0 })}
                className="rounded bg-neutral-800 border-neutral-700 text-gold-500"
              />
              <span>Published (Live)</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2 rounded-full bg-neutral-900 text-neutral-300 hover:text-white text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider shadow disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : editingEntry ? 'Update Transformation' : 'Create Transformation'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectImage={(url) => {
          if (activeMediaTarget === 'before') {
            setFormData({ ...formData, before_image: url });
          } else {
            setFormData({ ...formData, after_image: url });
          }
        }}
      />
    </div>
  );
}
