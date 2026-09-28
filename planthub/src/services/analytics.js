// PlantHub — Unified Analytics, Tracking, Heatmap & Conversion Funnel Engine
// Integrations: Google Analytics 4 (GA4), Meta Pixel (Facebook Pixel), Microsoft Clarity (Heatmaps), In-App Heatmap Visualizer

const DEFAULT_CONFIG = {
  gaId: import.meta.env.VITE_GA_MEASUREMENT_ID || localStorage.getItem('planthub_ga_id') || 'G-PLTHB87134',
  fbPixelId: import.meta.env.VITE_FB_PIXEL_ID || localStorage.getItem('planthub_fb_pixel_id') || '104829104829104',
  clarityId: import.meta.env.VITE_CLARITY_ID || localStorage.getItem('planthub_clarity_id') || 'clarity_ph_demo',
  debugMode: true,
};

// Event bus for live dashboard event logs
const liveListeners = new Set();
export const subscribeLiveEvents = (fn) => {
  liveListeners.add(fn);
  return () => liveListeners.delete(fn);
};

const notifyLiveEvent = (source, eventName, payload) => {
  const eventItem = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    time: new Date().toLocaleTimeString(),
    source, // 'GA4' | 'Meta Pixel' | 'Clarity' | 'Funnel' | 'Heatmap'
    eventName,
    payload,
  };

  // Keep last 40 events in memory
  if (typeof window !== 'undefined') {
    window.__PLTHUB_LIVE_EVENTS = window.__PLTHUB_LIVE_EVENTS || [];
    window.__PLTHUB_LIVE_EVENTS.unshift(eventItem);
    if (window.__PLTHUB_LIVE_EVENTS.length > 50) window.__PLTHUB_LIVE_EVENTS.pop();
  }

  liveListeners.forEach((listener) => {
    try {
      listener(eventItem);
    } catch (e) {
      console.warn('Listener error:', e);
    }
  });

  if (DEFAULT_CONFIG.debugMode) {
    console.log(`[📊 Analytics - ${source}]`, eventName, payload);
  }
};

// -------------------------------------------------------------
// 1. Google Analytics 4 (GA4) Integration
// -------------------------------------------------------------
export const initGA4 = (measurementId = DEFAULT_CONFIG.gaId) => {
  if (typeof window === 'undefined' || !measurementId) return;

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  // Avoid duplicate script insertion
  if (!document.getElementById('ga4-script')) {
    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: false, // Handled manually by SPA router
    cookie_flags: 'SameSite=None;Secure',
  });

  notifyLiveEvent('GA4', 'initialized', { measurementId });
};

export const gaEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
  notifyLiveEvent('GA4', eventName, params);
};

// -------------------------------------------------------------
// 2. Meta Pixel (Facebook Pixel) Integration
// -------------------------------------------------------------
export const initMetaPixel = (pixelId = DEFAULT_CONFIG.fbPixelId) => {
  if (typeof window === 'undefined' || !pixelId) return;

  if (!window.fbq) {
    /* eslint-disable */
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
  }

  if (window.fbq) {
    try {
      window.fbq('init', pixelId);
      notifyLiveEvent('Meta Pixel', 'initialized', { pixelId });
    } catch (e) {
      console.warn('Meta Pixel Init Error:', e);
    }
  }
};

export const fbqTrack = (eventName, params = {}, isCustom = false) => {
  if (typeof window !== 'undefined' && window.fbq) {
    try {
      if (isCustom) {
        window.fbq('trackCustom', eventName, params);
      } else {
        window.fbq('track', eventName, params);
      }
    } catch (e) {
      console.warn('fbq error:', e);
    }
  }
  notifyLiveEvent('Meta Pixel', eventName, params);
};

// -------------------------------------------------------------
// 3. Microsoft Clarity (Heatmaps & Session Recording)
// -------------------------------------------------------------
export const initClarity = (clarityId = DEFAULT_CONFIG.clarityId) => {
  if (typeof window === 'undefined' || !clarityId) return;

  if (!window.clarity && !document.getElementById('clarity-script')) {
    /* eslint-disable */
    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.id = 'clarity-script';
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', clarityId);
    /* eslint-enable */

    notifyLiveEvent('Clarity', 'heatmap_script_initialized', { clarityId });
  }
};

