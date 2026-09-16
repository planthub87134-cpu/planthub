import React from 'react';
import PlantPotBuilder from '../components/builder/PlantPotBuilder';

export default function BuilderPage() {
  return (
    <div className="page-enter">
      <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <div className="badge badge-primary" style={{ marginBottom: 'var(--space-4)', display: 'inline-block' }}>Beta Feature</div>
          <h1 className="section-title">3D Custom Pot Builder</h1>
          <p className="section-subtitle">
            Mix and match your favorite plants with our premium pots. See exactly how they look together in 3D before you buy!
          </p>
        </div>
        
        <PlantPotBuilder />
      </div>
    </div>
  );
}
