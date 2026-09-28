// PlantHub — Global Analytics & Funnel Tracker Component
// Tracks SPA pageviews, scroll depth milestones, user clicks, and mounts the in-app heatmap visualizer

import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router';
import { initAllAnalytics, trackPageView, gaEvent } from '../../services/analytics';
import HeatmapOverlay from './HeatmapOverlay';
import { Flame } from 'lucide-react';

export default function AnalyticsTracker() {
  const location = useLocation();
  const [showHeatmap, setShowHeatmap] = useState(false);
  const scrollMilestones = useRef({ 25: false, 50: false, 75: false, 90: false });

  // Initialize analytics scripts (GA4, Meta Pixel, Clarity, Heatmap listener)
  useEffect(() => {
    initAllAnalytics();

    // Listen to custom toggle events from Admin Dashboard or shortcuts
    const handleToggle = () => setShowHeatmap((prev) => !prev);
    window.addEventListener('toggle_planthub_heatmap', handleToggle);

    // Keyboard shortcut: Ctrl + Shift + H (or Cmd + Shift + H)
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        setShowHeatmap((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('toggle_planthub_heatmap', handleToggle);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Track page views on route change
  useEffect(() => {
    trackPageView(location.pathname + location.search);
    scrollMilestones.current = { 25: false, 50: false, 75: false, 90: false };
  }, [location.pathname, location.search]);

  // Track scroll depth milestones (25%, 50%, 75%, 90%)
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

      [25, 50, 75, 90].forEach((milestone) => {
        if (scrollPercent >= milestone && !scrollMilestones.current[milestone]) {
          scrollMilestones.current[milestone] = true;
          gaEvent('scroll', {
            percent_scrolled: milestone,
            page_path: location.pathname,
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <>
      {showHeatmap && <HeatmapOverlay onClose={() => setShowHeatmap(false)} />}

      {/* Floating Heatmap Toggle Chip */}
      <button
        onClick={() => setShowHeatmap((prev) => !prev)}
        style={{
          position: 'fixed',
          bottom: '88px',
          right: '18px',
          zIndex: 9998,
          background: showHeatmap ? '#ef4444' : 'rgba(15, 23, 42, 0.85)',
          color: '#ffffff',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          backdropFilter: 'blur(8px)',
          borderRadius: '24px',
          padding: '6px 14px',
          fontSize: '0.75rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
          transition: 'all 0.2s ease',
        }}
        title="Toggle Heatmap Visualizer (Shortcut: Ctrl + Shift + H)"
      >
        <Flame size={14} color={showHeatmap ? '#fff' : '#4ade80'} />
        {showHeatmap ? 'Hide Heatmap' : 'Heatmap'}
      </button>
    </>
  );
}
