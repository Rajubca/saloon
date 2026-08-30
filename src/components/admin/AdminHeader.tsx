'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Menu, LogOut, User, Bell, ExternalLink, ShieldCheck } from 'lucide-react';
import { User as UserType } from '@/types';
import { useToast } from '@/components/ui/Toast';

interface AdminHeaderProps {
  user?: UserType | null;
  onOpenSidebar: () => void;
}

export default function AdminHeader({ user, onOpenSidebar }: AdminHeaderProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      showToast('Logged out of Admin Portal', 'info');
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      router.push('/admin/login');
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-obsidian-950/90 backdrop-blur-md border-b border-gold-500/20 px-4 sm:px-8 flex items-center justify-between gap-4">
      {/* Left Mobile Menu Toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden sm:flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-gold-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Free Bird Control Panel
          </span>
        </div>
      </div>

      {/* Right User & Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        {user && (
          <div className="flex items-center gap-3 pl-3 pr-2 py-1 rounded-full bg-neutral-900 border border-neutral-800">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover border border-gold-500/40" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center text-xs font-bold font-serif">
                {user.name.charAt(0)}
              </div>
            )}
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-cream-100 line-clamp-1">{user.name}</span>
              <span className="text-[10px] text-gold-400 uppercase font-mono">{user.role}</span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-full text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition-colors ml-1"
              title="Logout from Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
