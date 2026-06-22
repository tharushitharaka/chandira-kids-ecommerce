import { useEffect, useState } from 'react';

function getTimeLeft(endDate) {
  const diff = new Date(endDate).getTime() - Date.now();
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, done: true };
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { hours, minutes, seconds, done: false };
}

export default function CountdownTimer({ endDate, label = 'Offer ends in' }) {
  const [time, setTime] = useState(() => getTimeLeft(endDate));

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft(endDate)), 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  if (time.done) return null;

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="inline-flex flex-col items-center rounded-2xl bg-white/90 px-5 py-3 shadow-soft ring-1 ring-brand-blush">
      <span className="text-xs font-bold uppercase tracking-wide text-brand-rose">{label}</span>
      <div className="mt-1 flex gap-2 font-mono text-xl font-extrabold text-ink">
        <span>{pad(time.hours)}</span>
        <span className="text-brand-pink">:</span>
        <span>{pad(time.minutes)}</span>
        <span className="text-brand-pink">:</span>
        <span>{pad(time.seconds)}</span>
      </div>
    </div>
  );
}
