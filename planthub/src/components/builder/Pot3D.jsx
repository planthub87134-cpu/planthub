import React, { useRef } from 'react';

export default function Pot3D({ color, shape, position = [0, 0, 0] }) {
  const meshRef = useRef();

  return (
    <group position={position}>
      {shape === 'cylinder' && (
        <mesh ref={meshRef} castShadow receiveShadow position={[0, 0.75, 0]}>
          <cylinderGeometry args={[1, 0.8, 1.5, 32]} />
          <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
        </mesh>
      )}
      
      {shape === 'box' && (
        <mesh ref={meshRef} castShadow receiveShadow position={[0, 0.75, 0]}>
          <boxGeometry args={[1.6, 1.5, 1.6]} />
          <meshStandardMaterial color={color} roughness={0.8} metalness={0.1} />
        </mesh>
      )}

      {shape === 'rounded' && (
        <mesh ref={meshRef} castShadow receiveShadow position={[0, 0.75, 0]}>
          <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.75]} />
          <meshStandardMaterial color={color} roughness={0.6} metalness={0.2} side={2} />
        </mesh>
      )}
      
      {/* Dirt surface inside the pot */}
      <mesh position={[0, 1.48, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        {shape === 'cylinder' && <circleGeometry args={[0.95, 32]} />}
        {shape === 'box' && <planeGeometry args={[1.5, 1.5]} />}
        {shape === 'rounded' && <circleGeometry args={[0.95, 32]} />}
        <meshStandardMaterial color="#2d1a11" roughness={1} />
      </mesh>
    </group>
  );
}
