import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Pot3D from './Pot3D';
import PlantSprite3D from './PlantSprite3D';
import { PRODUCTS } from '../../utils/constants';

const POT_SHAPES = [
  { id: 'cylinder', name: 'Classic Cylinder' },
  { id: 'box', name: 'Modern Box' },
  { id: 'rounded', name: 'Smooth Rounded' }
];

const POT_COLORS = [
  { id: 'terracotta', name: 'Terracotta', hex: '#cb6843' },
  { id: 'white', name: 'Matte White', hex: '#f3f4f6' },
  { id: 'black', name: 'Charcoal Black', hex: '#1f2937' },
  { id: 'blue', name: 'Ocean Blue', hex: '#0369a1' },
  { id: 'green', name: 'Forest Green', hex: '#166534' }
];

export default function PlantPotBuilder() {
  const [selectedPlantId, setSelectedPlantId] = useState(PRODUCTS[0].id);
  const [selectedShape, setSelectedShape] = useState(POT_SHAPES[0].id);
  const [selectedColor, setSelectedColor] = useState(POT_COLORS[0].hex);

  const selectedPlant = PRODUCTS.find(p => p.id === selectedPlantId) || PRODUCTS[0];

  return (
    <div style={{ display: 'flex', minHeight: '80vh', flexDirection: 'row', flexWrap: 'wrap' }}>
      
      {/* 3D Canvas Area */}
      <div style={{ flex: '1 1 60%', minHeight: '500px', background: 'var(--bg-secondary)', position: 'relative' }}>
        <Canvas camera={{ position: [0, 3, 6], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <directionalLight position={[-10, 10, -5]} intensity={0.5} />
          
          <Suspense fallback={null}>
            <Environment preset="city" />
            
            <group position={[0, -1, 0]}>
              <Pot3D color={selectedColor} shape={selectedShape} />
              <PlantSprite3D imageUrl={selectedPlant.image} />
              
              <ContactShadows 
                position={[0, 0, 0]} 
                opacity={0.4} 
                scale={10} 
                blur={2} 
                far={4} 
              />
            </group>
          </Suspense>
          
          <OrbitControls 
            enableZoom={true} 
            minDistance={3} 
            maxDistance={10} 
            maxPolarAngle={Math.PI / 2 - 0.05} // Prevent looking from under the floor
          />
        </Canvas>
        
        {/* Overlay Instructions */}
        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.8)', padding: '8px 16px', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 'bold', pointerEvents: 'none' }}>
          🖱️ Drag to rotate | 📜 Scroll to zoom
        </div>
      </div>

      {/* Controls Sidebar */}
      <div style={{ flex: '1 1 40%', padding: 'var(--space-6)', background: 'var(--bg-primary)', borderLeft: '1px solid var(--border-light)', overflowY: 'auto', maxHeight: '80vh' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-6)', color: 'var(--primary-900)' }}>
          Design Your Perfect Match
        </h2>

        {/* Plant Selection */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-4)' }}>1. Select a Plant</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 'var(--space-3)' }}>
            {PRODUCTS.slice(0, 8).map(plant => (
              <div 
                key={plant.id}
                onClick={() => setSelectedPlantId(plant.id)}
                style={{ 
                  border: selectedPlantId === plant.id ? '2px solid var(--primary-500)' : '2px solid transparent',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
              >
                <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '80px', objectFit: 'cover' }} />
                <div style={{ padding: '4px', fontSize: '0.75rem', textAlign: 'center', background: 'var(--bg-secondary)' }}>
                  {plant.name.substring(0, 12)}...
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pot Shape Selection */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-4)' }}>2. Choose Pot Shape</h3>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            {POT_SHAPES.map(shape => (
              <button
                key={shape.id}
                onClick={() => setSelectedShape(shape.id)}
                style={{
                  flex: 1,
                  padding: 'var(--space-3)',
                  background: selectedShape === shape.id ? 'var(--primary-100)' : 'var(--bg-secondary)',
                  border: selectedShape === shape.id ? '2px solid var(--primary-500)' : '2px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontWeight: selectedShape === shape.id ? 'bold' : 'normal',
                  color: selectedShape === shape.id ? 'var(--primary-700)' : 'inherit'
                }}
              >
                {shape.name}
              </button>
            ))}
          </div>
        </div>

        {/* Pot Color Selection */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-4)' }}>3. Choose Pot Color</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            {POT_COLORS.map(color => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color.hex)}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: color.hex,
                  border: selectedColor === color.hex ? '4px solid var(--primary-400)' : '2px solid var(--border-light)',
                  cursor: 'pointer',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  position: 'relative'
                }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Add to Cart CTA */}
        <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-4)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Combo Total:</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-600)' }}>
              ${(selectedPlant.price + 12.99).toFixed(2)}
            </span>
          </div>
          <button className="btn btn-primary w-100 hover-scale" style={{ padding: '12px' }}>
            Add Custom Combo to Cart
          </button>
        </div>

      </div>
    </div>
  );
}
