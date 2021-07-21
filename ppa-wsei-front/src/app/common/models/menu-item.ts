/**
 * Types of menu items visible in the side navigation.
 */
export enum MenuItemType {
  Dashboard = 0,
  Settings = 10,
}

/**
 * Menu item visible in the side navigation.
 */
export interface MenuItem {
  type: MenuItemType;
  name: string;
}

/**
 * All the available menu items for the side navigation.
 */
export const MENU_ITEMS: MenuItem[] = [
  { type: MenuItemType.Dashboard, name: 'Dashboard' },
  { type: MenuItemType.Settings, name: 'Settings' },
];
