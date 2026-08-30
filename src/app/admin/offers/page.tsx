'use client';

import React, { useState, useEffect } from 'react';
import { Offer, Category } from '@/types';
import { useToast } from '@/components/ui/Toast';
import Modal from '@/components/ui/Modal';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import CountdownTimer from '@/components/ui/CountdownTimer';
import {
  Tag,
  Plus,
  Edit2,
  Trash2,
  Clock,
  Loader2,
  Gift,
  Check,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminOffersPage() {
  const { showToast } = useToast();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount_type: 'percentage',
    discount_value: 20,
    coupon_code: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    banner_image: '',
    cta_text: 'Claim Offer',
    cta_url: '/contact',
    is_active: 1,
    is_featured: 1,
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/offers');
      if (res.ok) {
        const data = await res.json();
        setOffers(data.offers || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingOffer(null);
    setFormData({
      title: '',
      description: '',
      discount_type: 'percentage',
      discount_value: 25,
      coupon_code: `PROMO${Math.floor(10 + Math.random() * 90)}`,
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      banner_image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      cta_text: 'Claim Offer',
      cta_url: '/contact',
      is_active: 1,
      is_featured: 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description,
      discount_type: offer.discount_type,
      discount_value: offer.discount_value,
      coupon_code: offer.coupon_code || '',
      start_date: offer.start_date ? new Date(offer.start_date).toISOString().split('T')[0] : '',
      end_date: offer.end_date ? new Date(offer.end_date).toISOString().split('T')[0] : '',
      banner_image: offer.banner_image || '',
      cta_text: offer.cta_text || 'Claim Offer',
      cta_url: offer.cta_url || '/contact',
      is_active: Number(offer.is_active),
      is_featured: Number(offer.is_featured),
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.end_date) {
      showToast('Please fill in required fields.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const url = editingOffer ? `/api/offers/${editingOffer.id}` : '/api/offers';
      const method = editingOffer ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save offer');

      showToast(editingOffer ? 'Offer updated' : 'Offer created', 'success');
      setIsModalOpen(false);
      fetchOffers();
    } catch (err: any) {
      showToast(err.message || 'Error saving offer', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this offer?')) return;
    try {
      const res = await fetch(`/api/offers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Offer deleted', 'success');
        setOffers((prev) => prev.filter((o) => o.id !== id));
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
          <h1 className="text-2xl font-serif font-bold text-cream-50">Offers &amp; Promotions CMS</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage limited-time deals, countdown timers, coupons, and discounts.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Offer</span>
        </button>
      </div>

      {/* Offers List */}
      {isLoading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-gold-400 animate-spin mx-auto" />
          <p className="text-xs text-neutral-400 mt-2">Loading offers...</p>
        </div>
      ) : offers.length === 0 ? (
        <div className="py-16 text-center bg-obsidian-900/40 rounded-3xl border border-neutral-800">
          <Tag className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-cream-100">No active offers</p>
          <p className="text-xs text-neutral-400 mt-1">Create your first limited-time promotional voucher.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="p-6 rounded-3xl bg-obsidian-900/60 border border-gold-500/20 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
                    {offer.discount_type === 'percentage' ? `${offer.discount_value}% OFF` : `SAVE ₹${offer.discount_value}`}
                  </span>

                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                    offer.is_active ? 'bg-emerald-950 text-emerald-400' : 'bg-neutral-800 text-neutral-500'
                  }`}>
                    {offer.is_active ? 'Active' : 'Disabled'}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-cream-100 text-lg leading-snug">
                  {offer.title}
                </h3>

                <p className="text-xs text-neutral-400 mt-2 leading-relaxed line-clamp-2">
                  {offer.description}
                </p>

                {offer.coupon_code && (
                  <div className="mt-4 p-2.5 rounded-xl bg-black/60 border border-dashed border-gold-500/40 flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Coupon:</span>
                    <span className="font-mono font-bold text-gold-400">{offer.coupon_code}</span>
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-neutral-800">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-1.5">Live Countdown:</span>
                  <CountdownTimer targetDate={offer.end_date} size="sm" />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500">
                  Valid till: {formatDate(offer.end_date)}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(offer)}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-gold-500 hover:text-black text-neutral-400"
                    title="Edit Offer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(offer.id)}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-red-500/20 text-neutral-400 hover:text-red-400"
                    title="Delete Offer"
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
        title={editingOffer ? 'Edit Offer' : 'Create Special Offer'}
        maxWidth="xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
              Offer Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Festive Hair Rejuvenation Combo - Flat 30% OFF"
              className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Discount Type
              </label>
              <select
                value={formData.discount_type}
                onChange={(e) => setFormData({ ...formData, discount_type: e.target.value as any })}
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Discount Value *
              </label>
              <input
                type="number"
                required
                value={formData.discount_value}
                onChange={(e) => setFormData({ ...formData, discount_value: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Coupon Code
              </label>
              <input
                type="text"
                value={formData.coupon_code}
                onChange={(e) => setFormData({ ...formData, coupon_code: e.target.value.toUpperCase() })}
                placeholder="e.g. FESTIVE30"
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs font-mono focus:border-gold-500 focus:outline-none"
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
                End Date (Countdown Expiry) *
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

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
              Description
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="What makes this offer special?"
              className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-1.5 text-xs text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.is_active)}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })}
                className="rounded bg-neutral-800 border-neutral-700 text-gold-500"
              />
              <span>Active (Visible on Website)</span>
            </label>
            <label className="flex items-center gap-1.5 text-xs text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.is_featured)}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked ? 1 : 0 })}
                className="rounded bg-neutral-800 border-neutral-700 text-gold-500"
              />
              <span>Featured on Homepage</span>
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
              {isSaving ? 'Saving...' : editingOffer ? 'Update Offer' : 'Create Offer'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
