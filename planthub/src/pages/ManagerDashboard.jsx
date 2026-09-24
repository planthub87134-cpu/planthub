import React, { useState } from 'react';
import { useOutletContext } from 'react-router';
import { 
  Clock, CheckCircle, Package, Truck, Search, AlertCircle, 
  TrendingUp, Users, DollarSign, Activity, Filter, ChevronRight,
  BarChart2, PieChart, ShieldCheck, Factory, Banknote, Target, ShoppingBag, Edit
} from 'lucide-react';
import { DEMO_ORDERS, PRODUCTS } from '../utils/constants';

const ManagerDashboard = () => {
  const context = useOutletContext();
  const activeView = context?.activeView;
  const setActiveView = context?.setActiveView || (()=>{});

  // Default to overview if activeView is not one of our advanced tabs
  const defaultTabs = ['overview', 'operations', 'financials', 'inventory', 'insights'];
  const activeTab = defaultTabs.includes(activeView) ? activeView : 'overview';
  
  const handleTabChange = (tab) => {
    setActiveView(tab);
  };

  const [isEditMode, setIsEditMode] = useState(false);
  const [dashboardData, setDashboardData] = useState(() => {
    const saved = localStorage.getItem('managerDashboardData');
    if (saved) return JSON.parse(saved);
    return {
      otifRate: 92.5,
      avgDispatchTime: 4.2,
      qualityPassRate: 98.1,
      totalRevenue: 1250000,
      targetRevenue: 1500000,
      recoveryPending: 320000
    };
  });

  const handleSaveData = () => {
    localStorage.setItem('managerDashboardData', JSON.stringify(dashboardData));
    setIsEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDashboardData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const { otifRate, avgDispatchTime, qualityPassRate, totalRevenue, targetRevenue, recoveryPending } = dashboardData;
  const fgInventory = PRODUCTS.reduce((acc, p) => acc + p.stock, 0); // Finished Goods
  const recoveryReceived = totalRevenue - recoveryPending;

  // 4. Insights (Pricing & Top Sellers)
  const topSellers = PRODUCTS.slice(0, 3).map(p => ({ ...p, sales: Math.floor(Math.random() * 500) + 100 })).sort((a,b)=>b.sales - a.sales);

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <div style={{
      background: 'white', borderRadius: '16px', padding: '1.5rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.02)',
      display: 'flex', flexDirection: 'column', gap: '1rem',
      transition: 'transform 0.2s', cursor: 'default'
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ background: `${color}15`, padding: '12px', borderRadius: '12px', color: color }}>
          <Icon size={24} />
        </div>
        {trend && (
          <span style={{ 
            fontSize: '0.85rem', fontWeight: '600', 
            color: trend.startsWith('+') ? '#10b981' : '#ef4444',
            background: trend.startsWith('+') ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
            padding: '4px 8px', borderRadius: '20px'
          }}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#111827', margin: '0' }}>{value}</h3>
        <p style={{ color: '#4b5563', fontSize: '0.95rem', margin: '4px 0 0 0', fontWeight: '600' }}>{title}</p>
        {subtitle && <p style={{ color: '#9ca3af', fontSize: '0.8rem', margin: '4px 0 0 0' }}>{subtitle}</p>}
      </div>
    </div>
  );

  const ProgressBar = ({ progress, color, bg = '#f3f4f6' }) => (
    <div style={{ width: '100%', background: bg, borderRadius: '8px', height: '8px', overflow: 'hidden' }}>
      <div style={{ width: `${progress}%`, background: color, height: '100%', borderRadius: '8px' }}></div>
    </div>
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', fontFamily: '"Inter", sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Activity color="#3b82f6" size={32} />
            Enterprise Manager Dashboard
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem', fontWeight: '500' }}>
            Comprehensive view of Operations, Financials, Inventory, and Business Insights.
          </p>
        </div>
        <div>
          {isEditMode ? (
            <button onClick={handleSaveData} className="hover-scale" style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 10px rgba(16,185,129,0.3)' }}>
              <CheckCircle size={18} /> Save Dashboard
            </button>
          ) : (
            <button onClick={() => setIsEditMode(true)} className="hover-scale" style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 10px rgba(59,130,246,0.3)' }}>
              Edit Dashboard Values
            </button>
          )}
        </div>
      </div>

      {isEditMode && (
        <div className="animate-slide-up" style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '2rem', border: '2px solid #3b82f6' }}>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '8px' }}><Edit size={20} /> Edit KPI Values</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#64748b', marginBottom: '0.5rem' }}>Total Revenue (₹)</label>
              <input type="number" name="totalRevenue" value={dashboardData.totalRevenue} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#64748b', marginBottom: '0.5rem' }}>Target Revenue (₹)</label>
              <input type="number" name="targetRevenue" value={dashboardData.targetRevenue} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#64748b', marginBottom: '0.5rem' }}>Pending Receivables (₹)</label>
              <input type="number" name="recoveryPending" value={dashboardData.recoveryPending} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#64748b', marginBottom: '0.5rem' }}>OTIF Rate (%)</label>
              <input type="number" name="otifRate" value={dashboardData.otifRate} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#64748b', marginBottom: '0.5rem' }}>Avg Dispatch Time (Hrs)</label>
              <input type="number" name="avgDispatchTime" value={dashboardData.avgDispatchTime} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#64748b', marginBottom: '0.5rem' }}>Quality Pass Rate (%)</label>
              <input type="number" name="qualityPassRate" value={dashboardData.qualityPassRate} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap', background: 'white', padding: '0.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
        {[
          { id: 'overview', label: 'Executive Overview', icon: BarChart2 },
          { id: 'operations', label: 'Operations & KPI', icon: Factory },
          { id: 'financials', label: 'Financials & Receivables', icon: Banknote },
          { id: 'inventory', label: 'Inventory & Quality', icon: Package },
          { id: 'insights', label: 'Product Insights', icon: PieChart },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: activeTab === tab.id ? '#3b82f6' : 'transparent',
              color: activeTab === tab.id ? 'white' : '#64748b',
              border: 'none', padding: '0.75rem 1.25rem', borderRadius: '8px',
              fontWeight: '600', fontSize: '0.95rem', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Areas */}
      
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gap: '2rem' }}>
          {/* Top KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <StatCard title="Total Revenue (YTD)" value={`₹ ${(totalRevenue/100000).toFixed(2)}L`} subtitle={`Target: ₹ ${(targetRevenue/100000).toFixed(2)}L`} icon={Target} color="#3b82f6" trend="+8.4%" />
            <StatCard title="Order Fulfillment (OTIF)" value={`${otifRate}%`} subtitle="On Time In Full" icon={CheckCircle} color="#10b981" trend="+1.2%" />
            <StatCard title="Avg Dispatch Time" value={`${avgDispatchTime} hrs`} subtitle="Order to Dispatch" icon={Truck} color="#f59e0b" trend="-0.5 hrs" />
            <StatCard title="Recovery (Receivables)" value={`₹ ${(recoveryPending/100000).toFixed(2)}L`} subtitle="Pending Payment Collection" icon={Banknote} color="#ef4444" trend="-₹ 50k" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={20} color="#3b82f6"/> Target vs Actual Achievement</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: '600' }}>
                  <span>Revenue Achievement</span>
                  <span style={{ color: '#3b82f6' }}>{Math.round((totalRevenue/targetRevenue)*100)}%</span>
                </div>
                <ProgressBar progress={(totalRevenue/targetRevenue)*100} color="#3b82f6" />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: '600' }}>
                  <span>Production Target Achievement</span>
                  <span style={{ color: '#10b981' }}>88%</span>
                </div>
                <ProgressBar progress={88} color="#10b981" />
              </div>
            </div>
            
            <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
               <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={20} color="#10b981"/> Quality Health</h3>
               <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                 <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '8px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                   <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>{qualityPassRate}%</span>
                 </div>
                 <p style={{ fontWeight: '600', color: '#64748b' }}>First Pass Yield (FPY)</p>
               </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'operations' && (
        <div style={{ display: 'grid', gap: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Order Execution Pipeline</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Pending (Tayari)', 'In Production', 'Quality Check', 'Ready for Dispatch'].map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: `4px solid ${['#ef4444', '#f59e0b', '#3b82f6', '#10b981'][idx]}` }}>
                    <span style={{ fontWeight: '600' }}>{step}</span>
                    <span style={{ fontWeight: '800', fontSize: '1.1rem' }}>{Math.floor(Math.random() * 50) + 10}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Dispatch & OTIF Metrics</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ color: '#64748b', marginBottom: '0.5rem', fontWeight: '600' }}>Order To Dispatch Time (Avg)</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>{avgDispatchTime}</span>
                  <span style={{ fontWeight: '600', color: '#64748b' }}>Hours</span>
                </div>
              </div>
              <div style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#166534', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={18}/> OTIF Rate</h4>
                <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color: '#15803d' }}>{otifRate}%</p>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#166534' }}>Target: 95% | Variance: -2.5%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'financials' && (
        <div style={{ display: 'grid', gap: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <StatCard title="Total Billing" value={`₹ ${(totalRevenue/100000).toFixed(2)}L`} icon={Banknote} color="#3b82f6" />
            <StatCard title="Amount Recovered" value={`₹ ${(recoveryReceived/100000).toFixed(2)}L`} icon={TrendingUp} color="#10b981" />
            <StatCard title="Pending Receivables" value={`₹ ${(recoveryPending/100000).toFixed(2)}L`} subtitle="Market Outstandings" icon={AlertCircle} color="#ef4444" />
          </div>

          <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Recovery Breakdown</h3>
            <div style={{ width: '100%', height: '30px', display: 'flex', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem' }}>
              <div style={{ width: `${(recoveryReceived/totalRevenue)*100}%`, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.8rem' }}>Received</div>
              <div style={{ width: `${(recoveryPending/totalRevenue)*100}%`, background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.8rem' }}>Pending</div>
            </div>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '50%' }}></div> <span style={{ fontWeight: '600' }}>Recovered ({(recoveryReceived/totalRevenue*100).toFixed(1)}%)</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%' }}></div> <span style={{ fontWeight: '600' }}>Outstanding ({(recoveryPending/totalRevenue*100).toFixed(1)}%)</span></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Package size={20} color="#3b82f6"/> Finished Goods (FG)</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', background: '#eff6ff', borderRadius: '12px', marginBottom: '1.5rem' }}>
              <div>
                <p style={{ margin: '0 0 0.5rem 0', color: '#1e3a8a', fontWeight: '600' }}>Total Ready Stock</p>
                <p style={{ margin: 0, fontSize: '2rem', fontWeight: '800', color: '#1d4ed8' }}>{fgInventory} Units</p>
              </div>
              <Package size={48} color="#3b82f6" opacity={0.5} />
            </div>
            <h4 style={{ fontWeight: '600', color: '#4b5563', marginBottom: '1rem' }}>Stock by Category</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Indoor Plants', 'Outdoor Plants', 'Seeds', 'Pots'].map((cat, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ fontWeight: '500', color: '#334155' }}>{cat}</span>
                  <span style={{ fontWeight: '700' }}>{Math.floor(Math.random()*150)+20}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Factory size={20} color="#f59e0b"/> Quality Check (QC)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ padding: '1rem', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0', textAlign: 'center' }}>
                <p style={{ margin: '0 0 0.5rem 0', color: '#166534', fontWeight: '600' }}>QC Passed</p>
                <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color: '#15803d' }}>{qualityPassRate}%</p>
              </div>
              <div style={{ padding: '1rem', background: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca', textAlign: 'center' }}>
                <p style={{ margin: '0 0 0.5rem 0', color: '#991b1b', fontWeight: '600' }}>QC Rejected</p>
                <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color: '#b91c1c' }}>{(100 - qualityPassRate).toFixed(1)}%</p>
              </div>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Quality metrics are based on the latest production batches. Rejection causes are predominantly related to damaged leaves and incorrect pot sizing during assembly.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'insights' && (
        <div style={{ display: 'grid', gap: '2rem' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><ShoppingBag size={20} color="#8b5cf6"/> Product & Pricing Insights (Top Performers)</h3>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '1rem', color: '#475569', fontWeight: '600' }}>Product</th>
                    <th style={{ padding: '1rem', color: '#475569', fontWeight: '600' }}>Category</th>
                    <th style={{ padding: '1rem', color: '#475569', fontWeight: '600' }}>Selling Price</th>
                    <th style={{ padding: '1rem', color: '#475569', fontWeight: '600' }}>Units Sold</th>
                    <th style={{ padding: '1rem', color: '#475569', fontWeight: '600' }}>Revenue Contribution</th>
                  </tr>
                </thead>
                <tbody>
                  {topSellers.map((product, idx) => (
                    <tr key={product.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src={product.image} alt={product.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} onError={e=>e.target.src='https://images.unsplash.com/photo-1497250681560-d160c9e42446?w=100'}/>
                        <span style={{ fontWeight: '600', color: '#0f172a' }}>{product.name}</span>
                      </td>
                      <td style={{ padding: '1rem', color: '#64748b' }}>{product.category}</td>
                      <td style={{ padding: '1rem', fontWeight: '600', color: '#3b82f6' }}>₹ {product.price}</td>
                      <td style={{ padding: '1rem', fontWeight: '700' }}>{product.sales}</td>
                      <td style={{ padding: '1rem', fontWeight: '600', color: '#10b981' }}>₹ {(product.price * product.sales).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManagerDashboard;
