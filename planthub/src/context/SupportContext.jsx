import React, { createContext, useContext, useState, useEffect } from 'react';

const SupportContext = createContext(null);

// Load tickets from localStorage or use default mock tickets
const loadInitialTickets = () => {
  const saved = localStorage.getItem('planthub_support_tickets');
  if (saved) {
    return JSON.parse(saved);
  }
  return [
    {
      id: 'TKT-101',
      userId: 'demo-customer',
      subject: 'My Monstera has yellow leaves',
      status: 'Open',
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: 'MSG-1',
          senderRole: 'customer',
          senderName: 'John Doe',
          text: 'Hi, I received my Monstera last week and its leaves are turning yellow. What should I do?',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        }
      ]
    },
    {
      id: 'TKT-102',
      userId: 'demo-customer',
      subject: 'Where is my order?',
      status: 'Resolved',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      messages: [
        {
          id: 'MSG-2',
          senderRole: 'customer',
          senderName: 'John Doe',
          text: 'Order ORD002 has not arrived yet.',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          id: 'MSG-3',
          senderRole: 'agent',
          senderName: 'Support Agent',
          text: 'Hi John, your order is currently in transit and should arrive tomorrow.',
          createdAt: new Date(Date.now() - 150000000).toISOString(),
        }
      ]
    }
  ];
};

export function SupportProvider({ children }) {
  const [tickets, setTickets] = useState(loadInitialTickets());

  // Save to localStorage whenever tickets change
  useEffect(() => {
    localStorage.setItem('planthub_support_tickets', JSON.stringify(tickets));
  }, [tickets]);

  const createTicket = (userId, userName, subject, initialMessage) => {
    const newTicket = {
      id: `TKT-${Math.floor(Math.random() * 1000) + 200}`,
      userId,
      subject,
      status: 'Open',
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: `MSG-${Date.now()}`,
          senderRole: 'customer',
          senderName: userName,
          text: initialMessage,
          createdAt: new Date().toISOString(),
        }
      ]
    };
    setTickets(prev => [newTicket, ...prev]);
    return newTicket;
  };

  const replyToTicket = (ticketId, senderRole, senderName, text) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          messages: [
            ...t.messages,
            {
              id: `MSG-${Date.now()}`,
              senderRole,
              senderName,
              text,
              createdAt: new Date().toISOString(),
            }
          ]
        };
      }
      return t;
    }));
  };

  const updateTicketStatus = (ticketId, status) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return { ...t, status };
      }
      return t;
    }));
  };

  const getTicketsByUser = (userId) => {
    return tickets.filter(t => t.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const getAllTickets = () => {
    return [...tickets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const value = {
    tickets,
    createTicket,
    replyToTicket,
    updateTicketStatus,
    getTicketsByUser,
    getAllTickets,
  };

  return <SupportContext.Provider value={value}>{children}</SupportContext.Provider>;
}

export function useSupport() {
  const context = useContext(SupportContext);
  if (!context) {
    throw new Error('useSupport must be used within a SupportProvider');
  }
  return context;
}

export default SupportContext;
