'use client';

import React, { useState, useEffect } from 'react';
import { PromotionBanner } from '@/types';
import { useToast } from '@/components/ui/Toast';
import Modal from '@/components/ui/Modal';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import {
  Gift,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminPromotionsPage() {
  const { showToast } = useToast();
  const [banners, setBanners] = useState<PromotionBanner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<PromotionBanner | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    offer_badge: 'SPECIAL OFFER',
    desktop_image: '',
    mobile_image: '',
    cta_text: 'Claim Offer',
    cta_url: '/offers',
    location: 'promo_popup',
    priority: 10,
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    is_active: 1,
    display_frequency: 'once_per_day',
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/promotions');
      if (res.ok) {
        const data = await res.json();
        setBanners(data.banners || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingBanner(null);
    setFormData({
      title: '',
      subtitle: '',
      offer_badge: 'LIMITED TIME',
      desktop_image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
      mobile_image: '',
      cta_text: 'Claim Offer',
      cta_url: '/offers',
      location: 'promo_popup',
      priority: 10,
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      is_active: 1,
      display_frequency: 'once_per_day',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (banner: PromotionBanner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || '',
      offer_badge: banner.offer_badge || '',
      desktop_image: banner.desktop_image,
      mobile_image: banner.mobile_image || '',
      cta_text: banner.cta_text || 'Claim Offer',
      cta_url: banner.cta_url || '/offers',
      location: banner.location,
      priority: banner.priority,
      start_date: banner.start_date ? new Date(banner.start_date).toISOString().split('T')[0] : '',
      end_date: banner.end_date ? new Date(banner.end_date).toISOString().split('T')[0] : '',
      is_active: Number(banner.is_active),
      display_frequency: banner.display_frequency,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.desktop_image || !formData.start_date || !formData.end_date) {
      showToast('Please fill in required fields.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const url = editingBanner ? `/api/promotions/${editingBanner.id}` : '/api/promotions';
      const method = editingBanner ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save promotion');

      showToast(editingBanner ? 'Promotion updated' : 'Promotion created', 'success');
      setIsModalOpen(false);
      fetchBanners();
    } catch (err: any) {
      showToast(err.message || 'Error saving promotion', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this promotion?')) return;
    try {
      const res = await fetch(`/api/promotions/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Promotion deleted', 'success');
        setBanners((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (e) {
      showToast('Failed to delete', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-cream-50">Banners &amp; Launch Popups</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage promotional popups, homepage hero banners, and announcement modals.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Banner/Popup</span>
        </button>
      </div>

      {isLoading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-gold-400 animate-spin mx-auto" />
          <p className="text-xs text-neutral-400 mt-2">Loading promotions...</p>
        </div>
      ) : banners.length === 0 ? (
        <div className="py-16 text-center bg-obsidian-900/40 rounded-3xl border border-neutral-800">
          <Gift className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-cream-100">No active promotional banners</p>
          <p className="text-xs text-neutral-400 mt-1">Create a launch popup promotion to engage first-time visitors.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="rounded-3xl bg-obsidian-900/60 border border-gold-500/20 shadow-xl overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] w-full bg-obsidian-950">
                <img src={banner.desktop_image} alt={banner.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-gold-400 text-xs font-bold uppercase tracking-wider border border-gold-500/30">
                  {banner.location.replace('_', ' ')}
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                    banner.is_active ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-neutral-900 text-neutral-500'
                  }`}>
                    {banner.is_active ? 'Active' : 'Disabled'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif font-bold text-cream-100 text-lg">{banner.title}</h3>
                {banner.subtitle && (
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">{banner.subtitle}</p>
                )}

                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                  <span>Frequency: {banner.display_frequency}</span>
                  <span>Ends: {formatDate(banner.end_date)}</span>
                </div>

                <div className="mt-5 pt-3 border-t border-neutral-800 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(banner)}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-gold-500 hover:text-black text-neutral-400"
                    title="Edit Banner"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(banner.id)}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-red-500/20 text-neutral-400 hover:text-red-400"
                    title="Delete Banner"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBanner ? 'Edit Banner / Popup' : 'Create Banner / Popup'}
        maxWidth="xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
              Banner Heading *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Exclusive Festive Makeover Festival 2026"
              className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
              Subtitle / Description
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="e.g. Unlock VIP hair smoothing and signature balayage at 30% off"
              className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
              Desktop Image URL *
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                required
                value={formData.desktop_image}
                onChange={(e) => setFormData({ ...formData, desktop_image: e.target.value })}
                placeholder="https://images.unsplash.com/... or /uploads/..."
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsMediaPickerOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-gold-500/30 text-gold-400 text-xs font-semibold shrink-0"
              >
                Pick
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Display Location
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value as any })}
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              >
                <option value="promo_popup">Launch Popup Modal</option>
                <option value="homepage_hero">Homepage Hero Banner</option>
                <option value="promo_section">Promo Section</option>
                <option value="announcement_bar">Announcement Bar</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Display Frequency
              </label>
              <select
                value={formData.display_frequency}
                onChange={(e) => setFormData({ ...formData, display_frequency: e.target.value as any })}
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              >
                <option value="once_per_day">Once Per Day</option>
                <option value="once_per_session">Once Per Session</option>
                <option value="always">Always (Every Refresh)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Priority
              </label>
              <input
                type="number"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Start Date
              </label>
              <input
                type="date"
                required
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none [color-scheme:dark]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                End Date
              </label>
              <input
                type="date"
                required
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-1.5 text-xs text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.is_active)}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })}
                className="rounded bg-neutral-800 border-neutral-700 text-gold-500"
              />
              <span>Active (Enable in Website Launch)</span>
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
              {isSaving ? 'Saving...' : editingBanner ? 'Update Banner' : 'Create Banner'}
            </button>
          </div>
        </form>
      </Modal>

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectImage={(url) => setFormData({ ...formData, desktop_image: url })}
      />
    </div>
  );
}