// -------------------------------------------------------------
// 4. In-App Visual Heatmap Engine (Click Heatmap & Scroll Map)
// -------------------------------------------------------------
const HEATMAP_STORAGE_KEY = 'planthub_heatmap_clicks';

export const recordHeatmapClick = (e) => {
  if (typeof window === 'undefined') return;
  try {
    const xPct = Math.round((e.clientX / window.innerWidth) * 100);
    const yPct = Math.round(((e.clientY + window.scrollY) / Math.max(document.body.scrollHeight, 1)) * 100);
    const targetTag = e.target.tagName?.toLowerCase() || 'div';
    const targetText = (e.target.innerText || e.target.alt || e.target.ariaLabel || '').slice(0, 30).trim();
    const path = window.location.pathname;

    const clickData = {
      x: e.clientX,
      y: e.clientY + window.scrollY,
      xPct,
      yPct,
      tag: targetTag,
      text: targetText,
      path,
      time: Date.now(),
    };

    // Store in localStorage (keep max 200 clicks)
    const stored = JSON.parse(localStorage.getItem(HEATMAP_STORAGE_KEY) || '[]');
    stored.push(clickData);
    if (stored.length > 250) stored.shift();
    localStorage.setItem(HEATMAP_STORAGE_KEY, JSON.stringify(stored));

    notifyLiveEvent('Heatmap', 'user_click_recorded', {
      element: `<${targetTag}> ${targetText}`,
      pos: `${xPct}% x ${yPct}%`,
      path,
    });
  } catch (err) {
    // Ignore click tracking failure
  }
};

export const getHeatmapClicks = (pathFilter = null) => {
  if (typeof window === 'undefined') return [];
  try {
    const all = JSON.parse(localStorage.getItem(HEATMAP_STORAGE_KEY) || '[]');
    if (!pathFilter) return all;
    return all.filter((c) => c.path === pathFilter);
  } catch {
    return [];
  }
};

export const clearHeatmapClicks = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(HEATMAP_STORAGE_KEY);
  }
};

// -------------------------------------------------------------
// 5. Conversion Funnel Tracker
// -------------------------------------------------------------
// Stages:
// 1: BROWSE (Shop / Home)
// 2: VIEW_ITEM (Product Detail)
// 3: ADD_TO_CART (Added to Bag)
// 4: BEGIN_CHECKOUT (Proceeded to Checkout)
// 5: PURCHASE (Successful Payment)

const FUNNEL_STORAGE_KEY = 'planthub_funnel_stats_v1';

export const getFunnelStats = () => {
  if (typeof window === 'undefined') {
    return {
      browse: 120,
      view_product: 84,
      add_to_cart: 48,
      begin_checkout: 26,
      purchase: 18,
      total_revenue: 34500,
      lastUpdated: new Date().toISOString(),
    };
  }

  try {
    const data = localStorage.getItem(FUNNEL_STORAGE_KEY);
    if (data) return JSON.parse(data);

    // Initial realistic baseline for demonstration & immediate visualization
    const baseline = {
      browse: 142,
      view_product: 98,
      add_to_cart: 56,
      begin_checkout: 31,
      purchase: 22,
      total_revenue: 42960,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(FUNNEL_STORAGE_KEY, JSON.stringify(baseline));
    return baseline;
  } catch {
    return { browse: 0, view_product: 0, add_to_cart: 0, begin_checkout: 0, purchase: 0, total_revenue: 0 };
  }
};

export const recordFunnelStep = (step, data = {}) => {
  const current = getFunnelStats();
  if (step in current) {
    current[step] = (current[step] || 0) + 1;
    if (step === 'purchase' && data.value) {
      current.total_revenue = (current.total_revenue || 0) + Number(data.value);
    }
    current.lastUpdated = new Date().toISOString();
    try {
      localStorage.setItem(FUNNEL_STORAGE_KEY, JSON.stringify(current));
    } catch {}
  }
  notifyLiveEvent('Funnel', `stage_${step}`, { ...data, totalStepCount: current[step] });
};

export const resetFunnelStats = () => {
  const reset = {
    browse: 1,
    view_product: 0,
    add_to_cart: 0,
    begin_checkout: 0,
    purchase: 0,
    total_revenue: 0,
    lastUpdated: new Date().toISOString(),
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(FUNNEL_STORAGE_KEY, JSON.stringify(reset));
  }
  return reset;
};

// -------------------------------------------------------------
// 6. Unified High-Level Tracking Events
// -------------------------------------------------------------

// Page View (SPA navigation)
export const trackPageView = (path, title) => {
  const pageTitle = title || document.title || 'PlantHub';
  const pagePath = path || (typeof window !== 'undefined' ? window.location.pathname : '/');

  // GA4
  gaEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });

  // Meta Pixel
  fbqTrack('PageView');

  // Funnel: If home or shop, record browse
  if (pagePath === '/' || pagePath === '/shop') {
    recordFunnelStep('browse', { path: pagePath });
  }
};

