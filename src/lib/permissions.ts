import { UserRole } from "@/types";

export type Permission =
  | 'manage_users'
  | 'manage_settings'
  | 'manage_products'
  | 'manage_offers'
  | 'manage_banners'
  | 'manage_services'
  | 'manage_before_after'
  | 'manage_gallery'
  | 'manage_testimonials'
  | 'manage_pages'
  | 'manage_blog'
  | 'manage_menus'
  | 'manage_media'
  | 'view_inquiries'
  | 'manage_inquiries'
  | 'view_analytics';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  super_admin: [
    'manage_users',
    'manage_settings',
    'manage_products',
    'manage_offers',
    'manage_banners',
    'manage_services',
    'manage_before_after',
    'manage_gallery',
    'manage_testimonials',
    'manage_pages',
    'manage_blog',
    'manage_menus',
    'manage_media',
    'view_inquiries',
    'manage_inquiries',
    'view_analytics',
  ],
  content_manager: [
    'manage_products',
    'manage_offers',
    'manage_banners',
    'manage_services',
    'manage_before_after',
    'manage_gallery',
    'manage_testimonials',
    'manage_pages',
    'manage_blog',
    'manage_menus',
    'manage_media',
    'view_inquiries',
    'view_analytics',
  ],
  staff: [
    'view_inquiries',
    'manage_inquiries',
    'view_analytics',
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}
