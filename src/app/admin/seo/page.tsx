'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/Toast';
import { Search, Globe, Save, Loader2, Share2 } from 'lucide-react';

export default function AdminSeoPage() {
  const { showToast } = useToast();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings || {});
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      });

      if (res.ok) {
        showToast('SEO settings saved successfully', 'success');
      } else {
        throw new Error('Save failed');
      }
    } catch (e) {
      showToast('Error saving SEO settings', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <Loader2 className="w-8 h-8 text-gold-400 animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-cream-50">Global SEO &amp; Meta Tags</h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Configure search engine titles, descriptions, Google Analytics 4 tracking ID, and OpenGraph social preview images.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-obsidian-900/60 border border-gold-500/20 shadow-xl space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              Default Site Meta Title
            </label>
            <input
              type="text"
              value={settings.seo_default_title || ''}
              onChange={(e) => setSettings({ ...settings, seo_default_title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              Default Meta Description
            </label>
            <textarea
              rows={3}
              value={settings.seo_default_description || ''}
              onChange={(e) => setSettings({ ...settings, seo_default_description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              Default OpenGraph / Social Share Image URL
            </label>
            <input
              type="text"
              value={settings.seo_og_image || ''}
              onChange={(e) => setSettings({ ...settings, seo_og_image: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Google Analytics 4 Measurement ID
              </label>
              <input
                type="text"
                placeholder="G-XXXXXXXXXX"
                value={settings.google_analytics_id || ''}
                onChange={(e) => setSettings({ ...settings, google_analytics_id: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs font-mono focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Meta Pixel ID
              </label>
              <input
                type="text"
                placeholder="123456789012345"
                value={settings.meta_pixel_id || ''}
                onChange={(e) => setSettings({ ...settings, meta_pixel_id: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs font-mono focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Save SEO Configuration'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