// View Item List (Catalog / Shop)
export const trackViewItemList = (items = [], category = 'All') => {
  gaEvent('view_item_list', {
    item_list_name: category,
    items: items.slice(0, 10).map((p, idx) => ({
      item_id: String(p.id),
      item_name: p.name,
      item_category: p.category,
      price: p.price,
      index: idx + 1,
    })),
  });

  fbqTrack('ViewContent', {
    content_name: `Category: ${category}`,
    content_category: category,
    content_type: 'product_group',
  });
};

// View Product Detail
export const trackViewItem = (product) => {
  if (!product) return;

  const itemData = {
    item_id: String(product.id),
    item_name: product.name,
    item_category: product.category,
    price: product.price,
    currency: 'INR',
    care_level: product.careLevel || product.carelevel,
  };

  // GA4 View Item
  gaEvent('view_item', {
    currency: 'INR',
    value: product.price,
    items: [itemData],
  });

  // Meta Pixel ViewContent
  fbqTrack('ViewContent', {
    content_name: product.name,
    content_category: product.category,
    content_ids: [String(product.id)],
    content_type: 'product',
    value: product.price,
    currency: 'INR',
  });

  // Funnel Step
  recordFunnelStep('view_product', { productId: product.id, name: product.name });
};

// Add to Cart
export const trackAddToCart = (product, qty = 1, size = 'Medium') => {
  if (!product) return;
  const price = product.price || 499;
  const totalValue = price * qty;

  // GA4 Add to Cart
  gaEvent('add_to_cart', {
    currency: 'INR',
    value: totalValue,
    items: [
      {
        item_id: String(product.id),
        item_name: product.name,
        item_category: product.category,
        item_variant: size,
        price,
        quantity: qty,
      },
    ],
  });

  // Meta Pixel AddToCart
  fbqTrack('AddToCart', {
    content_name: product.name,
    content_ids: [String(product.id)],
    content_type: 'product',
    value: totalValue,
    currency: 'INR',
    num_items: qty,
  });

  // Funnel Step
  recordFunnelStep('add_to_cart', { productId: product.id, name: product.name, value: totalValue, qty });
};

// Remove from Cart
export const trackRemoveFromCart = (product) => {
  if (!product) return;
  gaEvent('remove_from_cart', {
    currency: 'INR',
    value: product.price,
    items: [
      {
        item_id: String(product.id),
        item_name: product.name,
        price: product.price,
      },
    ],
  });
};

// View Cart
export const trackViewCart = (cart = [], total = 0) => {
  gaEvent('view_cart', {
    currency: 'INR',
    value: total,
    items: cart.map((item) => ({
      item_id: String(item.id),
      item_name: item.name,
      price: item.price,
      quantity: item.qty,
    })),
  });
};

