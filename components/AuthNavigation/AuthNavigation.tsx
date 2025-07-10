'use client'

import { logout } from '@/lib/api/clientApi';
import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';

const AuthNavigation = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push('/sign-in');
  };

  if (isAuthenticated) {
    return (
      <div>
        <ul>
          <li className={css.navigationItem}>
            <a href="/profile" /* prefetch={false} */ className={css.navigationLink}>
              Profile
            </a>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button className={css.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    );
  }

  
  return (
    <div>
      <ul>
        <li className={css.navigationItem}>
          <a href="/sign-in" /* prefetch={false} */ className={css.navigationLink}>
            Login
          </a>
        </li>
        <li className={css.navigationItem}>
          <a href="/sign-up" /* prefetch={false} */ className={css.navigationLink}>
            Sign up
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AuthNavigation;
