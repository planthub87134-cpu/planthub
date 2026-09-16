// PlantHub — Page Layout (Navbar + Content + Footer)

import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './Navbar';
import MegaFooter from './MegaFooter';
import WhatsAppWidget from '../common/WhatsAppWidget';

export default function PageLayout() {
  return (
    <div className="min-h-screen" style={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <MegaFooter />
      <WhatsAppWidget />
    </div>
  );
}