// Begin Checkout
export const trackBeginCheckout = (cart = [], total = 0) => {
  const items = cart.map((item) => ({
    item_id: String(item.id),
    item_name: item.name,
    price: item.price,
    quantity: item.qty,
  }));

  // GA4 Begin Checkout
  gaEvent('begin_checkout', {
    currency: 'INR',
    value: total,
    items,
  });

  // Meta Pixel InitiateCheckout
  fbqTrack('InitiateCheckout', {
    content_ids: cart.map((i) => String(i.id)),
    content_type: 'product',
    num_items: cart.reduce((acc, i) => acc + (i.qty || 1), 0),
    value: total,
    currency: 'INR',
  });

  // Funnel Step
  recordFunnelStep('begin_checkout', { numItems: cart.length, value: total });
};

// Add Payment Info
export const trackAddPaymentInfo = (total, paymentMethod = 'Razorpay / UPI') => {
  gaEvent('add_payment_info', {
    currency: 'INR',
    value: total,
    payment_type: paymentMethod,
  });

  fbqTrack('AddPaymentInfo', {
    value: total,
    currency: 'INR',
  });
};

// Purchase Completed
export const trackPurchase = ({ orderId, total, items = [] }) => {
  const orderTotal = Number(total) || 0;

  // GA4 Purchase
  gaEvent('purchase', {
    transaction_id: orderId,
    value: orderTotal,
    currency: 'INR',
    tax: 0,
    shipping: orderTotal > 999 ? 0 : 99,
    items: items.map((i) => ({
      item_id: String(i.id || i.product_id),
      item_name: i.name,
      price: i.price,
      quantity: i.qty || 1,
    })),
  });

  // Meta Pixel Purchase
  fbqTrack('Purchase', {
    value: orderTotal,
    currency: 'INR',
    content_type: 'product',
    content_ids: items.map((i) => String(i.id || i.product_id)),
    num_items: items.reduce((acc, i) => acc + (i.qty || 1), 0),
    order_id: orderId,
  });

  // Funnel Step
  recordFunnelStep('purchase', { orderId, value: orderTotal, itemsCount: items.length });
};

// Custom Tracking
export const trackContact = (type = 'whatsapp') => {
  gaEvent('contact_lead', { method: type });
  fbqTrack('Contact', { method: type });
  fbqTrack('Lead', { content_name: `Contact via ${type}` });
};

export const trackSearch = (query) => {
  if (!query) return;
  gaEvent('search', { search_term: query });
  fbqTrack('Search', { search_string: query });
};

// -------------------------------------------------------------
// Config Get & Update
// -------------------------------------------------------------
export const getTrackingConfig = () => {
  return {
    gaId: localStorage.getItem('planthub_ga_id') || DEFAULT_CONFIG.gaId,
    fbPixelId: localStorage.getItem('planthub_fb_pixel_id') || DEFAULT_CONFIG.fbPixelId,
    clarityId: localStorage.getItem('planthub_clarity_id') || DEFAULT_CONFIG.clarityId,
  };
};

export const updateTrackingConfig = ({ gaId, fbPixelId, clarityId }) => {
  if (typeof window === 'undefined') return;
  if (gaId) localStorage.setItem('planthub_ga_id', gaId.trim());
  if (fbPixelId) localStorage.setItem('planthub_fb_pixel_id', fbPixelId.trim());
  if (clarityId) localStorage.setItem('planthub_clarity_id', clarityId.trim());

  // Re-initialize with new credentials
  if (gaId) initGA4(gaId.trim());
  if (fbPixelId) initMetaPixel(fbPixelId.trim());
  if (clarityId) initClarity(clarityId.trim());
};

// Initialize all analytics scripts safely
export const initAllAnalytics = () => {
  const config = getTrackingConfig();
  initGA4(config.gaId);
  initMetaPixel(config.fbPixelId);
  initClarity(config.clarityId);

  // Setup click listener for heatmaps
  if (typeof window !== 'undefined') {
    window.removeEventListener('click', recordHeatmapClick);
    window.addEventListener('click', recordHeatmapClick, { passive: true });
  }
};
