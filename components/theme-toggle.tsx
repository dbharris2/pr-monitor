'use client';

import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(getInitialIsDark());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
    document.documentElement.classList.toggle('dark', !isDark);
  };

  if (!mounted) {
    return null;
  }

  return <button onClick={toggleTheme}>{isDark ? '🌙' : '☀️'}</button>;
};

const getInitialIsDark = () => {
  if (typeof window === 'undefined') return false;

  // Try reading from cookies first (to match server)
  const match = document.cookie.match(new RegExp('(^| )theme=([^;]+)'));
  if (match) return match[2] === 'dark';

  // Fallback to localStorage
  const storedTheme = window.localStorage.getItem('theme');
  return storedTheme === 'dark';
};
