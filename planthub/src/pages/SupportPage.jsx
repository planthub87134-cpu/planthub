import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSupport } from '../context/SupportContext';

export default function SupportPage() {
  const { user } = useAuth();
  const { getTicketsByUser, createTicket, replyToTicket } = useSupport();
  const [activeTicket, setActiveTicket] = useState(null);
  const [newSubject, setNewSubject] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [replyMessage, setReplyMessage] = useState('');

  const tickets = user ? getTicketsByUser(user.id) : [];

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newSubject.trim() || !newMessage.trim()) return;
    const ticket = createTicket(user.id, user.name, newSubject, newMessage);
    setNewSubject('');
    setNewMessage('');
    setActiveTicket(ticket.id);
  };

  const handleReply = (e) => {
    e.preventDefault();
    if (!replyMessage.trim() || !activeTicket) return;
    replyToTicket(activeTicket, 'customer', user.name, replyMessage);
    setReplyMessage('');
  };

  const currentTicket = tickets.find(t => t.id === activeTicket);

  return (
    <div className="page-container" style={{ padding: 'var(--space-6) 0' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 var(--space-4)' }}>
        <h1 style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--text-3xl)' }}>Customer Support</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-6)' }}>
          {/* Sidebar - Ticket List */}
          <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
            <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', backgroundColor: 'var(--bg-subtle)' }}>
              <button 
                onClick={() => setActiveTicket(null)}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                + New Ticket
              </button>
            </div>
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {tickets.length === 0 ? (
                <div style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No support tickets yet.
                </div>
              ) : (
                tickets.map(ticket => (
                  <div 
                    key={ticket.id}
                    onClick={() => setActiveTicket(ticket.id)}
                    className="hover-lift"
                    style={{ 
                      padding: 'var(--space-4)', 
                      borderBottom: '1px solid var(--border-light)',
                      cursor: 'pointer',
                      backgroundColor: activeTicket === ticket.id ? 'var(--primary-50)' : 'white',
                      borderLeft: activeTicket === ticket.id ? '4px solid var(--primary-500)' : '4px solid transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                      <span style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)' }}>{ticket.id}</span>
                      <span style={{ 
                        fontSize: 'var(--text-xs)', 
                        padding: '2px 8px', 
                        borderRadius: '99px',
                        backgroundColor: ticket.status === 'Open' ? '#fef3c7' : '#d1fae5',
                        color: ticket.status === 'Open' ? '#92400e' : '#065f46'
                      }}>
                        {ticket.status}
                      </span>
                    </div>
                    <div style={{ fontWeight: 'var(--font-medium)', marginBottom: 'var(--space-1)' }}>{ticket.subject}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Main Content - Ticket Thread or New Ticket Form */}
          <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', height: '650px', overflow: 'hidden' }}>
            {currentTicket ? (
              <>
                <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', backgroundColor: 'var(--bg-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>{currentTicket.subject}</h2>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Ticket ID: {currentTicket.id}</span>
                  </div>
                </div>
                
                <div style={{ flex: 1, padding: 'var(--space-4)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {currentTicket.messages.map(msg => {
                    const isCustomer = msg.senderRole === 'customer';
                    return (
                      <div key={msg.id} className="animate-scale-in" style={{ 
                        alignSelf: isCustomer ? 'flex-end' : 'flex-start',
                        maxWidth: '80%',
                        backgroundColor: isCustomer ? 'var(--primary-50)' : '#f3f4f6',
                        border: isCustomer ? '1px solid var(--primary-100)' : '1px solid #e5e7eb',
                        borderRadius: 'var(--radius-xl)',
                        borderBottomRightRadius: isCustomer ? '4px' : 'var(--radius-xl)',
                        borderBottomLeftRadius: isCustomer ? 'var(--radius-xl)' : '4px',
                        padding: 'var(--space-4)',
                        boxShadow: 'var(--shadow-sm)'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                          <span style={{ fontWeight: 'var(--font-bold)', color: isCustomer ? 'var(--primary-700)' : 'var(--text-secondary)' }}>
                            {isCustomer ? 'You' : `${msg.senderName} (Support)`}
                          </span>
                          <span>{new Date(msg.createdAt).toLocaleString()}</span>
                        </div>
                        <div style={{ fontSize: 'var(--text-sm)', whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                      </div>
                    );
                  })}
                </div>

                {currentTicket.status !== 'Resolved' && (
                  <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--border-light)' }}>
                    <form onSubmit={handleReply} style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <textarea 
                        className="input" 
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder="Type your reply..."
                        style={{ flex: 1, resize: 'none', minHeight: '60px' }}
                        required
                      />
                      <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>Send</button>
                    </form>
                  </div>
                )}
              </>
            ) : (
              <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>Create New Ticket</h2>
                <form onSubmit={handleCreateTicket} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', flex: 1 }}>
                  <div>
                    <label className="label">Subject</label>
                    <input 
                      type="text" 
                      className="input" 
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      placeholder="What do you need help with?"
                      style={{ width: '100%' }}
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <label className="label">Message</label>
                    <textarea 
                      className="input" 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Describe your issue in detail..."
                      style={{ width: '100%', flex: 1, resize: 'none' }}
                      required
                    />
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <button type="submit" className="btn btn-primary" disabled={!user}>
                      {user ? 'Submit Ticket' : 'Login to Submit'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
