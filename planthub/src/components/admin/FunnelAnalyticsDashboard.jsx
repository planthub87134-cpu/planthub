// PlantHub — Conversion Funnel & Analytics Tracking Dashboard
// Displays Live Funnel Stages, Real-time Event Stream, GA4/Meta Pixel/Clarity Settings & Heatmap Controls

import React, { useState, useEffect } from 'react';
import {
  getFunnelStats,
  resetFunnelStats,
  recordFunnelStep,
  getTrackingConfig,
  updateTrackingConfig,
  subscribeLiveEvents,
} from '../../services/analytics';
import { formatCurrency } from '../../utils/formatters';
import {
  TrendingUp,
  Activity,
  Flame,
  ShieldCheck,
  Eye,
  ShoppingCart,
  CreditCard,
  CheckCircle2,
  RefreshCw,
  Save,
  Radio,
  ExternalLink,
} from 'lucide-react';

export default function FunnelAnalyticsDashboard() {
  const [funnel, setFunnel] = useState(getFunnelStats());
  const [config, setConfig] = useState(getTrackingConfig());
  const [saveStatus, setSaveStatus] = useState('');
  const [liveEvents, setLiveEvents] = useState(() => {
    return (typeof window !== 'undefined' && window.__PLTHUB_LIVE_EVENTS) || [];
  });

  useEffect(() => {
    const unsubscribe = subscribeLiveEvents((newEvent) => {
      setLiveEvents((prev) => [newEvent, ...prev.slice(0, 39)]);
      setFunnel(getFunnelStats());
    });
    return unsubscribe;
  }, []);

  const handleSaveConfig = (e) => {
    e.preventDefault();
    updateTrackingConfig(config);
    setSaveStatus('Tracking configuration saved successfully! ✅');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleResetFunnel = () => {
    if (window.confirm('Are you sure you want to reset the conversion funnel counters?')) {
      const reset = resetFunnelStats();
      setFunnel(reset);
    }
  };

  const handleSimulatePurchase = () => {
    recordFunnelStep('purchase', {
      orderId: `SIM-${Math.floor(Math.random() * 10000)}`,
      value: 1299,
      simulated: true,
    });
    setFunnel(getFunnelStats());
  };

  const triggerHeatmap = () => {
    window.dispatchEvent(new CustomEvent('toggle_planthub_heatmap'));
  };

  // Funnel calculations
  const topTotal = Math.max(funnel.browse, 1);
  const stages = [
    {
      id: 'browse',
      name: '1. Store Visits & Browse',
      desc: 'Users visiting Home or Shop catalog',
      icon: <Eye size={18} color="#3b82f6" />,
      color: '#3b82f6',
      count: funnel.browse,
      overallPct: 100,
      dropoff: funnel.browse > 0 ? Math.round(((funnel.browse - funnel.view_product) / funnel.browse) * 100) : 0,
    },
    {
      id: 'view_product',
      name: '2. Product Detail Views',
      desc: 'Users viewing specific plant pages & zoom',
      icon: <Activity size={18} color="#10b981" />,
      color: '#10b981',
      count: funnel.view_product,
      overallPct: Math.round((funnel.view_product / topTotal) * 100),
      dropoff: funnel.view_product > 0 ? Math.round(((funnel.view_product - funnel.add_to_cart) / funnel.view_product) * 100) : 0,
    },
    {
      id: 'add_to_cart',
      name: '3. Add to Cart',
      desc: 'Users adding plants & pots to cart',
      icon: <ShoppingCart size={18} color="#f59e0b" />,
      color: '#f59e0b',
      count: funnel.add_to_cart,
      overallPct: Math.round((funnel.add_to_cart / topTotal) * 100),
      dropoff: funnel.add_to_cart > 0 ? Math.round(((funnel.add_to_cart - funnel.begin_checkout) / funnel.add_to_cart) * 100) : 0,
    },
    {
      id: 'begin_checkout',
      name: '4. Initiate Checkout',
      desc: 'Users entering delivery address & details',
      icon: <CreditCard size={18} color="#8b5cf6" />,
      color: '#8b5cf6',
      count: funnel.begin_checkout,
      overallPct: Math.round((funnel.begin_checkout / topTotal) * 100),
      dropoff: funnel.begin_checkout > 0 ? Math.round(((funnel.begin_checkout - funnel.purchase) / funnel.begin_checkout) * 100) : 0,
    },
    {
      id: 'purchase',
      name: '5. Completed Purchase',
      desc: 'Successful orders & payment completed',
      icon: <CheckCircle2 size={18} color="#16a34a" />,
      color: '#16a34a',
      count: funnel.purchase,
      overallPct: Math.round((funnel.purchase / topTotal) * 100),
      dropoff: 0,
    },
  ];

  const overallConversionRate = ((funnel.purchase / topTotal) * 100).toFixed(1);
  const avgOrderValue = funnel.purchase > 0 ? Math.round(funnel.total_revenue / funnel.purchase) : 0;

  return (
    <div className="funnel-analytics-dashboard" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner & Quick Metrics */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, rgba(22, 101, 52, 0.12) 0%, rgba(15, 23, 42, 0.04) 100%)',
          border: '1px solid rgba(34, 197, 94, 0.25)',
          padding: '24px',
          borderRadius: '16px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.4rem' }}>🎯</span>
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700 }}>
                Conversion Funnel & Analytics Tracking Center
              </h2>
            </div>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Real-time multi-platform tracking active with Google Analytics 4, Meta Pixel (Facebook), Microsoft Clarity, and In-App Heatmaps.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={triggerHeatmap}
              className="btn btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderColor: '#22c55e',
                color: '#16a34a',
                fontWeight: 600,
              }}
            >
              <Flame size={16} color="#ef4444" /> Open Live Heatmap
            </button>
            <button
              onClick={handleSimulatePurchase}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <TrendingUp size={16} /> Simulate Test Purchase
            </button>
          </div>
        </div>

        {/* Status Badges */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '20px',
              background: 'rgba(34, 197, 94, 0.15)',
              color: '#16a34a',
              fontSize: '0.8rem',
              fontWeight: 600,
              border: '1px solid rgba(34, 197, 94, 0.3)',
            }}
          >
            <Radio size={14} className="animate-pulse" /> Google Analytics 4: Active ({config.gaId})
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '20px',
              background: 'rgba(59, 130, 246, 0.15)',
              color: '#2563eb',
              fontSize: '0.8rem',
              fontWeight: 600,
              border: '1px solid rgba(59, 130, 246, 0.3)',
            }}
          >
            <Radio size={14} className="animate-pulse" /> Meta Pixel: Active ({config.fbPixelId})
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '20px',
              background: 'rgba(245, 158, 11, 0.15)',
              color: '#d97706',
              fontSize: '0.8rem',
              fontWeight: 600,
              border: '1px solid rgba(245, 158, 11, 0.3)',
            }}
          >
            <Radio size={14} className="animate-pulse" /> Clarity & Heatmap: Active
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="card" style={{ padding: '20px' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Overall Funnel Conversion</span>
          <h3 style={{ fontSize: '2rem', margin: '8px 0 4px 0', color: 'var(--primary-color)' }}>
            {overallConversionRate}%
          </h3>
          <span style={{ color: '#16a34a', fontSize: '0.8rem', fontWeight: 600 }}>Visitors to Final Purchase</span>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Total Funnel Revenue</span>
          <h3 style={{ fontSize: '2rem', margin: '8px 0 4px 0', color: '#16a34a' }}>
            {formatCurrency(funnel.total_revenue)}
          </h3>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>From tracked checkout purchases</span>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Average Order Value (AOV)</span>
          <h3 style={{ fontSize: '2rem', margin: '8px 0 4px 0', color: '#2563eb' }}>
            {formatCurrency(avgOrderValue)}
          </h3>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Per completed checkout</span>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Add to Cart Conversion</span>
          <h3 style={{ fontSize: '2rem', margin: '8px 0 4px 0', color: '#d97706' }}>
            {((funnel.add_to_cart / topTotal) * 100).toFixed(1)}%
          </h3>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{funnel.add_to_cart} cart items added</span>
        </div>
      </div>

      {/* Funnel Pipeline Visualizer */}
      <div className="card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Conversion Funnel Stages</h3>
            <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Tracks customer movement from browsing plants to completed order payments.
            </p>
          </div>
          <button
            onClick={handleResetFunnel}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            <RefreshCw size={14} style={{ marginRight: '6px' }} /> Reset Funnel Data
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {stages.map((stage, idx) => (
            <div
              key={stage.id}
              style={{
                background: 'var(--bg-secondary, #f8fafc)',
                padding: '16px 20px',
                borderRadius: '12px',
                border: '1px solid var(--border-light, #e2e8f0)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    }}
                  >
                    {stage.icon}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>{stage.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{stage.desc}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {stage.count.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: stage.color, fontWeight: 600 }}>
                    {stage.overallPct}% of visitors
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div
                style={{
                  height: '10px',
                  borderRadius: '6px',
                  background: 'rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                  marginTop: '8px',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${stage.overallPct}%`,
                    background: `linear-gradient(90deg, ${stage.color}aa, ${stage.color})`,
                    borderRadius: '6px',
                    transition: 'width 0.8s ease',
                  }}
                />
              </div>

              {/* Drop-off notice if not last */}
              {idx < stages.length - 1 && (
                <div
                  style={{
                    marginTop: '8px',
                    fontSize: '0.75rem',
                    color: '#ef4444',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '4px',
                  }}
                >
                  <span>Drop-off to next step:</span>
                  <span style={{ fontWeight: 600 }}>{stage.dropoff}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Live Event Stream & Tracking Credentials Configuration */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Live Event Stream */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color="#10b981" /> Live Event Stream (Real-Time)
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>● Listening</span>
          </div>

          <div
            style={{
              maxHeight: '380px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              paddingRight: '4px',
            }}
          >
            {liveEvents.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                No events recorded yet. Navigate pages or click products to see events fire live.
              </div>
            ) : (
              liveEvents.map((ev) => (
                <div
                  key={ev.id}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary, #f8fafc)',
                    border: '1px solid var(--border-light, #e2e8f0)',
                    fontSize: '0.8rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        background:
                          ev.source === 'GA4'
                            ? '#dcfce7'
                            : ev.source === 'Meta Pixel'
                            ? '#dbeafe'
                            : ev.source === 'Heatmap'
                            ? '#ffedd5'
                            : '#f3e8ff',
                        color:
                          ev.source === 'GA4'
                            ? '#166534'
                            : ev.source === 'Meta Pixel'
                            ? '#1e40af'
                            : ev.source === 'Heatmap'
                            ? '#9a3412'
                            : '#6b21a8',
                      }}
                    >
                      {ev.source}
                    </span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>{ev.time}</span>
                  </div>

                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>
                    {ev.eventName}
                  </div>

                  {ev.payload && (
                    <div
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.75rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {JSON.stringify(ev.payload)}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tracking Configuration */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="#16a34a" /> Tracking Credentials & IDs
          </h3>
          <p style={{ margin: '0 0 16px 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Enter your live production IDs below. These take effect immediately without requiring a code rebuild.
          </p>

          <form onSubmit={handleSaveConfig} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Google Analytics 4 Measurement ID
              </label>
              <input
                type="text"
                className="input"
                placeholder="G-XXXXXXXXXX"
                value={config.gaId}
                onChange={(e) => setConfig({ ...config, gaId: e.target.value })}
                required
                style={{ width: '100%', fontFamily: 'monospace' }}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Found in Google Analytics Admin &gt; Data Streams &gt; Measurement ID
              </span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Meta Pixel ID (Facebook Pixel)
              </label>
              <input
                type="text"
                className="input"
                placeholder="104829104829104"
                value={config.fbPixelId}
                onChange={(e) => setConfig({ ...config, fbPixelId: e.target.value })}
                required
                style={{ width: '100%', fontFamily: 'monospace' }}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Found in Meta Events Manager &gt; Data Sources &gt; Pixel ID
              </span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Microsoft Clarity ID (Heatmaps & Session Replays)
              </label>
              <input
                type="text"
                className="input"
                placeholder="clarity_project_id"
                value={config.clarityId}
                onChange={(e) => setConfig({ ...config, clarityId: e.target.value })}
                required
                style={{ width: '100%', fontFamily: 'monospace' }}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Found in Microsoft Clarity Settings &gt; Overview &gt; Project ID
              </span>
            </div>

            {saveStatus && (
              <div
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  background: 'rgba(34, 197, 94, 0.15)',
                  color: '#16a34a',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                {saveStatus}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Save size={16} /> Save & Apply Tracking IDs
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
