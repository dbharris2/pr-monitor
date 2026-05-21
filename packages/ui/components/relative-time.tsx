'use client';

import { useEffect, useState } from 'react';

import { formatRelativeTime } from 'utils/format-relative-time';

const TICK_INTERVAL = 60 * 1000;

const subscribers = new Set<(now: number) => void>();
let intervalId: ReturnType<typeof setInterval> | null = null;

const subscribe = (callback: (now: number) => void) => {
  subscribers.add(callback);
  if (intervalId === null) {
    intervalId = setInterval(() => {
      const now = Date.now();
      for (const cb of subscribers) cb(now);
    }, TICK_INTERVAL);
  }
  return () => {
    subscribers.delete(callback);
    if (subscribers.size === 0 && intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
};

type Props = {
  dateString: string;
};

export const RelativeTime = ({ dateString }: Props) => {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => subscribe(setNow), []);
  return <>{formatRelativeTime(dateString, now)}</>;
};
