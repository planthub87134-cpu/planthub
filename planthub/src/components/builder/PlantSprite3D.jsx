import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useTexture, Billboard } from '@react-three/drei';

export default function PlantSprite3D({ imageUrl, position = [0, 2.2, 0], scale = 2.2 }) {
  const texture = useTexture(imageUrl);
  
  // Create a circular alpha map to cut out the square Unsplash image nicely
  const alphaMap = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Fill black (transparent)
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 256, 256);
    
    // Draw white circle (opaque)
    ctx.beginPath();
    ctx.arc(128, 128, 128, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    
    const alphaTexture = new THREE.CanvasTexture(canvas);
    return alphaTexture;
  }, []);

  return (
    <Billboard position={position}>
      <mesh castShadow>
        <planeGeometry args={[scale, scale]} />
        <meshStandardMaterial 
          map={texture} 
          alphaMap={alphaMap}
          transparent 
          alphaTest={0.1} 
          side={THREE.DoubleSide} 
          roughness={0.8}
        />
      </mesh>
    </Billboard>
  );
}
