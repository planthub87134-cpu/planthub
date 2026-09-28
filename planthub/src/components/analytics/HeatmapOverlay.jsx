// PlantHub — In-App Heatmap Visualizer Overlay
// Renders visual thermal heat spots, click concentration, and scroll depth on live pages

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { getHeatmapClicks, clearHeatmapClicks } from '../../services/analytics';
import { Flame, X, RefreshCw, Eye, EyeOff } from 'lucide-react';

export default function HeatmapOverlay({ onClose }) {
  const location = useLocation();
  const [clicks, setClicks] = useState([]);
  const [mode, setMode] = useState('thermal'); // 'thermal' | 'dots'
  const [showStats, setShowStats] = useState(true);

  const loadClicks = () => {
    const pageClicks = getHeatmapClicks(location.pathname);
    setClicks(pageClicks);
  };

  useEffect(() => {
    loadClicks();
    const interval = setInterval(loadClicks, 2000);
    return () => clearInterval(interval);
  }, [location.pathname]);

  const handleClear = () => {
    clearHeatmapClicks();
    setClicks([]);
  };

  // Group nearby clicks for thermal clustering
  const clusteredClicks = clicks.reduce((acc, c) => {
    // Cluster clicks within ~25px
    const found = acc.find(
      (item) => Math.abs(item.x - c.x) < 30 && Math.abs(item.y - c.y) < 30
    );
    if (found) {
      found.intensity = (found.intensity || 1) + 1;
    } else {
      acc.push({ ...c, intensity: 1 });
    }
    return acc;
  }, []);

  return (
    <div
      className="heatmap-overlay-root"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        minHeight: '100%',
        pointerEvents: 'none',
        zIndex: 99999,
        overflow: 'hidden',
      }}
    >
      {/* Floating Control Toolbar (Pointer events enabled for UI) */}
      <aside
        aria-label="Heatmap Visualizer Controls"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'rgba(15, 23, 42, 0.94)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(34, 197, 94, 0.4)',
          borderRadius: '16px',
          padding: '16px 20px',
          color: '#ffffff',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 25px rgba(34, 197, 94, 0.3)',
          pointerEvents: 'auto',
          zIndex: 100000,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          minWidth: '290px',
          fontSize: '0.85rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', color: '#4ade80' }}>
            <Flame size={18} /> Live Heatmap View
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '6px',
              display: 'flex',
            }}
            title="Close Heatmap"
          >
            <X size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
          <span>Current Path:</span>
          <span style={{ color: '#86efac', fontWeight: 600 }}>{location.pathname}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
          <span>Page Clicks Recorded:</span>
          <span style={{ color: '#fbbf24', fontWeight: 700 }}>{clicks.length} clicks</span>
        </div>

        {/* Mode Selector */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setMode('thermal')}
            style={{
              flex: 1,
              padding: '6px 10px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              background: mode === 'thermal' ? '#16a34a' : 'rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: '0.78rem',
              fontWeight: 600,
            }}
          >
            🔥 Thermal Glow
          </button>
          <button
            onClick={() => setMode('dots')}
            style={{
              flex: 1,
              padding: '6px 10px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              background: mode === 'dots' ? '#16a34a' : 'rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: '0.78rem',
              fontWeight: 600,
            }}
          >
            📍 Click Dots
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', paddingTop: '4px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={loadClicks}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              borderRadius: '8px',
              padding: '6px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
            }}
          >
            <RefreshCw size={12} /> Refresh
          </button>
          <button
            onClick={handleClear}
            style={{
              flex: 1,
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#fca5a5',
              borderRadius: '8px',
              padding: '6px',
              cursor: 'pointer',
              fontSize: '0.75rem',
            }}
          >
            Clear Clicks
          </button>
        </div>

        <div style={{ fontSize: '0.7rem', color: '#94a3b8', textAlign: 'center' }}>
          💡 Click anywhere on the page to watch new heat spots form!
        </div>
      </aside>

      {/* Render Heat Spots on Page */}
      {clusteredClicks.map((item, index) => {
        const radius = Math.min(25 + item.intensity * 8, 70);
        const opacity = Math.min(0.45 + item.intensity * 0.12, 0.92);

        if (mode === 'thermal') {
          return (
            <div
              key={`${item.x}-${item.y}-${index}`}
              style={{
                position: 'absolute',
                left: `${item.x}px`,
                top: `${item.y}px`,
                transform: 'translate(-50%, -50%)',
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(239, 68, 68, ${opacity}) 0%, rgba(245, 158, 11, ${opacity * 0.75}) 40%, rgba(59, 130, 246, ${opacity * 0.4}) 70%, rgba(16, 185, 129, 0) 100%)`,
                filter: 'blur(8px)',
                mixBlendMode: 'screen',
                pointerEvents: 'none',
              }}
            />
          );
        }

        return (
          <div
            key={`${item.x}-${item.y}-${index}`}
            style={{
              position: 'absolute',
              left: `${item.x}px`,
              top: `${item.y}px`,
              transform: 'translate(-50%, -50%)',
              width: `${Math.min(12 + item.intensity * 3, 28)}px`,
              height: `${Math.min(12 + item.intensity * 3, 28)}px`,
              borderRadius: '50%',
              background: item.intensity > 2 ? '#ef4444' : '#f59e0b',
              border: '2px solid #ffffff',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '10px',
              fontWeight: 'bold',
              pointerEvents: 'none',
            }}
          >
            {item.intensity > 1 ? item.intensity : ''}
          </div>
        );
      })}
    </div>
  );
}
