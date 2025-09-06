// components/ThemeToggle.tsx
'use client';

import { memo, useCallback, useEffect, useState } from 'react';

const ThemeToggleImpl = () => {
  const [isDark, setIsDark] = useState(getInitialIsDark());

  const toggleTheme = useCallback(() => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', !isDark);
  }, [isDark]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, [isDark]);

  return (
    <button onClick={toggleTheme}>
      {isDark ? '🌙' : '☀️'}
    </button>
  );
}

const getInitialIsDark = () => {
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return storedTheme === 'dark' || (!storedTheme && prefersDark);
}

export const ThemeToggle = memo(ThemeToggleImpl);