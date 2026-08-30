'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
  onExpire?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function CountdownTimer({
  targetDate,
  onExpire,
  className = '',
  size = 'md',
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    function calculateTime() {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        if (onExpire) onExpire();
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      });
    }

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onExpire]);

  if (timeLeft.isExpired) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-semibold ${className}`}>
        <Clock className="w-3.5 h-3.5" />
        <span>Offer Expired</span>
      </div>
    );
  }

  const boxClasses = {
    sm: 'px-2 py-1 min-w-[36px] text-xs',
    md: 'px-2.5 py-1.5 min-w-[46px] text-sm',
    lg: 'px-3.5 py-2 min-w-[60px] text-lg',
  }[size];

  const labelClasses = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  }[size];

  return (
    <div className={`flex items-center gap-1.5 sm:gap-2 ${className}`}>
      <div className="flex flex-col items-center">
        <div className={`rounded-lg bg-obsidian-900/90 border border-gold-500/30 text-gold-400 font-mono font-bold flex items-center justify-center shadow-md ${boxClasses}`}>
          {String(timeLeft.days).padStart(2, '0')}
        </div>
        <span className={`text-neutral-400 uppercase font-medium mt-1 ${labelClasses}`}>Days</span>
      </div>

      <span className="text-gold-500 font-bold -mt-3">:</span>

      <div className="flex flex-col items-center">
        <div className={`rounded-lg bg-obsidian-900/90 border border-gold-500/30 text-gold-400 font-mono font-bold flex items-center justify-center shadow-md ${boxClasses}`}>
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <span className={`text-neutral-400 uppercase font-medium mt-1 ${labelClasses}`}>Hours</span>
      </div>

      <span className="text-gold-500 font-bold -mt-3">:</span>

      <div className="flex flex-col items-center">
        <div className={`rounded-lg bg-obsidian-900/90 border border-gold-500/30 text-gold-400 font-mono font-bold flex items-center justify-center shadow-md ${boxClasses}`}>
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <span className={`text-neutral-400 uppercase font-medium mt-1 ${labelClasses}`}>Mins</span>
      </div>

      <span className="text-gold-500 font-bold -mt-3">:</span>

      <div className="flex flex-col items-center">
        <div className={`rounded-lg bg-obsidian-900/90 border border-gold-500/30 text-gold-400 font-mono font-bold flex items-center justify-center shadow-md ${boxClasses}`}>
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
        <span className={`text-neutral-400 uppercase font-medium mt-1 ${labelClasses}`}>Secs</span>
      </div>
    </div>
  );
}
