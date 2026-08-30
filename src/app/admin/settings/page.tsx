'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/Toast';
import { Settings, Save, Loader2, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function AdminSettingsPage() {
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
        showToast('Global settings updated successfully', 'success');
      } else {
        throw new Error('Update failed');
      }
    } catch (e) {
      showToast('Error saving settings', 'error');
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
        <h1 className="text-2xl font-serif font-bold text-cream-50">Global Site &amp; Salon Settings</h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Configure business contact details, Vadodara branch locations, operating hours, announcement bar, and social channels.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact & Brand Identity */}
        <div className="p-6 sm:p-8 rounded-3xl bg-obsidian-900/60 border border-gold-500/20 shadow-xl space-y-4">
          <h2 className="text-lg font-serif font-bold text-cream-100 border-b border-neutral-800 pb-2">
            Brand Identity &amp; Contact Info
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Salon Name
              </label>
              <input
                type="text"
                value={settings.site_name || ''}
                onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Brand Tagline
              </label>
              <input
                type="text"
                value={settings.site_tagline || ''}
                onChange={(e) => setSettings({ ...settings, site_tagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                value={settings.phone_number || ''}
                onChange={(e) => setSettings({ ...settings, phone_number: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                WhatsApp Direct Number (With Country Code)
              </label>
              <input
                type="text"
                value={settings.whatsapp_number || ''}
                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                placeholder="919876543210"
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs font-mono focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={settings.email_address || ''}
                onChange={(e) => setSettings({ ...settings, email_address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Business Operating Hours
              </label>
              <input
                type="text"
                value={settings.business_hours || ''}
                onChange={(e) => setSettings({ ...settings, business_hours: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Currency Symbol
              </label>
              <input
                type="text"
                value={settings.currency_symbol || '₹'}
                onChange={(e) => setSettings({ ...settings, currency_symbol: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Announcement Bar & Hero Settings */}
        <div className="p-6 sm:p-8 rounded-3xl bg-obsidian-900/60 border border-gold-500/20 shadow-xl space-y-4">
          <h2 className="text-lg font-serif font-bold text-cream-100 border-b border-neutral-800 pb-2">
            Top Announcement Bar &amp; Hero Settings
          </h2>

          <div className="flex items-center gap-2 mb-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.announcement_enabled === 'true'}
                onChange={(e) => setSettings({ ...settings, announcement_enabled: e.target.checked ? 'true' : 'false' })}
                className="rounded bg-neutral-800 border-neutral-700 text-gold-500"
              />
              <span>Enable Announcement Bar at Top of Website</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Announcement Text
              </label>
              <input
                type="text"
                value={settings.announcement_text || ''}
                onChange={(e) => setSettings({ ...settings, announcement_text: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Announcement Link URL
              </label>
              <input
                type="text"
                value={settings.announcement_url || ''}
                onChange={(e) => setSettings({ ...settings, announcement_url: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              Homepage Hero Headline
            </label>
            <input
              type="text"
              value={settings.hero_title || ''}
              onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              Homepage Hero Subtitle
            </label>
            <textarea
              rows={2}
              value={settings.hero_subtitle || ''}
              onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Social Media Channels */}
        <div className="p-6 sm:p-8 rounded-3xl bg-obsidian-900/60 border border-gold-500/20 shadow-xl space-y-4">
          <h2 className="text-lg font-serif font-bold text-cream-100 border-b border-neutral-800 pb-2">
            Social Media Handles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Instagram URL
              </label>
              <input
                type="text"
                value={settings.social_instagram || ''}
                onChange={(e) => setSettings({ ...settings, social_instagram: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Facebook URL
              </label>
              <input
                type="text"
                value={settings.social_facebook || ''}
                onChange={(e) => setSettings({ ...settings, social_facebook: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                YouTube URL
              </label>
              <input
                type="text"
                value={settings.social_youtube || ''}
                onChange={(e) => setSettings({ ...settings, social_youtube: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-amberGold text-black font-bold text-sm uppercase tracking-wider flex items-center gap-2 shadow-luxury-gold hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
