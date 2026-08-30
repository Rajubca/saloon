'use client';

import React, { useState, useEffect } from 'react';
import { Testimonial } from '@/types';
import { useToast } from '@/components/ui/Toast';
import Modal from '@/components/ui/Modal';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import { Star, Plus, Edit2, Trash2, Loader2, Check } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const { showToast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    client_name: '',
    service_taken: 'Russian Nano-Plastia Client',
    client_avatar: '',
    rating: 5,
    review_text: '',
    is_featured: 1,
    is_published: 1,
    display_order: 0,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/testimonials');
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data.testimonials || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingTestimonial(null);
    setFormData({
      client_name: '',
      service_taken: 'Russian Nano-Plastia Client',
      client_avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      rating: 5,
      review_text: '',
      is_featured: 1,
      is_published: 1,
      display_order: 0,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setEditingTestimonial(t);
    setFormData({
      client_name: t.client_name,
      service_taken: t.service_taken || '',
      client_avatar: t.client_avatar || '',
      rating: t.rating,
      review_text: t.review_text,
      is_featured: Number(t.is_featured),
      is_published: Number(t.is_published),
      display_order: t.display_order,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.client_name || !formData.review_text) return;

    setIsSaving(true);
    try {
      const url = editingTestimonial ? `/api/testimonials/${editingTestimonial.id}` : '/api/testimonials';
      const method = editingTestimonial ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showToast(editingTestimonial ? 'Review updated' : 'Review created', 'success');
        setIsModalOpen(false);
        fetchTestimonials();
      }
    } catch (e) {
      showToast('Error saving review', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this review?')) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Review deleted', 'success');
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (e) {
      showToast('Failed to delete', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-cream-50">Client Reviews &amp; Testimonials</h1>
          <p className="text-xs text-neutral-400 mt-0.5">Manage verified reviews from salon visitors and academy graduates.</p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Review</span>
        </button>
      </div>

      {isLoading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-gold-400 animate-spin mx-auto" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-obsidian-900/60 border border-gold-500/20 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {item.client_avatar ? (
                    <img src={item.client_avatar} alt={item.client_name} className="w-11 h-11 rounded-full object-cover border border-gold-500/40" />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-gold-500/20 text-gold-400 font-bold flex items-center justify-center">
                      {item.client_name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-cream-100 text-sm">{item.client_name}</h3>
                    <p className="text-[11px] text-gold-400">{item.service_taken}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-gold-400 mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-neutral-300 italic leading-relaxed">
                  &ldquo;{item.review_text}&rdquo;
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${item.is_published ? 'text-emerald-400' : 'text-neutral-500'}`}>
                  {item.is_published ? 'Live' : 'Hidden'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-gold-500 hover:text-black text-neutral-400"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-red-500/20 text-neutral-400 hover:text-red-400"
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
        title={editingTestimonial ? 'Edit Review' : 'Create Review'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">Client Name *</label>
              <input
                type="text"
                required
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">Role / Service</label>
              <input
                type="text"
                value={formData.service_taken}
                onChange={(e) => setFormData({ ...formData, service_taken: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">Client Photo URL</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={formData.client_avatar}
                onChange={(e) => setFormData({ ...formData, client_avatar: e.target.value })}
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

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">Rating (1 - 5 Stars)</label>
            <input
              type="number"
              min={1}
              max={5}
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
              className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">Review Text *</label>
            <textarea
              rows={3}
              required
              value={formData.review_text}
              onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-full bg-neutral-900 text-neutral-300 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-full bg-gold-500 text-black font-bold text-xs uppercase tracking-wider shadow"
            >
              {isSaving ? 'Saving...' : 'Save Review'}
            </button>
          </div>
        </form>
      </Modal>

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectImage={(url) => setFormData({ ...formData, client_avatar: url })}
      />
    </div>
  );
}
