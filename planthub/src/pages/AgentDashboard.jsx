import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSupport } from '../context/SupportContext';

export default function AgentDashboard() {
  const { user } = useAuth();
  const { getAllTickets, replyToTicket, updateTicketStatus } = useSupport();
  const [activeTicket, setActiveTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  
  const tickets = getAllTickets();

  const handleReply = (e) => {
    e.preventDefault();
    if (!replyMessage.trim() || !activeTicket) return;
    replyToTicket(activeTicket, 'agent', user.name, replyMessage);
    setReplyMessage('');
  };

  const currentTicket = tickets.find(t => t.id === activeTicket);

  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <h1 style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--text-3xl)' }}>Support Agent Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-6)' }}>
        {/* Sidebar - Ticket List */}
        <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
          <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', backgroundColor: 'var(--bg-subtle)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>All Tickets</h2>
          </div>
          <div style={{ maxHeight: '700px', overflowY: 'auto' }}>
            {tickets.length === 0 ? (
              <div style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--text-muted)' }}>
                No tickets available.
              </div>
            ) : (
              tickets.map(ticket => (
                <div 
                  key={ticket.id}
                  onClick={() => setActiveTicket(ticket.id)}
                  style={{ 
                    padding: 'var(--space-4)', 
                    borderBottom: '1px solid var(--border-light)',
                    cursor: 'pointer',
                    backgroundColor: activeTicket === ticket.id ? 'var(--bg-subtle)' : 'white'
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
                    User ID: {ticket.userId} &bull; {new Date(ticket.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Content - Ticket Thread */}
        <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', height: '750px' }}>
          {currentTicket ? (
            <>
              <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', backgroundColor: 'var(--bg-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>{currentTicket.subject}</h2>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Ticket ID: {currentTicket.id} &bull; User: {currentTicket.userId}</div>
                </div>
                <div>
                  <select 
                    className="input" 
                    value={currentTicket.status} 
                    onChange={(e) => updateTicketStatus(currentTicket.id, e.target.value)}
                    style={{ padding: 'var(--space-2)', fontSize: 'var(--text-sm)' }}
                  >
                    <option value="Open">Status: Open</option>
                    <option value="Resolved">Status: Resolved</option>
                  </select>
                </div>
              </div>
              
              <div style={{ flex: 1, padding: 'var(--space-4)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {currentTicket.messages.map(msg => {
                  const isAgent = msg.senderRole === 'agent' || msg.senderRole === 'admin' || msg.senderRole === 'manager';
                  return (
                    <div key={msg.id} style={{ 
                      alignSelf: isAgent ? 'flex-end' : 'flex-start',
                      maxWidth: '80%',
                      backgroundColor: isAgent ? 'var(--primary-50)' : '#f3f4f6',
                      border: isAgent ? '1px solid var(--primary-100)' : '1px solid #e5e7eb',
                      borderRadius: 'var(--radius-md)',
                      padding: 'var(--space-3)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                        <span style={{ fontWeight: 'var(--font-bold)', color: isAgent ? 'var(--primary-700)' : 'var(--text-secondary)' }}>{msg.senderName} ({msg.senderRole})</span>
                        <span>{new Date(msg.createdAt).toLocaleString()}</span>
                      </div>
                      <div style={{ fontSize: 'var(--text-sm)', whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--border-light)' }}>
                <form onSubmit={handleReply} style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <textarea 
                    className="input" 
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your reply to the customer..."
                    style={{ flex: 1, resize: 'none', minHeight: '60px' }}
                    required
                  />
                  <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>Send Reply</button>
                </form>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
              Select a ticket from the left to view details and reply.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
