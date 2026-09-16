import React, { useState } from 'react';
import { Search, User, Phone, Mail, MapPin, ShoppingBag, Activity, CheckCircle, AlertTriangle, MessageSquare } from 'lucide-react';

// --- MOCK DATA ---
const MOCK_CUSTOMERS = [
  {
    id: 'CUST-001',
    name: 'Aisha Sharma',
    email: 'aisha.sharma@example.com',
    phone: '+91 98765 43210',
    address: 'Bandra West, Mumbai',
    status: 'VIP',
    joined: '2025-11-10',
    totalOrders: 12,
    lifetimeValue: 14500,
    recentOrders: [
      { id: 'ORD-991', date: '2026-08-15', amount: 1299, status: 'Delivered' },
      { id: 'ORD-842', date: '2026-06-20', amount: 3450, status: 'Delivered' }
    ]
  },
  {
    id: 'CUST-002',
    name: 'Rohan Gupta',
    email: 'rohan.g@example.com',
    phone: '+91 91234 56789',
    address: 'Indiranagar, Bangalore',
    status: 'Active',
    joined: '2026-01-05',
    totalOrders: 3,
    lifetimeValue: 2800,
    recentOrders: [
      { id: 'ORD-1004', date: '2026-09-10', amount: 899, status: 'Processing' }
    ]
  },
  {
    id: 'CUST-003',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    phone: '+91 99887 76655',
    address: 'Vastrapur, Ahmedabad',
    status: 'Inactive',
    joined: '2025-08-22',
    totalOrders: 1,
    lifetimeValue: 599,
    recentOrders: [
      { id: 'ORD-402', date: '2025-09-01', amount: 599, status: 'Delivered' }
    ]
  }
];

