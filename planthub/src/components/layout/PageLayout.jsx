// PlantHub — Page Layout (Navbar + Content + Footer)

import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import MegaFooter from './MegaFooter';
import WhatsAppWidget from '../common/WhatsAppWidget';

export default function PageLayout() {
  return (
    <div className="layout-wrapper" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div className="main-content-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
        <MegaFooter />
      </div>
      <WhatsAppWidget />
    </div>
  );
}
