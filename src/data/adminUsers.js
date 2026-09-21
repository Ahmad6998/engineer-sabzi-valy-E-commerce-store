/**
 * ENGINEER SABZI VALY - ADMIN ACCOUNTS CONFIGURATION
 * 
 * You can edit default admin accounts here or register new accounts
 * directly from the Admin Portal Login screen or Admin Settings!
 */

export const INITIAL_ADMIN_USERS = [
  {
    id: 'admin-1',
    username: 'admin',
    email: 'admin@engineersabzivaly.pk',
    password: 'engineer786',
    fullName: 'Chief Engineer & Store Owner',
    role: 'Super Admin',
    createdAt: 'Sep 21, 2026'
  },
  {
    id: 'admin-2',
    username: 'engineer',
    email: 'engineer@engineersabzivaly.pk',
    password: 'admin123',
    fullName: 'Operations Manager',
    role: 'Store Manager',
    createdAt: 'Sep 21, 2026'
  }
];

export const MASTER_SECURITY_KEY = 'engineer786'; // Required to register new admin accounts from UI

