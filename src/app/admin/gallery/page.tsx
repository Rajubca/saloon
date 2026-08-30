'use client';

import React, { useState, useEffect } from 'react';
import { GalleryItem, Category } from '@/types';
import { useToast } from '@/components/ui/Toast';
import Modal from '@/components/ui/Modal';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import {
  Camera,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  Star,
  Tag,
  Folder,
  Layers,
  Sparkles,
  Eye,
} from 'lucide-react';

export default function AdminGalleryPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    media_type: 'image' as 'image' | 'video',
    media_url: '',
    thumbnail_url: '',
    category_id: '' as string | number,
    tags: '',
    is_featured: 1,
    display_order: 0,
  });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setIsLoading(true);
    try {
      const [res, catRes] = await Promise.all([
        fetch('/api/gallery'),
        fetch('/api/categories'),
      ]);
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
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
    setEditingItem(null);
    const defaultCat = categories.find((c) => c.type === 'gallery') || categories[0];
    setFormData({
      title: '',
      caption: '',
      media_type: 'image',
      media_url: '',
      thumbnail_url: '',
      category_id: defaultCat ? defaultCat.id : '',
      tags: '',
      is_featured: 1,
      display_order: 0,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      caption: item.caption || '',
      media_type: (item.media_type as 'image' | 'video') || 'image',
      media_url: item.media_url,
      thumbnail_url: item.thumbnail_url || '',
      category_id: item.category_id || '',
      tags: item.tags || '',
      is_featured: item.is_featured ? 1 : 0,
      display_order: item.display_order || 0,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.media_url) {
      showToast('Please provide a title and image URL', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const url = editingItem ? `/api/gallery/${editingItem.id}` : '/api/gallery';
      const method = editingItem ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        category_id: formData.category_id ? Number(formData.category_id) : null,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast(editingItem ? 'Gallery photo updated successfully' : 'Photo added to Lookbook', 'success');
        setIsModalOpen(false);
        fetchGallery();
      } else {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save');
      }
    } catch (e: any) {
      showToast(e.message || 'Error saving gallery photo', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this gallery photograph?')) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Photo removed from lookbook', 'success');
        setItems((prev) => prev.filter((i) => i.id !== id));
      }
    } catch (e) {
      showToast('Failed to delete photo', 'error');
    }
  };

  const filteredItems = items.filter((item) => {
    if (selectedCategoryFilter === 'all') return true;
    return String(item.category_id) === selectedCategoryFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-cream-50">Lookbook &amp; Artistry Gallery</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage portfolio photographs, categorizations, types, and featured carousel media.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="btn-shine-sweep px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo to Lookbook</span>
        </button>
      </div>

      {/* Category / Type Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-neutral-800">
        <button
          type="button"
          onClick={() => setSelectedCategoryFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 ${
            selectedCategoryFilter === 'all'
              ? 'bg-gold-500 text-black shadow'
              : 'bg-obsidian-950 text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Types ({items.length})</span>
        </button>

        {categories.map((cat) => {
          const count = items.filter((i) => i.category_id === cat.id).length;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategoryFilter(String(cat.id))}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 ${
                selectedCategoryFilter === String(cat.id)
                  ? 'bg-gold-500 text-black shadow'
                  : 'bg-obsidian-950 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[10px] opacity-75 font-mono">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-gold-400 animate-spin mx-auto" />
          <p className="text-xs text-neutral-400 mt-2">Loading gallery photos...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-16 text-center bg-obsidian-900/40 rounded-3xl border border-neutral-800">
          <Camera className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-cream-100">No photos found in this category</p>
          <p className="text-xs text-neutral-400 mt-1">Add a photo or select another category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => {
            const catName = categories.find((c) => c.id === item.category_id)?.name || item.category_name || 'General';

            return (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden bg-obsidian-900/80 border border-neutral-800 hover:border-gold-500/50 transition-all flex flex-col shadow-lg"
              >
                {/* Image Container */}
                <div className="relative aspect-square w-full bg-obsidian-950 overflow-hidden">
                  <img
                    src={item.media_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Badges Overlay */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                    <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-gold-500/30 text-[10px] font-semibold text-gold-400 uppercase tracking-wider">
                      {catName}
                    </span>
                    {Boolean(item.is_featured) && (
                      <span className="p-1 rounded-full bg-gold-500 text-black shadow" title="Featured on Homepage">
                        <Star className="w-3 h-3 fill-black" />
                      </span>
                    )}
                  </div>

                  {/* Action Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      className="p-2.5 rounded-xl bg-gold-500 text-black hover:bg-gold-400 shadow transition-transform hover:scale-110"
                      title="Edit Category & Details"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-2.5 rounded-xl bg-red-600 text-white hover:bg-red-500 shadow transition-transform hover:scale-110"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Card Footer Details */}
                <div className="p-3 bg-obsidian-950/90 text-xs space-y-1">
                  <p className="font-bold text-cream-100 truncate" title={item.title}>
                    {item.title}
                  </p>
                  {item.caption && (
                    <p className="text-[11px] text-neutral-400 truncate" title={item.caption}>
                      {item.caption}
                    </p>
                  )}
                  {item.tags && (
                    <div className="flex items-center gap-1 text-[10px] text-gold-400/80 pt-0.5 truncate font-mono">
                      <Tag className="w-2.5 h-2.5 shrink-0" />
                      <span className="truncate">{item.tags}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Photo Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Photo & Category Type' : 'Add Photo to Lookbook'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Russian Nano-Plastia Transformation"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          {/* Category / Type Selector & Media Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1">
                Category / Gallery Type *
              </label>
              <select
                required
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-gold-500/40 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              >
                <option value="">Select Category / Type...</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.type})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Media Format
              </label>
              <select
                value={formData.media_type}
                onChange={(e) => setFormData({ ...formData, media_type: e.target.value as 'image' | 'video' })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              >
                <option value="image">Still Photography (Image)</option>
                <option value="video">Motion Video (MP4)</option>
              </select>
            </div>
          </div>

          {/* Media URL + Media Picker */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
              Image / Media URL *
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                required
                placeholder="https://... or /uploads/..."
                value={formData.media_url}
                onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none font-mono"
              />
              <button
                type="button"
                onClick={() => setIsMediaPickerOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gold-500/15 hover:bg-gold-500 text-gold-300 hover:text-black border border-gold-500/30 text-xs font-bold uppercase tracking-wider shrink-0 transition-all"
              >
                Browse Library
              </button>
            </div>

            {/* Live Preview Thumbnail */}
            {formData.media_url && (
              <div className="mt-3 flex items-center gap-3 p-2.5 rounded-xl bg-obsidian-950 border border-neutral-800">
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-gold-500/20 bg-black">
                  <img
                    src={formData.media_url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="text-xs text-neutral-400 min-w-0">
                  <p className="font-semibold text-cream-100">Live Preview</p>
                  <p className="truncate font-mono text-[11px] text-neutral-500">{formData.media_url}</p>
                </div>
              </div>
            )}
          </div>

          {/* Caption */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
              Caption / Description
            </label>
            <input
              type="text"
              placeholder="e.g. Handcrafted dimensional color melt by Rajesh Joshi"
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          {/* Tags & Order */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                placeholder="hair, balayage, transformation"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.is_featured)}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked ? 1 : 0 })}
                className="w-4 h-4 rounded text-gold-500 focus:ring-gold-500 bg-obsidian-950 border-neutral-800"
              />
              <span className="text-xs font-medium text-cream-100">
                Feature on Homepage Lookbook Carousel
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="btn-shine-sweep px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider shadow"
            >
              {isSaving ? 'Saving...' : editingItem ? 'Update Photo' : 'Add Photo'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectImage={(url) => setFormData({ ...formData, media_url: url })}
      />
    </div>
  );
}