const MOCK_PLANT_DOCTOR_QUEUE = [
  {
    id: 'SCAN-101',
    customerName: 'Aisha Sharma',
    date: '2026-09-15',
    imageUrl: 'https://images.unsplash.com/photo-1594921673898-38bbd16853dc?w=400&q=80',
    plantType: 'Monstera Deliciosa',
    aiDiagnosis: 'Spider Mites Infestation',
    aiConfidence: '92%',
    severity: 'High',
    status: 'Pending Review'
  },
  {
    id: 'SCAN-102',
    customerName: 'Vikram Singh',
    date: '2026-09-16',
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80',
    plantType: 'Peace Lily',
    aiDiagnosis: 'Overwatering / Root Rot',
    aiConfidence: '88%',
    severity: 'Medium',
    status: 'Pending Review'
  },
  {
    id: 'SCAN-098',
    customerName: 'Rohan Gupta',
    date: '2026-09-10',
    imageUrl: 'https://images.unsplash.com/photo-1620127593673-05978b532bfd?w=400&q=80',
    plantType: 'Snake Plant',
    aiDiagnosis: 'Healthy',
    aiConfidence: '98%',
    severity: 'Low',
    status: 'Resolved'
  }
];

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState('customers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedScan, setSelectedScan] = useState(null);

  // Filter customers
  const filteredCustomers = MOCK_CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 'var(--space-6)' }}>
      
      {/* CRM Navigation */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', gap: 'var(--space-6)' }}>
        <button 
          onClick={() => setActiveTab('customers')}
          style={{ 
            background: 'none', 
            border: 'none', 
            padding: 'var(--space-3) 0',
            fontSize: '1.1rem',
            fontWeight: activeTab === 'customers' ? 'bold' : 'normal',
            color: activeTab === 'customers' ? 'var(--primary-600)' : 'var(--text-muted)',
            borderBottom: activeTab === 'customers' ? '3px solid var(--primary-500)' : '3px solid transparent',
            cursor: 'pointer'
          }}
        >
          Customer Directory
        </button>
        <button 
          onClick={() => setActiveTab('plantdoctor')}
          style={{ 
            background: 'none', 
            border: 'none', 
            padding: 'var(--space-3) 0',
            fontSize: '1.1rem',
            fontWeight: activeTab === 'plantdoctor' ? 'bold' : 'normal',
            color: activeTab === 'plantdoctor' ? 'var(--primary-600)' : 'var(--text-muted)',
            borderBottom: activeTab === 'plantdoctor' ? '3px solid var(--primary-500)' : '3px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          Plant Doctor Queue
          <span className="badge badge-solid-danger" style={{ fontSize: '0.7rem' }}>2 New</span>
        </button>
      </div>

      {/* --- CUSTOMERS TAB --- */}
      {activeTab === 'customers' && (
        <div style={{ display: 'flex', gap: 'var(--space-6)', height: '100%' }}>
          
          {/* Customer List */}
          <div className="card" style={{ flex: '1 1 40%', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', background: 'var(--bg-subtle)' }}>
              <div style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Search customers..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', paddingLeft: '36px' }}
                />
              </div>
            </div>
            
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {filteredCustomers.map(customer => (
                <div 
                  key={customer.id}
                  onClick={() => setSelectedCustomer(customer)}
                  style={{
                    padding: 'var(--space-4)',
                    borderBottom: '1px solid var(--border-light)',
                    cursor: 'pointer',
                    background: selectedCustomer?.id === customer.id ? 'var(--primary-50)' : 'transparent',
                    borderLeft: selectedCustomer?.id === customer.id ? '4px solid var(--primary-500)' : '4px solid transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 0.2s ease'
                  }}
                  className="hover-lift"
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-200)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {customer.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{customer.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{customer.id} • {customer.totalOrders} Orders</p>
                  </div>
                  <span className={`badge ${customer.status === 'VIP' ? 'badge-primary' : customer.status === 'Active' ? 'badge-success' : 'badge-neutral'}`}>
                    {customer.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Details Panel */}
          <div className="card" style={{ flex: '1 1 60%', padding: 'var(--space-6)', overflowY: 'auto' }}>
            {selectedCustomer ? (
              <div className="animate-slide-up">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)' }}>
                  <div>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{selectedCustomer.name}</h2>
                    <span style={{ color: 'var(--text-muted)' }}>Customer since {selectedCustomer.joined}</span>
                  </div>
                  <span className={`badge badge-solid-${selectedCustomer.status === 'VIP' ? 'primary' : 'success'}`} style={{ fontSize: '0.9rem', padding: '6px 12px' }}>
                    {selectedCustomer.status}
                  </span>
                </div>

                <div className="grid grid-2" style={{ gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                    <Mail size={20} color="var(--primary-500)" />
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email Address</div>
                      <div style={{ fontWeight: '500' }}>{selectedCustomer.email}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                    <Phone size={20} color="var(--primary-500)" />
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Phone Number</div>
                      <div style={{ fontWeight: '500' }}>{selectedCustomer.phone}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', gridColumn: 'span 2' }}>
                    <MapPin size={20} color="var(--primary-500)" />
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Primary Address</div>
                      <div style={{ fontWeight: '500' }}>{selectedCustomer.address}</div>
                    </div>
                  </div>
                </div>

                <h3 style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '8px', marginBottom: '16px' }}>Order History</h3>
                <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Orders</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedCustomer.totalOrders}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Lifetime Value</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-600)' }}>₹{selectedCustomer.lifetimeValue}</div>
                  </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-subtle)', borderBottom: '2px solid var(--border-light)' }}>
                      <th style={{ padding: '12px' }}>Order ID</th>
                      <th style={{ padding: '12px' }}>Date</th>
                      <th style={{ padding: '12px' }}>Amount</th>
                      <th style={{ padding: '12px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCustomer.recentOrders.map(order => (
                      <tr key={order.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '12px', fontWeight: '500' }}>{order.id}</td>
                        <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{order.date}</td>
                        <td style={{ padding: '12px' }}>₹{order.amount}</td>
                        <td style={{ padding: '12px' }}>
                          <span className={`badge ${order.status === 'Delivered' ? 'badge-success' : 'badge-warning'}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                <User size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                <p>Select a customer from the list to view their history.</p>
              </div>
            )}
          </div>
        </div>
      )}


      {/* --- PLANT DOCTOR QUEUE TAB --- */}
      {activeTab === 'plantdoctor' && (
        <div style={{ display: 'flex', gap: 'var(--space-6)', height: '100%' }}>
          
          {/* Scan List */}
          <div className="card" style={{ flex: '1 1 35%', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', background: 'var(--bg-subtle)' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Pending Scans</h3>
            </div>
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {MOCK_PLANT_DOCTOR_QUEUE.map(scan => (
                <div 
                  key={scan.id}
                  onClick={() => setSelectedScan(scan)}
                  style={{
                    padding: 'var(--space-4)',
                    borderBottom: '1px solid var(--border-light)',
                    cursor: 'pointer',
                    background: selectedScan?.id === scan.id ? 'var(--primary-50)' : 'transparent',
                    borderLeft: selectedScan?.id === scan.id ? '4px solid var(--primary-500)' : '4px solid transparent',
                    display: 'flex',
                    gap: '16px',
                    transition: 'all 0.2s ease'
                  }}
                  className="hover-lift"
                >
                  <img src={scan.imageUrl} alt="Plant" style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '0.9rem' }}>{scan.customerName}</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{scan.date}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>{scan.aiDiagnosis}</div>
                    <span className={`badge ${scan.status === 'Pending Review' ? 'badge-warning' : 'badge-success'}`} style={{ fontSize: '0.7rem' }}>
                      {scan.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scan Review Panel */}
          <div className="card" style={{ flex: '1 1 65%', padding: 'var(--space-6)', overflowY: 'auto' }}>
            {selectedScan ? (
              <div className="animate-slide-up">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Scan: {selectedScan.id}</h2>
                    <div style={{ color: 'var(--text-muted)' }}>Submitted by <strong>{selectedScan.customerName}</strong> on {selectedScan.date}</div>
                  </div>
                  <span className={`badge badge-solid-${selectedScan.severity === 'High' ? 'danger' : selectedScan.severity === 'Medium' ? 'warning' : 'success'}`}>
                    Severity: {selectedScan.severity}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
                  <img 
                    src={selectedScan.imageUrl} 
                    alt="Submitted Plant" 
                    style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }} 
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    <div style={{ padding: '16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                      <h4 style={{ marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Plant Type</h4>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{selectedScan.plantType}</div>
                    </div>
                    <div style={{ padding: '16px', background: 'var(--primary-50)', border: '1px solid var(--primary-200)', borderRadius: 'var(--radius-md)' }}>
                      <h4 style={{ marginBottom: '8px', color: 'var(--primary-700)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Activity size={16} /> AI Diagnosis
                      </h4>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {selectedScan.aiDiagnosis}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Confidence Score: <strong style={{ color: 'var(--primary-600)' }}>{selectedScan.aiConfidence}</strong></div>
                    </div>
                  </div>
                </div>

                {selectedScan.status === 'Pending Review' ? (
                  <div style={{ padding: 'var(--space-6)', borderTop: '1px solid var(--border-light)' }}>
                    <h3 style={{ marginBottom: 'var(--space-4)' }}>Agent Action Panel</h3>
                    <textarea 
                      className="input" 
                      placeholder="Type a manual follow-up response to the customer regarding their plant's health..." 
                      style={{ width: '100%', minHeight: '100px', marginBottom: '16px', resize: 'vertical' }}
                    />
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button className="btn btn-primary" onClick={() => alert('Message Sent! Status marked as Resolved.')}>Send Message & Mark Resolved</button>
                      <button className="btn btn-outline" onClick={() => alert('Escalated to Senior Botanist.')}>Escalate to Botanist</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: 'var(--space-6)', background: 'var(--success-50)', border: '1px solid var(--success-200)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CheckCircle color="var(--success-600)" />
                    <div>
                      <strong style={{ color: 'var(--success-700)' }}>This scan has been reviewed and resolved.</strong>
                      <div style={{ fontSize: '0.9rem', color: 'var(--success-600)' }}>Customer was sent the standard care guide.</div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                <Activity size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                <p>Select a scan from the queue to review AI diagnosis and respond.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
