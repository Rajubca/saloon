'use client';

import React, { useState, useEffect } from 'react';
import { Service, Category } from '@/types';
import { useToast } from '@/components/ui/Toast';
import Modal from '@/components/ui/Modal';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import {
  Sparkles,
  GraduationCap,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Loader2,
  Clock,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function AdminServicesPage() {
  const { showToast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category_id: 1,
    short_description: '',
    description: '',
    price: 2500,
    sale_price: '',
    duration_minutes: 90,
    featured_image: '',
    features: '["0% Formaldehyde formula", "Deep collagen & silk protein infusion"]',
    benefits: '["6+ months frizz immunity", "Mirror-finish gloss and radiant light reflection"]',
    faqs: '[{"q":"How long does it last?","a":"5 to 7 months with sulfate-free care."}]',
    is_academy_course: 0,
    certification_details: '',
    display_order: 0,
    is_featured: 1,
    is_published: 1,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [svcRes, catRes] = await Promise.all([
        fetch('/api/services'),
        fetch('/api/categories?type=service'),
      ]);

      if (svcRes.ok) {
        const sData = await svcRes.json();
        setServices(sData.services || []);
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
    setEditingService(null);
    setFormData({
      title: '',
      category_id: categories[0]?.id || 1,
      short_description: '',
      description: '',
      price: 2500,
      sale_price: '',
      duration_minutes: 90,
      featured_image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      features: '["100% Authentic products", "Includes consultation and hair mask session"]',
      benefits: '["Instant gloss and nourishment", "Professional styling finish"]',
      faqs: '[]',
      is_academy_course: 0,
      certification_details: '',
      display_order: 0,
      is_featured: 1,
      is_published: 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      category_id: service.category_id,
      short_description: service.short_description || '',
      description: service.description || '',
      price: service.price,
      sale_price: service.sale_price ? String(service.sale_price) : '',
      duration_minutes: service.duration_minutes || 60,
      featured_image: service.featured_image,
      features: service.features || '[]',
      benefits: service.benefits || '[]',
      faqs: service.faqs || '[]',
      is_academy_course: Number(service.is_academy_course),
      certification_details: service.certification_details || '',
      display_order: service.display_order,
      is_featured: Number(service.is_featured),
      is_published: Number(service.is_published),
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.featured_image || !formData.price) {
      showToast('Please fill in Title, Price, and Featured Image.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        sale_price: formData.sale_price ? Number(formData.sale_price) : null,
        duration_minutes: Number(formData.duration_minutes),
      };

      const url = editingService ? `/api/services/${editingService.id}` : '/api/services';
      const method = editingService ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save service');

      showToast(editingService ? 'Service updated' : 'Service created', 'success');
      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      showToast(err.message || 'Error saving service', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Service deleted', 'success');
        setServices((prev) => prev.filter((s) => s.id !== id));
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
          <h1 className="text-2xl font-serif font-bold text-cream-50">Services &amp; Academy CMS</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage salon treatments, luxury bridal makeovers, and cosmetology academy diploma courses.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service or Course</span>
        </button>
      </div>

      {isLoading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-gold-400 animate-spin mx-auto" />
          <p className="text-xs text-neutral-400 mt-2">Loading services &amp; courses...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="py-16 text-center bg-obsidian-900/40 rounded-3xl border border-neutral-800">
          <Sparkles className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-cream-100">No services found</p>
          <p className="text-xs text-neutral-400 mt-1">Add your first salon service or diploma course.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-3xl bg-obsidian-900/60 border border-gold-500/20 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-obsidian-950 border border-neutral-800 mb-4">
                  <img src={service.featured_image} alt={service.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-gold-400 text-[10px] font-bold uppercase tracking-wider border border-gold-500/30">
                    {service.is_academy_course ? 'Academy Diploma' : 'Salon Service'}
                  </div>
                </div>

                <h3 className="font-serif font-bold text-cream-100 text-lg leading-snug">
                  {service.title}
                </h3>

                <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                  {service.short_description}
                </p>

                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-bold text-gold-400 font-sans">
                      {formatCurrency(service.sale_price || service.price)}
                    </span>
                    {service.sale_price && (
                      <span className="text-xs text-neutral-500 line-through">
                        {formatCurrency(service.price)}
                      </span>
                    )}
                  </div>
                  {service.duration_minutes && !service.is_academy_course && (
                    <span className="text-xs text-neutral-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold-400" />
                      <span>{service.duration_minutes}m</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                  service.is_published ? 'bg-gold-500/15 text-gold-400' : 'bg-neutral-800 text-neutral-500'
                }`}>
                  {service.is_published ? 'Published' : 'Hidden'}
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href={`/services/${service.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-gold-500/20 text-neutral-400 hover:text-gold-400"
                    title="View Public Page"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(service)}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-gold-500 hover:text-black text-neutral-400"
                    title="Edit Service"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(service.id)}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-red-500/20 text-neutral-400 hover:text-red-400"
                    title="Delete Service"
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
        title={editingService ? 'Edit Service / Course' : 'Create Service or Course'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Russian Nano-Plastia & Keratin Treatment"
              className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Type
              </label>
              <select
                value={formData.is_academy_course}
                onChange={(e) => setFormData({ ...formData, is_academy_course: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              >
                <option value={0}>Salon Service</option>
                <option value={1}>Academy Diploma Course</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Price (₹) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Sale Price (₹)
              </label>
              <input
                type="number"
                value={formData.sale_price}
                onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
                placeholder="Optional discount price"
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
              Featured Image URL *
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                required
                value={formData.featured_image}
                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
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
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
              Short Summary
            </label>
            <input
              type="text"
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              placeholder="Summary for cards and preview"
              className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
              Full Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              <span>Published</span>
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
              {isSaving ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
            </button>
          </div>
        </form>
      </Modal>

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectImage={(url) => setFormData({ ...formData, featured_image: url })}
      />
    </div>
  );
}
