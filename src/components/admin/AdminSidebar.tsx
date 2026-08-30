'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  Sparkles,
  Tag,
  Gift,
  Star,
  Camera,
  FileText,
  BookOpen,
  MessageSquare,
  Menu as MenuIcon,
  Image as ImageIcon,
  Users,
  Search as SearchIcon,
  Settings,
  X,
  ExternalLink,
} from 'lucide-react';
import { UserRole } from '@/types';
import { hasPermission } from '@/lib/permissions';

interface AdminSidebarProps {
  role?: UserRole;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({
  role = 'super_admin',
  isOpen,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const navigationItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, permission: 'view_analytics' as const },
    { label: 'Inquiries CRM', href: '/admin/inquiries', icon: MessageSquare, permission: 'view_inquiries' as const },
    { label: 'Products Boutique', href: '/admin/products', icon: Package, permission: 'manage_products' as const },
    { label: 'Services & Academy', href: '/admin/services', icon: Sparkles, permission: 'manage_services' as const },
    { label: 'Before & After', href: '/admin/before-after', icon: Layers, permission: 'manage_before_after' as const },
    { label: 'Special Offers', href: '/admin/offers', icon: Tag, permission: 'manage_offers' as const },
    { label: 'Banners & Popups', href: '/admin/promotions', icon: Gift, permission: 'manage_banners' as const },
    { label: 'Categories', href: '/admin/categories', icon: Layers, permission: 'manage_products' as const },
    { label: 'Testimonials', href: '/admin/testimonials', icon: Star, permission: 'manage_testimonials' as const },
    { label: 'Gallery Lookbook', href: '/admin/gallery', icon: Camera, permission: 'manage_gallery' as const },
    { label: 'Pages CMS', href: '/admin/pages', icon: FileText, permission: 'manage_pages' as const },
    { label: 'Blog Posts', href: '/admin/blog', icon: BookOpen, permission: 'manage_blog' as const },
    { label: 'Media Library', href: '/admin/media', icon: ImageIcon, permission: 'manage_media' as const },
    { label: 'Navigation Menus', href: '/admin/menus', icon: MenuIcon, permission: 'manage_menus' as const },
    { label: 'SEO Management', href: '/admin/seo', icon: SearchIcon, permission: 'manage_settings' as const },
    { label: 'Admin Users & RBAC', href: '/admin/users', icon: Users, permission: 'manage_users' as const },
    { label: 'Site Settings', href: '/admin/settings', icon: Settings, permission: 'manage_settings' as const },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-obsidian-950 border-r border-gold-500/20 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className="flex items-center justify-between p-5 border-b border-neutral-800">
            <Link href="/admin" className="flex items-center gap-2">
              <img src="/images/logo.svg" alt="Free Bird CMS" className="h-8 w-auto" />
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Pill */}
          <div className="px-5 py-3 border-b border-neutral-850 bg-obsidian-900/40 flex items-center justify-between">
            <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Access Level</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gold-500/20 text-gold-400 border border-gold-500/30">
              {role.replace('_', ' ')}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navigationItems.map((item) => {
              if (!hasPermission(role, item.permission)) return null;
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-gold-500 text-black shadow-luxury-gold'
                      : 'text-neutral-300 hover:text-cream-100 hover:bg-neutral-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-gold-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Preview Public Site Link */}
        <div className="p-4 border-t border-neutral-800 bg-obsidian-900/40">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-gold-500/20 border border-neutral-800 text-gold-400 text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>
    </>
  );
}
