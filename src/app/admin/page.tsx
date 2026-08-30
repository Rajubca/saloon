'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import StatCard from '@/components/admin/StatCard';
import {
  Package,
  Sparkles,
  Tag,
  MessageSquare,
  Layers,
  BookOpen,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Users,
} from 'lucide-react';
import { Inquiry } from '@/types';
import { formatDate } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

export default function AdminDashboardPage() {
  const { showToast } = useToast();
  const [stats, setStats] = useState<any>(null);
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/analytics');
      if (res.ok) {
        const data = await res.json();
        setStats(data.kpis);
        setRecentInquiries(data.recentInquiries || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateInquiryStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        showToast('Inquiry status updated', 'success');
        setRecentInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus as any } : inq))
        );
      }
    } catch (e) {
      showToast('Failed to update status', 'error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-cream-50">
            Salon &amp; Academy Overview
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light">
            Live business analytics, customer leads, before/after transformations, and content management.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/products"
            className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </Link>
          <Link
            href="/admin/before-after"
            className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-gold-500/30 text-gold-400 font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Before/After</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="New Leads & Inquiries"
          value={stats?.newInquiries ?? '0'}
          subtitle={`${stats?.totalInquiries ?? 0} total submissions`}
          icon={MessageSquare}
        />
        <StatCard
          title="Retail Products"
          value={stats?.totalProducts ?? '0'}
          subtitle="In Salon Boutique"
          icon={Package}
        />
        <StatCard
          title="Services & Courses"
          value={stats?.totalServices ?? '0'}
          subtitle="Salon & Academy"
          icon={Sparkles}
        />
        <StatCard
          title="Transformations"
          value={stats?.transformations ?? '0'}
          subtitle="Interactive Sliders"
          icon={Layers}
        />
      </div>

      {/* Main Grid: Recent Inquiries + Quick CMS Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Inquiries Queue (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-obsidian-900/70 border border-gold-500/20 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gold-400" />
              <h2 className="text-lg font-serif font-bold text-cream-100">
                Recent Appointment &amp; Course Inquiries
              </h2>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs text-gold-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>View All Inquiries</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="py-12 text-center text-neutral-500 text-sm">
              No inquiries received yet.
            </div>
          ) : (
            <div className="space-y-3">
              {recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-4 rounded-2xl bg-obsidian-950/60 border border-neutral-800 hover:border-gold-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-cream-100 text-sm">{inq.name}</span>
                      <span className="text-xs text-neutral-400">• {inq.phone}</span>
                    </div>
                    <p className="text-xs text-gold-400 font-medium">
                      {inq.service_or_product || inq.inquiry_type}
                    </p>
                    {inq.message && (
                      <p className="text-xs text-neutral-400 line-clamp-1 italic">
                        &ldquo;{inq.message}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Status Dropdown & Date */}
                  <div className="flex items-center gap-3 shrink-0">
                    <select
                      value={inq.status}
                      onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border focus:outline-none ${
                        inq.status === 'new'
                          ? 'bg-amber-950/60 border-amber-500/50 text-amber-400'
                          : inq.status === 'contacted'
                          ? 'bg-blue-950/60 border-blue-500/50 text-blue-400'
                          : inq.status === 'converted'
                          ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400'
                          : 'bg-neutral-900 border-neutral-700 text-neutral-400'
                      }`}
                    >
                      <option value="new">New Lead</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_progress">In Progress</option>
                      <option value="converted">Converted</option>
                      <option value="closed">Closed</option>
                    </select>

                    <span className="text-[11px] text-neutral-400 whitespace-nowrap">
                      {formatDate(inq.created_at)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Access Shortcuts (4 cols) */}
        <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-obsidian-900/70 border border-gold-500/20 shadow-xl space-y-4">
          <h2 className="text-lg font-serif font-bold text-cream-100">
            Quick Content Shortcuts
          </h2>

          <div className="space-y-2.5">
            <Link
              href="/admin/products"
              className="flex items-center justify-between p-3.5 rounded-xl bg-obsidian-950 border border-neutral-800 hover:border-gold-500/40 text-xs font-semibold text-cream-100 hover:text-gold-400 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-gold-400" />
                <span>Manage Product Catalog</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-gold-400" />
            </Link>

            <Link
              href="/admin/before-after"
              className="flex items-center justify-between p-3.5 rounded-xl bg-obsidian-950 border border-neutral-800 hover:border-gold-500/40 text-xs font-semibold text-cream-100 hover:text-gold-400 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-gold-400" />
                <span>Manage Before/After Sliders</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-gold-400" />
            </Link>

            <Link
              href="/admin/offers"
              className="flex items-center justify-between p-3.5 rounded-xl bg-obsidian-950 border border-neutral-800 hover:border-gold-500/40 text-xs font-semibold text-cream-100 hover:text-gold-400 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Tag className="w-4 h-4 text-gold-400" />
                <span>Manage Deals &amp; Countdowns</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-gold-400" />
            </Link>

            <Link
              href="/admin/promotions"
              className="flex items-center justify-between p-3.5 rounded-xl bg-obsidian-950 border border-neutral-800 hover:border-gold-500/40 text-xs font-semibold text-cream-100 hover:text-gold-400 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>Launch Popup &amp; Banners</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-gold-400" />
            </Link>

            <Link
              href="/admin/media"
              className="flex items-center justify-between p-3.5 rounded-xl bg-obsidian-950 border border-neutral-800 hover:border-gold-500/40 text-xs font-semibold text-cream-100 hover:text-gold-400 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Plus className="w-4 h-4 text-gold-400" />
                <span>Media Library &amp; Uploads</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-gold-400" />
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center justify-between p-3.5 rounded-xl bg-obsidian-950 border border-neutral-800 hover:border-gold-500/40 text-xs font-semibold text-cream-100 hover:text-gold-400 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-gold-400" />
                <span>Global Site &amp; Branch Settings</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-gold-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
