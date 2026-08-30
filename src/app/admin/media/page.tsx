'use client';

import React, { useState, useEffect } from 'react';
import { MediaAsset } from '@/types';
import { useToast } from '@/components/ui/Toast';
import {
  Image as ImageIcon,
  Upload,
  Search,
  Copy,
  Trash2,
  Check,
  Loader2,
  Folder,
  Sparkles,
} from 'lucide-react';

export default function AdminMediaPage() {
  const { showToast } = useToast();
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [folderFilter, setFolderFilter] = useState('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    fetchMedia();
  }, [folderFilter]);

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/media?folder=${folderFilter}`);
      if (res.ok) {
        const data = await res.json();
        setAssets(data.assets || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folderFilter === 'all' ? 'uploads' : folderFilter);

      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      showToast('Media asset uploaded successfully', 'success');
      fetchMedia();
    } catch (err: any) {
      showToast(err.message || 'Upload failed', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyUrl = (asset: MediaAsset) => {
    navigator.clipboard.writeText(asset.url);
    setCopiedId(asset.id);
    showToast('Asset URL copied to clipboard!', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddToGallery = async (asset: MediaAsset) => {
    try {
      const cleanTitle = asset.original_name.replace(/\.[^/.]+$/, '').replace(/[_\\-]+/g, ' ');
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: cleanTitle,
          caption: asset.caption || 'Artistry portfolio photo from studio',
          media_url: asset.url,
          category_id: 8,
          is_featured: 1,
          display_order: 0,
        }),
      });

      if (res.ok) {
        showToast(`"${cleanTitle}" added to Public Lookbook Gallery!`, 'success');
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Failed to add to gallery');
      }
    } catch (e: any) {
      showToast(e.message || 'Failed to add to gallery', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this media asset?')) return;
    try {
      const res = await fetch(`/api/media?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Media asset deleted', 'success');
        setAssets((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (e) {
      showToast('Failed to delete', 'error');
    }
  };

  const filteredAssets = assets.filter((a) =>
    a.filename.toLowerCase().includes(search.toLowerCase()) ||
    a.original_name.toLowerCase().includes(search.toLowerCase()) ||
    a.alt_text?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-cream-50">Media Library &amp; Asset Management</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Central storage for high-resolution salon photos, transformation comparisons, and promotional graphics.
          </p>
        </div>

        <label className="px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow">
          {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          <span>{isUploading ? 'Uploading...' : 'Upload Media'}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </label>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-obsidian-900/60 border border-neutral-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search filenames..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-obsidian-950 border border-neutral-800 text-xs text-cream-100 placeholder-neutral-500 focus:outline-none focus:border-gold-500"
          />
        </div>

        {/* Folders */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {['all', 'products', 'services', 'transformations', 'gallery', 'uploads'].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFolderFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1 ${
                folderFilter === f
                  ? 'bg-gold-500 text-black shadow'
                  : 'bg-obsidian-950 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <Folder className="w-3 h-3" />
              <span>{f}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      {isLoading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-gold-400 animate-spin mx-auto" />
          <p className="text-xs text-neutral-400 mt-2">Loading media assets...</p>
        </div>
      ) : filteredAssets.length === 0 ? (
        <div className="py-16 text-center bg-obsidian-900/40 rounded-3xl border border-neutral-800">
          <ImageIcon className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-cream-100">No media assets in this folder</p>
          <p className="text-xs text-neutral-400 mt-1">Upload your images using the button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="group relative rounded-2xl overflow-hidden bg-obsidian-900/80 border border-neutral-800 hover:border-gold-500/50 transition-all flex flex-col shadow-lg"
            >
              <div className="relative aspect-square w-full bg-obsidian-950 overflow-hidden">
                <img
                  src={asset.url}
                  alt={asset.alt_text || asset.filename}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Quick overlay buttons */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                  <button
                    type="button"
                    onClick={() => handleAddToGallery(asset)}
                    className="p-2 rounded-xl bg-gold-500 text-black hover:bg-gold-400 shadow transition-transform hover:scale-110"
                    title="Publish to Lookbook Gallery"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(asset)}
                    className="p-2 rounded-xl bg-neutral-800 text-white hover:bg-neutral-700 shadow transition-transform hover:scale-110"
                    title="Copy URL"
                  >
                    {copiedId === asset.id ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(asset.id)}
                    className="p-2 rounded-xl bg-red-600 text-white hover:bg-red-500 shadow transition-transform hover:scale-110"
                    title="Delete Media"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-2.5 bg-obsidian-950/80 text-[11px] space-y-1">
                <p className="font-semibold text-cream-100 truncate" title={asset.original_name}>
                  {asset.original_name}
                </p>
                <div className="flex items-center justify-between text-neutral-500 text-[10px]">
                  <span className="uppercase">{asset.folder}</span>
                  <span>{(asset.size_bytes / 1024).toFixed(0)} KB</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddToGallery(asset)}
                  className="w-full mt-1.5 py-1 px-2 rounded-lg bg-gold-500/10 hover:bg-gold-500 text-gold-400 hover:text-black border border-gold-500/20 text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Add to Lookbook</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
