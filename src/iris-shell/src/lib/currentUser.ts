import type { HeaderUser } from '../components/AppHeader/AppHeader.js';

/**
 * Mock signed-in user. Single source of truth for every AppShell instance;
 * also the default value of `AppShellProps.user`.
 */
export const CURRENT_USER: HeaderUser = {
  name: 'John Doe',
  email: 'john.doe@company.com',
};
