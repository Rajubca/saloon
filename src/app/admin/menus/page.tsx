'use client';

import React, { useState, useEffect } from 'react';
import { MenuItem } from '@/types';
import { useToast } from '@/components/ui/Toast';
import Modal from '@/components/ui/Modal';
import { Menu, Plus, Trash2, Loader2, ArrowRight } from 'lucide-react';

export default function AdminMenusPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [locationFilter, setLocationFilter] = useState('header');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    menu_location: 'header',
    title: '',
    url: '',
    display_order: 0,
    is_active: 1,
    open_new_tab: 0,
  });

  useEffect(() => {
    fetchMenus();
  }, [locationFilter]);

  const fetchMenus = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/menus?location=${locationFilter}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.url) return;

    try {
      const res = await fetch('/api/menus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showToast('Navigation link added', 'success');
        setIsModalOpen(false);
        fetchMenus();
      }
    } catch (e) {
      showToast('Error adding link', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-cream-50">Navigation Menus Builder</h1>
          <p className="text-xs text-neutral-400 mt-0.5">Customize the header navigation bar, mobile drawer, and footer columns.</p>
        </div>

        <button
          type="button"
          onClick={() => {
            setFormData({
              menu_location: locationFilter,
              title: '',
              url: '',
              display_order: items.length + 1,
              is_active: 1,
              open_new_tab: 0,
            });
            setIsModalOpen(true);
          }}
          className="px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Menu Item</span>
        </button>
      </div>

      {/* Location Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-obsidian-900/80 border border-neutral-800 w-fit">
        {[
          { id: 'header', label: 'Main Header Navigation' },
          { id: 'footer_col_1', label: 'Footer Services' },
          { id: 'footer_col_2', label: 'Footer Academy' },
          { id: 'footer_col_3', label: 'Footer Studio & Info' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setLocationFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              locationFilter === tab.id
                ? 'bg-gold-500 text-black shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Menu items list */}
      {isLoading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-gold-400 animate-spin mx-auto" />
        </div>
      ) : (
        <div className="rounded-3xl bg-obsidian-900/60 border border-neutral-800 overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-obsidian-950 text-neutral-400 uppercase font-mono text-[10px] tracking-wider border-b border-neutral-800">
              <tr>
                <th className="p-4">Label</th>
                <th className="p-4">Target URL</th>
                <th className="p-4">Order</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-900/40">
                  <td className="p-4 font-bold text-cream-100">{item.title}</td>
                  <td className="p-4 font-mono text-gold-400">{item.url}</td>
                  <td className="p-4 font-mono">{item.display_order}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${item.is_active ? 'text-emerald-400' : 'text-neutral-500'}`}>
                      {item.is_active ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Navigation Item"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">Menu Label *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Academy Diplomas"
              className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">Target URL *</label>
            <input
              type="text"
              required
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="/services?type=academy or https://..."
              className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">Location</label>
              <select
                value={formData.menu_location}
                onChange={(e) => setFormData({ ...formData, menu_location: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              >
                <option value="header">Main Header</option>
                <option value="footer_col_1">Footer Col 1 (Services)</option>
                <option value="footer_col_2">Footer Col 2 (Academy)</option>
                <option value="footer_col_3">Footer Col 3 (Studio)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">Order Index</label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>
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
              className="px-5 py-2 rounded-full bg-gold-500 text-black font-bold text-xs uppercase tracking-wider shadow"
            >
              Add Item
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
