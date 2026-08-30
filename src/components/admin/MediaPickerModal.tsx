'use client';

import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import { Upload, Search, Check, Image as ImageIcon, Loader2 } from 'lucide-react';
import { MediaAsset } from '@/types';
import { useToast } from '@/components/ui/Toast';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (url: string) => void;
}

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelectImage,
}: MediaPickerModalProps) {
  const { showToast } = useToast();
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/media');
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
      formData.append('folder', 'uploads');

      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      showToast('Image uploaded successfully', 'success');
      onSelectImage(data.asset.url);
      onClose();
    } catch (err: any) {
      showToast(err.message || 'Upload error', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirm = () => {
    if (selectedUrl) {
      onSelectImage(selectedUrl);
      onClose();
    }
  };

  const filteredAssets = assets.filter((a) =>
    a.filename.toLowerCase().includes(search.toLowerCase()) ||
    a.alt_text?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Media Asset" maxWidth="3xl">
      <div className="space-y-6">
        {/* Top Controls: Upload & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-neutral-800">
          <label className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow">
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            <span>{isUploading ? 'Uploading...' : 'Upload New Image'}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search uploaded files..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-obsidian-950 border border-neutral-800 text-xs text-cream-100 placeholder-neutral-500 focus:outline-none focus:border-gold-500"
            />
          </div>
        </div>

        {/* Media Grid */}
        {isLoading ? (
          <div className="py-16 text-center">
            <Loader2 className="w-8 h-8 text-gold-400 animate-spin mx-auto" />
            <p className="text-xs text-neutral-400 mt-2">Loading media assets...</p>
          </div>
        ) : filteredAssets.length === 0 ? (
          <div className="py-16 text-center bg-obsidian-950 rounded-2xl border border-neutral-800">
            <ImageIcon className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
            <p className="text-sm text-cream-100 font-semibold">No media assets found</p>
            <p className="text-xs text-neutral-400 mt-1">Upload a photo to start using it in your content.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-96 overflow-y-auto pr-1">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                onClick={() => setSelectedUrl(asset.url)}
                className={`relative aspect-square rounded-xl overflow-hidden bg-obsidian-950 border-2 cursor-pointer transition-all ${
                  selectedUrl === asset.url
                    ? 'border-gold-500 ring-2 ring-gold-500/50 scale-95'
                    : 'border-neutral-800 hover:border-gold-500/40'
                }`}
              >
                <img
                  src={asset.url}
                  alt={asset.alt_text || asset.filename}
                  className="w-full h-full object-cover"
                />
                {selectedUrl === asset.url && (
                  <div className="absolute inset-0 bg-gold-500/30 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-gold-500 text-black flex items-center justify-center shadow">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-neutral-900 text-neutral-300 hover:text-white text-xs font-semibold uppercase tracking-wider"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!selectedUrl}
            onClick={handleConfirm}
            className="px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider shadow"
          >
            Select Image
          </button>
        </div>
      </div>
    </Modal>
  );
}
