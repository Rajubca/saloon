'use client';

import React, { useState, useEffect } from 'react';
import { Inquiry } from '@/types';
import { useToast } from '@/components/ui/Toast';
import Modal from '@/components/ui/Modal';
import {
  MessageSquare,
  Search,
  Phone,
  Mail,
  Calendar,
  MapPin,
  FileText,
  Trash2,
  Loader2,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminInquiriesPage() {
  const { showToast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Selected Inquiry for details & notes modal
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [inquiryStatus, setInquiryStatus] = useState<any>('new');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const url = `/api/inquiries?status=${statusFilter}${search ? `&search=${encodeURIComponent(search)}` : ''}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDetails = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setAdminNotes(inquiry.admin_notes || '');
    setInquiryStatus(inquiry.status);
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/inquiries/${selectedInquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: inquiryStatus,
          admin_notes: adminNotes,
        }),
      });

      if (res.ok) {
        showToast('Lead record updated', 'success');
        setSelectedInquiry(null);
        fetchInquiries();
      } else {
        throw new Error('Update failed');
      }
    } catch (e: any) {
      showToast(e.message || 'Error updating lead', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this customer inquiry?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Inquiry deleted', 'success');
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      }
    } catch (e) {
      showToast('Failed to delete', 'error');
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (!search) return true;
    const term = search.toLowerCase();
    return (
      inq.name.toLowerCase().includes(term) ||
      inq.phone.toLowerCase().includes(term) ||
      inq.email.toLowerCase().includes(term) ||
      (inq.service_or_product && inq.service_or_product.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-cream-50">Inquiries &amp; Appointment Leads CRM</h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Track VIP client consultations, bridal inquiries, and Academy student admissions.
        </p>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-obsidian-900/60 border border-neutral-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name or phone..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-obsidian-950 border border-neutral-800 text-xs text-cream-100 placeholder-neutral-500 focus:outline-none focus:border-gold-500"
          />
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {['all', 'new', 'contacted', 'in_progress', 'converted', 'closed'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                statusFilter === status
                  ? 'bg-gold-500 text-black shadow'
                  : 'bg-obsidian-950 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      {isLoading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-gold-400 animate-spin mx-auto" />
          <p className="text-xs text-neutral-400 mt-2">Loading client leads...</p>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="py-16 text-center bg-obsidian-900/40 rounded-3xl border border-neutral-800">
          <MessageSquare className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-cream-100">No inquiries match filter</p>
          <p className="text-xs text-neutral-400 mt-1">Check other status categories or reset search.</p>
        </div>
      ) : (
        <div className="rounded-3xl bg-obsidian-900/60 border border-neutral-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-obsidian-950 text-neutral-400 uppercase font-mono text-[10px] tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="p-4">Client Name</th>
                  <th className="p-4">Phone &amp; Email</th>
                  <th className="p-4">Service / Interest</th>
                  <th className="p-4">Branch / Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date Submitted</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-neutral-900/40 transition-colors">
                    <td className="p-4 font-bold text-cream-100">{inq.name}</td>
                    <td className="p-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-mono text-gold-400">
                          <Phone className="w-3 h-3" />
                          <span>{inq.phone}</span>
                        </div>
                        {inq.email && (
                          <div className="text-neutral-400 text-[11px]">{inq.email}</div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-cream-100">
                      {inq.service_or_product || inq.inquiry_type}
                    </td>
                    <td className="p-4 text-neutral-400">
                      <div>{inq.preferred_branch || 'Any Vadodara Studio'}</div>
                      {inq.preferred_date && (
                        <div className="text-[11px] text-neutral-500">{inq.preferred_date}</div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                        inq.status === 'new'
                          ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                          : inq.status === 'contacted'
                          ? 'bg-blue-950 text-blue-400 border border-blue-500/30'
                          : inq.status === 'converted'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {inq.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-neutral-400 text-[11px]">
                      {formatDate(inq.created_at)}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://wa.me/91${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.name)},%20this%20is%20Free%20Bird%20Salon%20&%20Academy%20in%20Vadodara%20regarding%20your%20inquiry.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-500 hover:text-black text-emerald-400"
                          title="Instant WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleOpenDetails(inq)}
                          className="p-1.5 rounded-lg bg-neutral-900 hover:bg-gold-500 hover:text-black text-neutral-400"
                          title="Manage Lead"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(inq.id)}
                          className="p-1.5 rounded-lg bg-neutral-900 hover:bg-red-500/20 text-neutral-400 hover:text-red-400"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inquiry Detail & Admin Notes Modal */}
      {selectedInquiry && (
        <Modal
          isOpen={Boolean(selectedInquiry)}
          onClose={() => setSelectedInquiry(null)}
          title={`Client Lead Details: ${selectedInquiry.name}`}
          maxWidth="xl"
        >
          <div className="space-y-5 text-xs text-neutral-300">
            <div className="p-4 rounded-2xl bg-obsidian-950 border border-neutral-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-400">Phone:</span>
                <a href={`tel:${selectedInquiry.phone}`} className="font-bold text-gold-400 hover:underline">
                  {selectedInquiry.phone}
                </a>
              </div>
              {selectedInquiry.email && (
                <div className="flex justify-between">
                  <span className="text-neutral-400">Email:</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-cream-100 hover:underline">
                    {selectedInquiry.email}
                  </a>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-neutral-400">Service / Product:</span>
                <span className="font-semibold text-cream-100">{selectedInquiry.service_or_product}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Preferred Branch:</span>
                <span>{selectedInquiry.preferred_branch || 'Any'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Preferred Date:</span>
                <span>{selectedInquiry.preferred_date || 'Flexible'}</span>
              </div>
            </div>

            {selectedInquiry.message && (
              <div>
                <span className="text-neutral-400 font-bold uppercase tracking-wider block mb-1">
                  Client Message / Notes:
                </span>
                <div className="p-3.5 rounded-xl bg-obsidian-950 border border-neutral-800 italic text-neutral-200 leading-relaxed">
                  &ldquo;{selectedInquiry.message}&rdquo;
                </div>
              </div>
            )}

            {selectedInquiry.attachment_url && (
              <div>
                <span className="text-neutral-400 font-bold uppercase tracking-wider block mb-1">
                  Client Hair Photo Attachment:
                </span>
                <a
                  href={selectedInquiry.attachment_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-gold-400 hover:underline font-semibold"
                >
                  <span>View Attached Image</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* CRM Status & Internal Notes */}
            <div className="pt-3 border-t border-neutral-800 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Lead Status
                </label>
                <select
                  value={inquiryStatus}
                  onChange={(e) => setInquiryStatus(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
                >
                  <option value="new">New Lead</option>
                  <option value="contacted">Contacted by Salon</option>
                  <option value="in_progress">Consultation Scheduled</option>
                  <option value="converted">Appointment Booked / Converted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Internal Salon Staff Notes
                </label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record customer preferences, scheduled date/time, or follow-up notes..."
                  className="w-full px-3.5 py-2 rounded-xl bg-obsidian-950 border border-neutral-800 text-cream-100 text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2 rounded-full bg-neutral-900 text-neutral-300 hover:text-white"
              >
                Close
              </button>
              <button
                type="button"
                disabled={isUpdating}
                onClick={handleSaveNotes}
                className="px-6 py-2 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold uppercase tracking-wider shadow disabled:opacity-50"
              >
                {isUpdating ? 'Saving...' : 'Update Lead'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
