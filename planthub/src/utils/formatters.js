// PlantHub — Formatters & Helpers

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateShort = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const generateOrderId = (existingCount) => {
  return `ORD${String(existingCount + 1).padStart(3, '0')}`;
};

export const generateTrackingNumber = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'TRK-PH-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'delivered': return 'success';
    case 'shipped': return 'info';
    case 'pending': return 'warning';
    case 'cancelled': return 'danger';
    default: return 'neutral';
  }
};

export const getStockStatus = (stock) => {
  if (stock > 15) return { label: 'In Stock', color: 'success' };
  if (stock > 5) return { label: 'Low Stock', color: 'warning' };
  return { label: 'Critical', color: 'danger' };
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
