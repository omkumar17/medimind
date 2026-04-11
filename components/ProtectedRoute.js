"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children, allowedRole }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (!data.user) {
          router.push('/');
          return;
        }
        if (allowedRole && data.user.role !== allowedRole) {
          router.push('/');
          return;
        }
        setUser(data.user);
      } catch {
        router.push('/');
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router, allowedRole]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // redirect handled
  }

  return <>{children}</>;
}
