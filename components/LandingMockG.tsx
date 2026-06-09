/**
 * Arena Boxing — Landing intro (Mock G v3 LOOMING translation).
 *
 * Cinematic intro on `/` — curtain parts, ARENA wordmark draws and
 * runs (red stroke), Enter SVG text draws and runs (white), tagline
 * breathes (cream-burgundy), logo backdrop sits as hazy atmosphere.
 *
 * Logic preserved from the previous Landing component: 10s countdown,
 * sessionStorage bypass for return visits, prefers-reduced-motion
 * fallback, handleEnter click navigation.
 */

'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const STORAGE_KEY = 'arena_intro_seen';

type LandingMockGProps = {
  mode?: 'gate' | 'route';
  exitHref?: string;
  onComplete?: () => void;
};

export default function LandingMockG({
  mode = 'route',
  exitHref = '/',
  onComplete,
}: LandingMockGProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [skipping, setSkipping] = useState(false);

  const completeIntro = useCallback(
    (delay: number) => {
      if (skipping) return;
      setSkipping(true);

      setTimeout(() => {
        try {
          sessionStorage.setItem(STORAGE_KEY, '1');
        } catch {
          // Ignore storage failures; the intro should still exit.
        }

        if (onComplete) {
          onComplete();
          return;
        }

        router.push(exitHref);
      }, delay);
    },
    [exitHref, onComplete, router, skipping]
  );

  useEffect(() => {
    if (mode === 'gate') {
      try {
        if (sessionStorage.getItem(STORAGE_KEY)) {
          onComplete?.();
          return;
        }
      } catch {
        // Storage can fail in private modes; show the intro.
      }
    }

    if (skipping) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          completeIntro(800);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [completeIntro, mode, onComplete, skipping]);

  const handleEnter = () => {
    completeIntro(600);
  };

  return (
    <>
      <style>{CSS}</style>
      <section className="lmg-stage" aria-label="Arena Boxing intro">
        <div className="lmg-bloom-cnr" />
        <div className="lmg-bloom-cnr2" />
        <div className="lmg-vignette" />
        <div className="lmg-grain" />

        {/* Logo backdrop — hazy atmospheric layer */}
        <div className="lmg-brand-icon">
          <svg viewBox="0 0 1088 675" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <g fill="none" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
              <path d="M474.1,267.1c.2.6-1.1-1.2-1.1-1.1,0,0,1.1,1.1,1.1,1.1Z" />
          <path d="M727.8,354.7c-.5-9.8,2.4-19.4,5.2-28.8,6.7-22.4,13.5-44.9,20.2-67.3,8.1-27,17.3-55.7,40.1-72.7s3.6-2.3,5.6-2.7c8.8-2,13,5.6,15.9,12.2,10,22.3,20,44.5,30.1,66.8,5.4,11.9,13.9,25.9,27.6,23.4s7.3-2.7,10.1-5.4c16.9-16.3,13.4-43.7,2-63.5-10.7-18.6-27.1-33.2-39.4-50.7s-20.2-40.9-11.2-60.3c14.4,8.3,30.3,18.5,33.7,34.8,1,4.9.8,10,2.2,14.8,3.6,12.7,16.7,19.6,26.8,28.1,19.8,16.6,30.5,43.5,27.4,69.1-1.6,13.6-6.9,26.9-6.1,40.6s13.9,32.5,30.3,26.1,9.7-6.4,12.3-11.6c15.9-31.3-11.5-62.8-23.4-94.2-15.1-39.9-5.4-87.7-27.6-124.1-15.5-25.5-44.8-40.7-74.4-44.2-21.4-2.6-46.7,2.4-56.9,21.4-2.8,5.2-5,11.8-10.7,13.5-4.3,1.3-8.7-1-13.1-2-14.2-3.5-28.5,5.9-37.8,17.2-10.2,12.4-17.1,27.5-29.8,37.6-2.6,2.1-5.6,3.6-8.9,4.3-15.1,2.8-23.3-14.4-28.7-27.9-14.8-37.1-41.2-69.4-74.6-91.4-7-4.6-14.6-8.9-23-9.7-12-1.3-23.5,4.5-33.6,11.1-33.8,22-60.5,54.6-75.5,92-4.5,11.4-11,25.5-24,24.1s-4.6-1.1-6.7-2.2c-13.7-7.2-20.8-22-29.4-34.6-8.2-12.1-20.7-23.8-35.3-22.3-5.9.6-11.9,3.4-17.5,1.3-3.8-1.4-6.5-4.7-9.2-7.7-30-33.1-88.7-33.6-119.2-1-34.2,36.5-28,94.9-49.7,140-7,14.7-17,27.8-23.8,42.7s-10.1,32.4-3.3,47.2c6.8,14.8,26.7,23.9,40.4,15.1,10.7-6.9,13.8-21.5,12.3-34.1-1.6-12.7-6.8-24.6-8.7-37.2-4.5-28.8,9.8-59.7,34.7-75,9.2-5.6,21.4-12.3,19.9-23-1-7.1-8.5-13.4-1.5-20.6s1.4-1.2,2.1-1.8l39.6-29.2c5.5,35.1-9.4,72.6-37.4,94.4-7,5.5-14.9,10.1-20.7,16.9-13.2,15.6-12.2,39-5.6,58.4,3,8.9,8.6,18.7,17.9,19.9,8.6,1.1,16.1-5.6,21.2-12.6,19.9-27.7,21.6-68.2,49-88.6,4.5-3.4,10.6-6.1,15.6-3.6,3.4,1.7,5.4,5.2,7.1,8.6,21.5,43.9,24,97.2,48.9,138.1,6.1,10.1,6.3,22.8.3,33-13.4,22.8-25.1,46.7-26.7,72.9-1.3,20.8,3.8,42-1,62.3-7.1,29.5-33.3,49.9-58.2,67.4-7.9,5.5-16.1,11.1-25.6,12.7-9.5,1.6-20.5-2.1-24.5-10.8-6.3-14,8.4-28.3,22-35.4,26.9-14.1,60.8-27,66.7-56.7,4.1-20.9-8.3-41.1-20.1-58.8-16.7-25.1-33.5-50.3-50.2-75.4-2.6-4-5.4-8.1-9.5-10.6-8.7-5.2-20.6-1.1-26.9,6.8-6.3,7.9-8.3,18.4-9.2,28.4-1.4,15.8.7,34.1,13.7,43,6.4,4.3,14.3,5.6,21.5,8.2,20.5,7.4,36,27.4,37.9,49.2s-.1,3.5-1,5c-4,6.8-14.5-.1-22.4-2.6-12-3.8-23.6,5.6-34.5,11.9-12.1,7.1-33,7.4-32.8-9.5s1.4-8,3.7-11.3c12.7-18.8,7.9-46.4-9.4-60.5-4.7-3.8-10.4-6.8-16.4-7.1-13.4-.6-24.3,12.1-26.6,25.3-4.5,26.1,14.1,49.7,24.3,72.2,12.5,27.5,25,55,37.5,82.6,4.4,9.7,9.1,19.8,17.4,26.5,23.4,18.9,57.6,1.1,87.7,2.1,23.2.8,46.7,13.4,68.7,5.8,18.1-6.3,31.8-25.6,50.9-25,22.4.7,33.3,26.5,45.9,44.9,18,26.3,49.4,42.9,81.3,42.9s63.3-16.3,81.5-42.5c10.5-15.1,19.7-35.2,38-37.3,20.1-2.3,34.2,19.2,53,26.7,23.1,9.1,48.8-4.3,73.6-3.7,23.8.6,47.5,14.1,70.4,7.7,18.1-5.1,30.8-21.8,38.2-39.1,7.4-17.3,10.9-36.1,18.4-53.4,13.5-31,40.2-59.6,35.9-93.1-1-7.7-4-15.5-10.2-20-10.8-7.7-27-1.6-34,9.6-7.1,11.2-7.1,25.3-5.3,38.4,1.6,11.6,2.8,26.6-10.1,30.3s-6.5.9-9.6.1c-14.7-3.4-29.4-6.9-44.2-10.3-6.4-1.5-13.1-3.2-17.9-7.7-9.4-9-6.6-25.4,1.9-35.2,8.6-9.8,21.1-14.8,32.7-20.7,11.6-5.8,23.4-13.7,27.8-25.9,3.2-8.8,2-18.7,0-27.8-2.7-12.3-11-27.1-24.7-21.9s-5.1,2.8-7.1,5c-24.7,27.4-46.3,57.6-64.1,89.9-6.2,11.3-12.2,23.5-12,36.4.3,17.8,12.2,33.4,26.1,44.6s29.9,19.3,43.6,30.8c5.2,4.3,10.3,9.7,8.8,17.4-1,5.1-4.7,9.2-9.4,11.3-9.1,4.1-19.1,1.3-27.9-2.5-40.5-17.8-68.2-61.3-67.3-105.5.3-17.4,4.7-35.1.4-52-5-19.8-21.2-36-22.9-56.3,0-.5,0-1.1-.1-1.6Z" />
            </g>
          </svg>
        </div>

        {/* ARENA wordmark — red running trace */}
        <div className="lmg-arena">
          <svg viewBox="0 0 4000 1461" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="arenaG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F0E6DB" />
                <stop offset="50%" stopColor="#E8DDD3" />
                <stop offset="100%" stopColor="#D4C8BD" />
              </linearGradient>
            </defs>
            <g className="lmg-arena-fill">
              <path d="M874.3,1305.1c-53.5-30.5-84.6-65.5-93.3-104.8-3.3-14.2-6-30.3-8.2-48.3-2.2-18-3.8-38.5-4.9-61.4l-275,214.4c-89.5-64.4-173-112.4-250.5-144.1-26.2-9.8-49.1-14.7-68.8-14.7s-16.9,3.8-24.6,11.5c-7.6,7.6-11.5,15.8-11.5,24.6s1.9,8.7,5.7,16.4c3.8,7.6,7.9,15.6,12.3,23.7,4.3,8.2,8.2,16.4,11.5,24.6,3.3,8.2,4.9,15,4.9,20.5-2.2,21.8-16.4,32.7-42.6,32.7s-46.4-16.9-54-50.8v-8.2c-1.1-2.2-1.6-4.9-1.6-8.2,0-29.5,9.8-60.6,29.5-93.3,8.7-14.2,18-27.8,27.8-40.9,9.8-13.1,19.1-26.7,27.8-40.9l117.9-173.5c-138.6-86.2-207.9-199.2-207.9-338.9s39.8-188.3,119.5-263.6c79.6-75.3,170.8-115.1,273.4-119.5h14.7c105.8,0,211.7,33.8,317.6,101.5,5.4,3.3,11.5,7.4,18,12.3,6.5,4.9,14.2,10.6,22.9,17.2,25.1-27.3,51.8-51.3,80.2-72,28.4-20.7,58.4-38.2,90-52.4l18,26.2-26.2,18c-45.8,30.6-74.2,61.1-85.1,91.7-9.8,26.2-14.7,58.9-14.7,98.2v27.8c0-1.1,0,1.1,0,6.5s.5,14.2,1.6,26.2l26.2,553.3v13.1c0,46.9,5.4,81.8,16.4,104.8,6.5,15.3,16.9,22.9,31.1,22.9s27.8-8.2,47.5-24.6c1.1-1.1,3.3-3,6.5-5.7,3.3-2.7,5.4-4.6,6.5-5.7l26.2,27.8-185,155.5ZM429,499.7c-40.4,0-77.5,21.8-111.3,65.5l-29.5-14.7c40.4-101.5,100.4-152.2,180.1-152.2s85.7,6,135.9,18l45.8-68.8c-61.1-32.7-131.5-49.1-211.2-49.1s-154.4,28.9-224.3,86.8c-55.7,48-83.5,107.5-83.5,178.4,0,111.3,56.2,206.8,168.6,286.5l222.6-320.9c-36-19.6-67.1-29.5-93.3-29.5ZM296.4,917.1l-63.8,91.7,374.9,158.8,158.8-122.8-6.5-127.7h-463.3ZM681.1,368.7l-304.5,432.2h376.5l-18-389.6c-14.2-14.2-32.2-28.4-54-42.6Z" fill="url(#arenaG)" />
          <path d="M1224.6,470.2c55.7,31.7,93.8,75.9,114.6,132.6l149-135.9,117.9,145.7-111.3,103.1-96.6-119.5-65.5,57.3v460l80.2,58.9,75.3-58.9,22.9,26.2-198.1,158.8c-66.6-64.4-133.2-103.1-199.7-116.2v-19.6c37.1-20.7,55.7-63.8,55.7-129.3v-330.7c0-43.6-7.6-74.7-22.9-93.3l-16.4-16.4-47.5,39.3-19.6-22.9,162.1-139.1Z" fill="url(#arenaG)" />
          <path d="M1902.3,1298.5c-93.9-54.6-177.9-88.4-252.1-101.5v-18c33.8-16.4,51.8-53.5,54-111.3v-355.2c0-41.5-18-62.2-54-62.2l-6.5-18c65.5-28.4,124.4-55.9,176.8-82.7,52.4-26.7,99.3-52.6,140.8-77.8l199.7,255.4-296.3,245.5v150.6c58.9,29.5,106.4,54,142.4,73.7l116.2-81.8,16.4,22.9-237.4,160.4ZM2031.6,782.9l-167-214.4v350.3l167-135.9Z" fill="url(#arenaG)" />
          <path d="M2354.1,470.2c36,31.7,59.5,56.2,70.4,73.7,15.3,25.1,22.9,56.8,22.9,94.9l203-168.6,117.9,117.9,76.9-73.7,22.9,26.2c-6.5,6.5-14.2,14.7-22.9,24.6-8.7,9.8-18.6,21.8-29.5,36-20.7,31.7-31.1,83-31.1,153.9v325.8c0,52.4,13.1,78.6,39.3,78.6s22.4-6,37.7-18v-1.6l13.1-9.8,19.6,31.1-171.9,137.5c-7.6-5.5-16.1-13.1-25.4-22.9-9.3-9.8-19.9-21.8-31.9-36-27.3-38.2-40.9-98.2-40.9-180.1v-410.9l-63.8-65.5-113,93.3v448.5l55.7,58.9-140.8,114.6-139.1-117.9,63.8-58.9v-425.6c0-3.3.5-5.5,1.6-6.5v-31.1c-1.1-37.1-13.1-55.7-36-55.7s-25.7,5.5-40.9,16.4l-19.6-26.2,162.1-122.8Z" fill="url(#arenaG)" />
          <path d="M2940.8,1143l26.2-27.8c1.1,1.1,3.3,3,6.5,5.7,3.3,2.7,5.5,4.7,6.5,5.7,19.6,16.4,35.5,24.6,47.5,24.6,14.2,0,24.6-7.6,31.1-22.9,10.9-22.9,16.4-57.8,16.4-104.8v-6.5s0-6.5,0-6.5l26.2-553.3c1.1-12,1.6-20.7,1.6-26.2,0-5.4,0-7.6,0-6.5v-27.8c0-39.3-4.9-72-14.7-98.2-10.9-30.5-39.3-61.1-85.1-91.7l-26.2-18,18-26.2c31.7,14.2,61.7,31.7,90,52.4,28.4,20.7,55.1,44.8,80.2,72,8.7-6.5,16.4-12.3,22.9-17.2,6.5-4.9,12.6-9,18-12.3,105.9-67.7,211.7-101.5,317.6-101.5h6.5s8.2,0,8.2,0c102.6,4.4,193.7,44.2,273.4,119.5,79.7,75.3,119.5,163.2,119.5,263.6,0,139.7-69.3,252.7-207.9,338.9l117.9,173.5c8.7,14.2,18,27.8,27.8,40.9,9.8,13.1,19.1,26.8,27.8,40.9,19.6,32.7,29.5,63.8,29.5,93.3,0,3.3-.5,6-1.6,8.2v8.2c-7.6,33.8-25.6,50.8-54,50.8-26.2,0-40.4-10.9-42.6-32.7,0-5.5,1.6-12.3,4.9-20.5,3.3-8.2,7.1-16.4,11.5-24.6,4.4-8.2,8.5-16.1,12.3-23.7,3.8-7.6,5.7-13.1,5.7-16.4,0-8.7-3.8-16.9-11.5-24.6-7.6-7.6-15.8-11.5-24.6-11.5-19.6,0-42.6,4.9-68.8,14.7-77.5,31.7-161,79.7-250.5,144.1l-275-214.4c-1.1,22.9-2.7,43.4-4.9,61.4-2.2,18-4.9,34.1-8.2,48.3-8.7,39.3-39.8,74.2-93.3,104.8l-185-155.5ZM3477.7,522.6l222.6,320.9c112.4-79.7,168.6-175.2,168.6-286.5,0-70.9-27.8-130.4-83.5-178.4-69.8-57.8-144.6-86.8-224.3-86.8-79.7,0-150,16.4-211.2,49.1l45.8,68.8c50.2-12,95.5-18,135.9-18,79.7,0,139.7,50.8,180.1,152.2l-29.5,14.7c-33.8-43.6-70.9-65.5-111.3-65.5-26.2,0-57.3,9.8-93.3,29.5ZM3240.3,910.6l-6.5,127.7,158.8,122.8,374.9-158.8-63.8-91.7h-463.3ZM3264.9,404.7l-18,389.6h376.5s-304.5-432.2-304.5-432.2c-21.8,14.2-39.8,28.4-54,42.6Z" fill="url(#arenaG)" />
            </g>
            <g className="lmg-arena-trace" fill="none" stroke="#A31F1F" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
              <path d="M874.3,1305.1c-53.5-30.5-84.6-65.5-93.3-104.8-3.3-14.2-6-30.3-8.2-48.3-2.2-18-3.8-38.5-4.9-61.4l-275,214.4c-89.5-64.4-173-112.4-250.5-144.1-26.2-9.8-49.1-14.7-68.8-14.7s-16.9,3.8-24.6,11.5c-7.6,7.6-11.5,15.8-11.5,24.6s1.9,8.7,5.7,16.4c3.8,7.6,7.9,15.6,12.3,23.7,4.3,8.2,8.2,16.4,11.5,24.6,3.3,8.2,4.9,15,4.9,20.5-2.2,21.8-16.4,32.7-42.6,32.7s-46.4-16.9-54-50.8v-8.2c-1.1-2.2-1.6-4.9-1.6-8.2,0-29.5,9.8-60.6,29.5-93.3,8.7-14.2,18-27.8,27.8-40.9,9.8-13.1,19.1-26.7,27.8-40.9l117.9-173.5c-138.6-86.2-207.9-199.2-207.9-338.9s39.8-188.3,119.5-263.6c79.6-75.3,170.8-115.1,273.4-119.5h14.7c105.8,0,211.7,33.8,317.6,101.5,5.4,3.3,11.5,7.4,18,12.3,6.5,4.9,14.2,10.6,22.9,17.2,25.1-27.3,51.8-51.3,80.2-72,28.4-20.7,58.4-38.2,90-52.4l18,26.2-26.2,18c-45.8,30.6-74.2,61.1-85.1,91.7-9.8,26.2-14.7,58.9-14.7,98.2v27.8c0-1.1,0,1.1,0,6.5s.5,14.2,1.6,26.2l26.2,553.3v13.1c0,46.9,5.4,81.8,16.4,104.8,6.5,15.3,16.9,22.9,31.1,22.9s27.8-8.2,47.5-24.6c1.1-1.1,3.3-3,6.5-5.7,3.3-2.7,5.4-4.6,6.5-5.7l26.2,27.8-185,155.5ZM429,499.7c-40.4,0-77.5,21.8-111.3,65.5l-29.5-14.7c40.4-101.5,100.4-152.2,180.1-152.2s85.7,6,135.9,18l45.8-68.8c-61.1-32.7-131.5-49.1-211.2-49.1s-154.4,28.9-224.3,86.8c-55.7,48-83.5,107.5-83.5,178.4,0,111.3,56.2,206.8,168.6,286.5l222.6-320.9c-36-19.6-67.1-29.5-93.3-29.5ZM296.4,917.1l-63.8,91.7,374.9,158.8,158.8-122.8-6.5-127.7h-463.3ZM681.1,368.7l-304.5,432.2h376.5l-18-389.6c-14.2-14.2-32.2-28.4-54-42.6Z" pathLength={100} />
          <path d="M1224.6,470.2c55.7,31.7,93.8,75.9,114.6,132.6l149-135.9,117.9,145.7-111.3,103.1-96.6-119.5-65.5,57.3v460l80.2,58.9,75.3-58.9,22.9,26.2-198.1,158.8c-66.6-64.4-133.2-103.1-199.7-116.2v-19.6c37.1-20.7,55.7-63.8,55.7-129.3v-330.7c0-43.6-7.6-74.7-22.9-93.3l-16.4-16.4-47.5,39.3-19.6-22.9,162.1-139.1Z" pathLength={100} />
          <path d="M1902.3,1298.5c-93.9-54.6-177.9-88.4-252.1-101.5v-18c33.8-16.4,51.8-53.5,54-111.3v-355.2c0-41.5-18-62.2-54-62.2l-6.5-18c65.5-28.4,124.4-55.9,176.8-82.7,52.4-26.7,99.3-52.6,140.8-77.8l199.7,255.4-296.3,245.5v150.6c58.9,29.5,106.4,54,142.4,73.7l116.2-81.8,16.4,22.9-237.4,160.4ZM2031.6,782.9l-167-214.4v350.3l167-135.9Z" pathLength={100} />
          <path d="M2354.1,470.2c36,31.7,59.5,56.2,70.4,73.7,15.3,25.1,22.9,56.8,22.9,94.9l203-168.6,117.9,117.9,76.9-73.7,22.9,26.2c-6.5,6.5-14.2,14.7-22.9,24.6-8.7,9.8-18.6,21.8-29.5,36-20.7,31.7-31.1,83-31.1,153.9v325.8c0,52.4,13.1,78.6,39.3,78.6s22.4-6,37.7-18v-1.6l13.1-9.8,19.6,31.1-171.9,137.5c-7.6-5.5-16.1-13.1-25.4-22.9-9.3-9.8-19.9-21.8-31.9-36-27.3-38.2-40.9-98.2-40.9-180.1v-410.9l-63.8-65.5-113,93.3v448.5l55.7,58.9-140.8,114.6-139.1-117.9,63.8-58.9v-425.6c0-3.3.5-5.5,1.6-6.5v-31.1c-1.1-37.1-13.1-55.7-36-55.7s-25.7,5.5-40.9,16.4l-19.6-26.2,162.1-122.8Z" pathLength={100} />
          <path d="M2940.8,1143l26.2-27.8c1.1,1.1,3.3,3,6.5,5.7,3.3,2.7,5.5,4.7,6.5,5.7,19.6,16.4,35.5,24.6,47.5,24.6,14.2,0,24.6-7.6,31.1-22.9,10.9-22.9,16.4-57.8,16.4-104.8v-6.5s0-6.5,0-6.5l26.2-553.3c1.1-12,1.6-20.7,1.6-26.2,0-5.4,0-7.6,0-6.5v-27.8c0-39.3-4.9-72-14.7-98.2-10.9-30.5-39.3-61.1-85.1-91.7l-26.2-18,18-26.2c31.7,14.2,61.7,31.7,90,52.4,28.4,20.7,55.1,44.8,80.2,72,8.7-6.5,16.4-12.3,22.9-17.2,6.5-4.9,12.6-9,18-12.3,105.9-67.7,211.7-101.5,317.6-101.5h6.5s8.2,0,8.2,0c102.6,4.4,193.7,44.2,273.4,119.5,79.7,75.3,119.5,163.2,119.5,263.6,0,139.7-69.3,252.7-207.9,338.9l117.9,173.5c8.7,14.2,18,27.8,27.8,40.9,9.8,13.1,19.1,26.8,27.8,40.9,19.6,32.7,29.5,63.8,29.5,93.3,0,3.3-.5,6-1.6,8.2v8.2c-7.6,33.8-25.6,50.8-54,50.8-26.2,0-40.4-10.9-42.6-32.7,0-5.5,1.6-12.3,4.9-20.5,3.3-8.2,7.1-16.4,11.5-24.6,4.4-8.2,8.5-16.1,12.3-23.7,3.8-7.6,5.7-13.1,5.7-16.4,0-8.7-3.8-16.9-11.5-24.6-7.6-7.6-15.8-11.5-24.6-11.5-19.6,0-42.6,4.9-68.8,14.7-77.5,31.7-161,79.7-250.5,144.1l-275-214.4c-1.1,22.9-2.7,43.4-4.9,61.4-2.2,18-4.9,34.1-8.2,48.3-8.7,39.3-39.8,74.2-93.3,104.8l-185-155.5ZM3477.7,522.6l222.6,320.9c112.4-79.7,168.6-175.2,168.6-286.5,0-70.9-27.8-130.4-83.5-178.4-69.8-57.8-144.6-86.8-224.3-86.8-79.7,0-150,16.4-211.2,49.1l45.8,68.8c50.2-12,95.5-18,135.9-18,79.7,0,139.7,50.8,180.1,152.2l-29.5,14.7c-33.8-43.6-70.9-65.5-111.3-65.5-26.2,0-57.3,9.8-93.3,29.5ZM3240.3,910.6l-6.5,127.7,158.8,122.8,374.9-158.8-63.8-91.7h-463.3ZM3264.9,404.7l-18,389.6h376.5s-304.5-432.2-304.5-432.2c-21.8,14.2-39.8,28.4-54,42.6Z" pathLength={100} />
            </g>
          </svg>
        </div>

        {/* Enter — SVG text dual-layer (cream base + white tracer) */}
        <button
          type="button"
          onClick={handleEnter}
          aria-label="Enter the Arena"
          className="lmg-enter-wrap"
        >
          <div className="lmg-enter-halo" />
          <svg className="lmg-enter-svg" viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <text className="lmg-enter-base" x="300" y="170" textAnchor="middle" fontFamily="UnifrakturMaguntia, serif" fontSize={200} fill="none" stroke="#E8DDD3" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" opacity={0.45}>Enter</text>
            <text className="lmg-enter-trace" x="300" y="170" textAnchor="middle" fontFamily="UnifrakturMaguntia, serif" fontSize={200} fill="none" stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">Enter</text>
          </svg>
        </button>

        {/* Tagline visible below wordmark — cream-burgundy breath */}
        <div className="lmg-tagline-visible">
          <svg viewBox="0 0 4000 432.6" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <g className="lmg-towd-trace" fill="none" stroke="#C9A2A2" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M389.3,109.5l-39.1,44.8h56.3l-14.2,16.2h-56.3l-83.7,95.9c1.5.8,3.6,1.8,6.2,2.9,2.6,1.1,5.7,2.5,9.2,4.1l7.6,3.6,27.6-7.8,4.9,5.1-93.9,26.1c-12.1-10.2-32.2-17.1-60.4-20.7l3.7-4.2c17.8-4,31.6-11.6,41.4-22.8l71.7-82.1h-28.8l4.2-4.8,143.7-56.2Z" pathLength={100} />
          <path d="M308.2,279.9l35.5-9.9,122.9-140.7c11.4-13,10.4-22.9-2.9-29.8l9-4.2c12.6,3,24.4,8.1,35.6,15.3,26.6-9.4,57.7-15.4,93.5-18l1.1,3.3c-1.9.6-6.2,1.7-13,3.3-25.7,6.4-44.4,16.3-56.2,29.8l-46.7,53.5,123.6-34,10,5.4c10.3,5.6,14.1,12,11.4,19.2-1.9,5.2-6.5,12-13.8,20.4l-52,59.5c-12.4,14.2-25.9,25.5-40.4,34-17.9,10.2-41,18.8-69.5,25.8-28.4,7.4-76.9,16.4-145.7,27.1l.7-5.4c3.6-.6,8.1-1.4,13.4-2.3,5.3-.9,11.5-2,18.9-3.2,39.2-7,69.2-15,90.1-24,20-8.6,37.4-21.3,52.1-38.2l63.3-72.4c9.3-10.6,8.9-18.3-1.2-23.1l-66.7,18-70.4,80.5,12,10.8-76.4,19.8-38.2-20.7Z" pathLength={100} />
          <path d="M770.3,282.9c-10.1,1.8-18.1,3.3-24.1,4.5-10.9,2.2-21.2,4.4-31.1,6.5-9.9,2.1-18.9,4.3-27.1,6.5-27.8-13.2-62-20.6-102.6-22.2l3.4-3.9c12.6-3.2,21.1-6.8,25.5-10.8,4.7-4.4,8.9-8.4,12.5-12,3.6-3.6,6.7-6.9,9.3-9.9l59.9-68.5c39.1-4.8,77.7-12.9,115.8-24.4,23.6,9.8,52.6,17,87.1,21.6l-93.2,106.7c-13.6,2.2-25.4,4.2-35.4,6ZM682.6,262.7l57.9,13.5,79.5-91.1-57.9-13.5-79.5,91.1Z" pathLength={100} />
          <path d="M953.8,243.2l-49-15.3,46.5-53.2c23.5-2.8,42.9-6.1,58.3-9.9,7.6-2,25-7.4,52.4-16.2,25.9,7.2,51.8,10.8,77.7,10.8s15.6-.7,22.6-2.1c9.6-1.8,15.8-4.3,18.6-7.5,2.3-2.6,2-4.9-.7-6.9-.5,0-.6,0-.4-.3-3-2.2-3.1-4.9-.3-8.1,5.1-5.8,14.1-8.7,27.1-8.7s20.5,4.2,13.1,12.6l-2.4,2.7c-7.5,6-24.4,14.3-50.6,24.9l-86.8,34.9,52.9,17.7-51.2,58.6c-36.9,4.4-74.5,12.1-112.8,23.1-20.8-7.4-42.4-11.1-64.7-11.1s-49.3,3.7-76.8,11.1l-5.8-3.3,132.2-53.8ZM1020.8,224.9l-110.5,45.1,18.6-2.1c2.4-.2,4.6-.4,6.6-.6,2-.2,4.1-.4,6.6-.6h3.4c1.3,0,3.2,0,5.6-.3h12.7c1.8,0,3,0,3.8.3,14.1.2,30.1,3.1,48.1,8.7l35.7-40.9-30.5-9.6ZM1010,220.4l98.6-40c-6.5.8-13.3,1.2-20.5,1.2h-7.4c-4.9,0-9.4-.1-13.4-.4-4-.3-8-.7-12.1-1.1-14.8-2-26.7-4.7-35.8-8.1l-34.9,40,25.5,8.4Z" pathLength={100} />
          <path d="M1210.4,300.3c-29.7-10-58.7-16.2-87-18.6l2.9-3.3c16.5-3,29.8-9.8,40-20.4l2.9-3.3,54.1-61.9c6.7-7.6,2.6-11.4-12.1-11.4l.2-3.3c31.4-5.2,59.9-10.3,85.7-15.2,25.8-4.9,49.1-9.7,70.2-14.3l40.9,46.9-160.8,45.1-24.2,27.6c19.4,5.4,34.9,9.9,46.5,13.5l60.7-15,3,4.2-123,29.5ZM1346.1,205.6l-34-39.4-56.2,64.3,90.2-24.9Z" pathLength={100} />
          <path d="M1885.8,148.2c23.7,8.2,30.9,19.4,21.6,33.7l117.9-33.7,10.8,6c11.3,7,15.8,14.1,13.6,21.3-1.6,5.4-6.6,12.9-15,22.5l-67.7,77.5c-50.7,6.8-91.4,15-122.1,24.6-23.5-9.4-47.8-14.1-72.8-14.1s-48.2,4.7-76.1,14.1c-21.5-13.2-54.8-20.4-99.8-21.6l2.9-3.3c3.9-.4,8.1-1.1,12.6-2.1,12.1-2.6,21.1-7.3,27.1-14.1l54.9-62.8c11.4-13,12.4-22.9,3.2-29.8-4.4-6.2-3.6-12.7,2.3-19.5,7.2-8.2,21.5-15.6,42.9-22.2,3.6-1,10.2-2.8,20-5.3,9.8-2.5,22.8-5.7,39.1-9.5l2.4,4.2-2.8.9c-.6.2-1.2.4-1.7.5-.6.1-1.1.3-1.7.5-22.8,6.6-36.5,12.6-41.2,18-3.7,4.2-2.9,8.9,2.4,14.1,1.1.8,2.3,1.8,3.5,2.9,1.3,1.1,2.9,2.4,4.8,3.8,10.1,9.4,11.7,18.3,4.8,26.7l.3-.3,114-33.1ZM1760.2,277.5l68.5-78.4c6.3-7.2,9.6-12.5,9.9-15.9,0-4-4.2-8-12.3-12l-60.8,17.4-66.2,75.7,60.9,13.2ZM1900.6,275.7l65.9-75.4c9.3-10.6,11.5-18.5,6.6-23.7l-3-2.7c-.8-.6-2.5-1.5-5-2.7l-61.2,17.1-64.8,74.2,61.6,13.2Z" pathLength={100} />
          <path d="M2006.2,279.9l35.5-9.9,122.9-140.7c11.4-13,10.4-22.9-2.9-29.8l9-4.2c12.6,3,24.4,8.1,35.6,15.3,26.6-9.4,57.7-15.4,93.5-18l1.1,3.3c-1.9.6-6.2,1.7-13,3.3-25.7,6.4-44.4,16.3-56.2,29.8l-46.7,53.5,123.6-34,10,5.4c10.3,5.6,14.1,12,11.4,19.2-1.9,5.2-6.5,12-13.8,20.4l-52,59.5c-12.4,14.2-25.9,25.5-40.4,34-17.9,10.2-41,18.8-69.5,25.8-28.4,7.4-76.9,16.4-145.7,27.1l.7-5.4c3.6-.6,8.1-1.4,13.4-2.3,5.3-.9,11.5-2,18.9-3.2,39.2-7,69.2-15,90.1-24,20-8.6,37.4-21.3,52.1-38.2l63.3-72.4c9.3-10.6,8.9-18.3-1.2-23.1l-66.7,18-70.4,80.5,12,10.8-76.4,19.8-38.2-20.7Z" pathLength={100} />
          <path d="M2468.4,282.9c-10.1,1.8-18.1,3.3-24.1,4.5-10.9,2.2-21.2,4.4-31.1,6.5-9.9,2.1-18.9,4.3-27.1,6.5-27.8-13.2-62-20.6-102.6-22.2l3.4-3.9c12.6-3.2,21.1-6.8,25.5-10.8,4.7-4.4,8.9-8.4,12.5-12,3.6-3.6,6.7-6.9,9.3-9.9l59.9-68.5c39.1-4.8,77.7-12.9,115.8-24.4,23.6,9.8,52.6,17,87.1,21.6l-93.2,106.7c-13.6,2.2-25.4,4.2-35.4,6ZM2380.7,262.7l57.9,13.5,79.5-91.1-57.9-13.5-79.5,91.1Z" pathLength={100} />
          <path d="M2948.6,96.2l144,67c13.8-5.6,28.4-9.5,43.8-11.7l-.9,4.8c-13.9,4.6-25.1,11.8-33.6,21.6l-85.8,98.3c-44.1,7-84,15-119.6,24-18.4-7.6-37.9-13.2-58.4-16.8-13.3-2.2-29.5-3.8-48.8-4.8l3.1-3.6c17-4.6,31.4-13.6,43.1-27.1l66.9-76.6c27.2-2,52.2-6,74.9-12l-58.9-28.6,30.2-34.6ZM2950.8,275.7l79.8-91.4-38.6-18c-3.7,1.2-7.1,2.2-10,3-2.9.8-6.9,1.8-12,3l-77.2,88.4,58,15Z" pathLength={100} />
          <path d="M3229.8,300.3c-1.1-.8-2.5-1.6-4.1-2.6-1.7-.9-3.5-2-5.4-3.5-7.9-6.8-8.7-15.4-2.2-25.8l-116.3,31.9c-24.1-11.8-30.5-24.2-19.1-37.3,14.4-16.4,47.2-33.6,98.6-51.4l13.6-4.8-17.2-46.3c-.2.2.4.3,1.8.3h3.4c.3.2.6.3,1.1.3h7.4c32.2,0,63.1-4.2,92.9-12.6.7.2,1.4.4,2.1.6.7.2,1.8.5,3.2.9,26.7,7.8,51.2,11.7,73.6,11.7s21.8-2.2,36-6.6l6.6,2.4c-24.3,10.4-40.8,20.3-49.5,29.8-2.4,2.2-4.6,4.5-6.7,6.9-2.1,2.4-4.4,5-6.8,7.8l-52,59.5-2.1,2.4c-5.9,7.2-3.7,11.1,6.5,11.7,2.7,0,8.7-.8,18.2-2.4l1.9-.6.9-.3c.9,0,2-.2,3.2-.6l3.6,3.6-92.9,24.9ZM3194.2,166l14.5,40.3,53,12.3,31.2-35.8-98.6-16.8ZM3198.4,211.1c-1.3,0-6.2,3-14.6,9-14.1,10-23.8,18-29,24-9.1,10.4-4.8,21.3,13,32.8l56.8-15.9,31.8-36.4-30.2-6.9-27.8-6.6Z" pathLength={100} />
          <path d="M3504.1,148.2c17.7,5.8,26.3,13.9,25.7,24.3l82.8-24.9,24.9,26.8-62.1,18.9-20.4-21.9-36,10.5-73.8,84.5,23.4,10.8,40.3-10.8,5.2,4.8-106.6,29.2c-17-11.8-38-18.9-63.2-21.3l3.1-3.6c18.5-3.8,33-11.7,43.5-23.7l53-60.7c7-8,8.9-13.7,5.6-17.1l-4.1-3-25.8,7.2-4.4-4.2,88.7-25.5Z" pathLength={100} />
          <path d="M3648.9,300.3c-29.7-10-58.7-16.2-87-18.6l2.9-3.3c16.5-3,29.8-9.8,40-20.4l2.9-3.3,54.1-61.9c6.7-7.6,2.6-11.4-12.2-11.4l.2-3.3c31.4-5.2,59.9-10.3,85.7-15.2,25.7-4.9,49.1-9.7,70.1-14.3l40.9,46.9-160.8,45.1-24.2,27.6c19.4,5.4,34.9,9.9,46.5,13.5l60.7-15,3,4.2-123,29.5ZM3784.6,205.6l-34-39.4-56.2,64.3,90.2-24.9Z" pathLength={100} />
            </g>
          </svg>
        </div>

        {/* Top chrome */}
        <div className="lmg-meta-tl">
          <span className="lmg-ldot" aria-hidden="true" />
          <span>Live &middot; Bondi &middot; 0530</span>
        </div>
        <div className="lmg-meta-tr">
          <span className="lmg-meta-lbl">Skip in</span>
          <span className="lmg-meta-val">{countdown}s</span>
        </div>
        <div className="lmg-kicker">A boxing room in Bondi, after dark</div>

        {/* Bottom rail */}
        <div className="lmg-bot-rail">
          <img className="lmg-rail-icon" src="/images/icon/icon-maroon.svg" alt="" />
          <span className="lmg-rail-rule" />
          <span className="lmg-rail-byline">
            EST. MMXXV<span className="lmg-rail-ndash">&middot;</span>BONDI<span className="lmg-rail-ndash">&middot;</span>33&deg;53&prime;S 151&deg;16&prime;E<span className="lmg-rail-ndash">&middot;</span>OPEN 0530&ndash;2100
          </span>
          <span className="lmg-rail-rule" />
          <img className="lmg-rail-icon" src="/images/icon/icon-maroon.svg" alt="" />
        </div>

        {/* Curtain reveal */}
        <div className="lmg-curtain-top" />
        <div className="lmg-curtain-bot" />

        {/* Skip flash on Enter click / countdown end */}
        {skipping && <div className="lmg-skip-flash" />}
      </section>
    </>
  );
}

const CSS = `
.lmg-stage{position:fixed;inset:0;z-index:1000;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#0A0808;background:radial-gradient(ellipse at 50% 50%, #14100E 0%, #0A0808 50%, #000 100%);cursor:crosshair}
.lmg-stage *,.lmg-stage *::before,.lmg-stage *::after{box-sizing:border-box}

@keyframes lmgCurtainTop{0%{transform:translateY(0)}100%{transform:translateY(-100%)}}
@keyframes lmgCurtainBot{0%{transform:translateY(0)}100%{transform:translateY(100%)}}
@keyframes lmgFadeIn{from{opacity:0}to{opacity:var(--final-opacity,1)}}
@keyframes lmgPulse{0%{box-shadow:0 0 0 0 rgba(163,31,31,.7)}70%{box-shadow:0 0 0 10px rgba(163,31,31,0)}100%{box-shadow:0 0 0 0 rgba(163,31,31,0)}}
@keyframes lmgTraceDraw{to{stroke-dashoffset:0}}
@keyframes lmgArenaRun{0%{stroke-dasharray:35 65;stroke-dashoffset:100}100%{stroke-dasharray:35 65;stroke-dashoffset:0}}
@keyframes lmgEnterDraw{to{stroke-dashoffset:0}}
@keyframes lmgEnterRun{0%{stroke-dasharray:300 700;stroke-dashoffset:1000}100%{stroke-dasharray:300 700;stroke-dashoffset:0}}
@keyframes lmgTowdBreath{0%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:18;opacity:0.65}}
@keyframes lmgLogoBreath{0%,100%{opacity:0.30}50%{opacity:0.18}}
@keyframes lmgSkipFlash{0%{opacity:0}50%{opacity:0.85}100%{opacity:0}}

/* Atmosphere */
.lmg-bloom-cnr{position:absolute;left:-200px;top:-200px;width:600px;height:600px;z-index:1;pointer-events:none;background:radial-gradient(ellipse 50% 50% at 50% 50%, rgba(125,30,30,.22) 0%, transparent 65%)}
.lmg-bloom-cnr2{position:absolute;right:-200px;bottom:-200px;width:600px;height:600px;z-index:1;pointer-events:none;background:radial-gradient(ellipse 50% 50% at 50% 50%, rgba(125,30,30,.22) 0%, transparent 65%)}
.lmg-vignette{position:absolute;inset:0;z-index:2;pointer-events:none;background:radial-gradient(ellipse 80% 85% at 50% 50%, transparent 0%, transparent 40%, rgba(0,0,0,.65) 80%, rgba(0,0,0,.95) 100%)}
.lmg-grain{position:absolute;inset:0;z-index:2;pointer-events:none;opacity:.08;mix-blend-mode:overlay;background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}

/* Logo backdrop (hazy) */
.lmg-brand-icon{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2;width:min(108vh,175vw);max-width:none;opacity:0;animation:lmgFadeIn 2.2s ease-out 5.3s forwards, lmgLogoBreath 8s ease-in-out 8s infinite;--final-opacity:0.30}
.lmg-brand-icon svg{width:100%;height:auto;display:block;filter:blur(2px) drop-shadow(0 0 14px rgba(255,255,255,0.20)) drop-shadow(0 0 36px rgba(0,0,0,0.55))}

/* ARENA wordmark */
.lmg-arena{position:relative;width:96vw;z-index:4;opacity:0;animation:lmgFadeIn 1.2s ease-out 2.6s forwards;--final-opacity:1}
.lmg-arena svg{width:100%;height:auto;display:block;filter:drop-shadow(0 1px 0 rgba(255,255,255,.18)) drop-shadow(0 2px 0 rgba(125,30,30,.4)) drop-shadow(0 12px 36px rgba(0,0,0,.75)) drop-shadow(0 0 80px rgba(163,31,31,.18))}
.lmg-arena-fill{opacity:0;display:none}
.lmg-arena-trace path{stroke-dasharray:100;stroke-dashoffset:100;filter:drop-shadow(0 0 4px rgba(163,31,31,0.85)) drop-shadow(0 0 14px rgba(163,31,31,0.55)) drop-shadow(0 0 30px rgba(125,30,30,0.4));animation:lmgTraceDraw 3.5s cubic-bezier(.65,.05,.35,1) 2.6s forwards, lmgArenaRun 3s linear 6.5s infinite}

/* Tagline visible below */
.lmg-tagline-visible{position:absolute;left:50%;bottom:11vh;transform:translateX(-50%);width:min(380px,42vw);z-index:8;pointer-events:none;opacity:0;animation:lmgFadeIn 1.4s ease-out 5.6s forwards;--final-opacity:1}
.lmg-tagline-visible svg{width:100%;height:auto;display:block;filter:drop-shadow(0 2px 8px rgba(0,0,0,.7)) drop-shadow(0 0 14px rgba(201,162,162,0.5)) drop-shadow(0 0 24px rgba(125,30,30,0.35))}
.lmg-towd-trace path{stroke-dasharray:100;stroke-dashoffset:100;animation:lmgTraceDraw 2.5s cubic-bezier(.65,.05,.35,1) 5.6s forwards, lmgTowdBreath 6s ease-in-out 8.2s infinite alternate}

/* Enter */
.lmg-enter-wrap{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:10;background:none;border:0;padding:0;cursor:pointer;opacity:0;animation:lmgFadeIn 1.2s ease-out 2.6s forwards;--final-opacity:1}
.lmg-enter-halo{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:48vw;height:48vw;max-width:620px;max-height:620px;background:radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,0,0,.40) 0%, rgba(0,0,0,.20) 35%, transparent 65%);pointer-events:none}
.lmg-enter-svg{position:relative;width:clamp(26rem,46vw,54rem);height:auto;display:block;filter:drop-shadow(0 1px 0 rgba(255,255,255,.25)) drop-shadow(0 2px 0 rgba(125,30,30,.5)) drop-shadow(0 14px 44px rgba(0,0,0,.85)) drop-shadow(0 0 60px rgba(255,255,255,.15)) drop-shadow(0 0 120px rgba(163,31,31,.30))}
.lmg-enter-trace{stroke-dasharray:1000;stroke-dashoffset:1000;filter:drop-shadow(0 0 4px rgba(255,255,255,0.85)) drop-shadow(0 0 14px rgba(255,255,255,0.45)) drop-shadow(0 0 30px rgba(125,30,30,0.3));animation:lmgEnterDraw 3.5s cubic-bezier(.65,.05,.35,1) 2.6s forwards, lmgEnterRun 9s linear 6.5s infinite}

/* Top chrome */
.lmg-meta-tl{position:absolute;top:24px;left:24px;z-index:20;display:flex;align-items:center;gap:12px;font-family:var(--font-barlow), 'Barlow Semi Condensed', sans-serif;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:rgba(232,221,211,.55);opacity:0;animation:lmgFadeIn .8s ease-out 2.6s forwards;--final-opacity:1}
.lmg-ldot{width:7px;height:7px;border-radius:50%;background:#A31F1F;box-shadow:0 0 0 0 rgba(163,31,31,.7);animation:lmgPulse 1.8s ease-out 3s infinite}
.lmg-meta-tr{position:absolute;top:24px;right:24px;z-index:20;display:flex;align-items:baseline;gap:8px;font-family:var(--font-barlow), 'Barlow Semi Condensed', sans-serif;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:rgba(232,221,211,.55);opacity:0;animation:lmgFadeIn .8s ease-out 2.8s forwards;--final-opacity:1}
.lmg-meta-lbl{font-size:10px;color:rgba(232,221,211,.40)}
.lmg-meta-val{font-size:14px;font-weight:500;color:rgba(232,221,211,.78);font-variant-numeric:tabular-nums}
.lmg-kicker{position:absolute;top:80px;left:0;right:0;text-align:center;z-index:20;font-family:var(--font-cormorant), 'Cormorant Garamond', serif;font-style:italic;font-weight:500;font-size:17px;color:rgba(232,221,211,.55);letter-spacing:.02em;opacity:0;animation:lmgFadeIn 1s ease-out 5.0s forwards;--final-opacity:1}

/* Bottom rail */
.lmg-bot-rail{position:absolute;left:0;right:0;bottom:0;z-index:20;padding:18px 32px 22px;display:flex;align-items:center;justify-content:center;gap:18px;opacity:0;animation:lmgFadeIn 1s ease-out 6.0s forwards;--final-opacity:1}
.lmg-rail-icon{width:28px;height:auto;opacity:.85;filter:drop-shadow(0 1px 0 rgba(255,255,255,.15)) drop-shadow(0 2px 8px rgba(0,0,0,.6))}
.lmg-rail-rule{flex:0 0 80px;height:1px;background:linear-gradient(90deg, transparent, rgba(232,221,211,.45), transparent)}
.lmg-rail-byline{font-family:var(--font-barlow), 'Barlow Semi Condensed', sans-serif;font-size:11px;letter-spacing:.36em;text-transform:uppercase;color:rgba(232,221,211,.55);font-weight:600;text-align:center}
.lmg-rail-ndash{display:inline-block;margin:0 .35em;color:rgba(232,221,211,.30)}

/* Curtain */
.lmg-curtain-top,.lmg-curtain-bot{position:absolute;left:0;right:0;height:50%;background:#000;z-index:90;pointer-events:none}
.lmg-curtain-top{top:0;animation:lmgCurtainTop 2.4s cubic-bezier(.55,.05,.25,1) forwards}
.lmg-curtain-bot{bottom:0;animation:lmgCurtainBot 2.4s cubic-bezier(.55,.05,.25,1) forwards}

/* Skip flash on enter/end */
.lmg-skip-flash{position:absolute;inset:0;z-index:95;background:#A31F1F;pointer-events:none;animation:lmgSkipFlash 0.6s ease-out forwards}

/* Reduced motion */
@media (prefers-reduced-motion: reduce){
  .lmg-curtain-top,.lmg-curtain-bot,.lmg-brand-icon,.lmg-arena-trace path,.lmg-towd-trace path,.lmg-enter-trace,.lmg-ldot,.lmg-arena,.lmg-tagline-visible,.lmg-enter-wrap,.lmg-meta-tl,.lmg-meta-tr,.lmg-kicker,.lmg-bot-rail{animation:none !important;opacity:1 !important;transform:translate(-50%,-50%) !important}
  .lmg-arena-trace path{stroke-dasharray:none !important}
  .lmg-towd-trace path{stroke-dasharray:none !important}
  .lmg-enter-trace{stroke-dasharray:none !important}
  .lmg-curtain-top,.lmg-curtain-bot{display:none}
}
`;
