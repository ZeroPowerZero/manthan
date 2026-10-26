import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MeshTransmissionMaterial } from '@react-three/drei';

interface ConsciousnessFigureProps {
  motionEnabled: boolean;
}

export const ConsciousnessFigure: React.FC<ConsciousnessFigureProps> = ({ motionEnabled }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const headGlowRef = useRef<THREE.Mesh>(null);
  const godRaysRef = useRef<THREE.Group>(null);

  // Custom procedural upward ecstatic human figure composition
  // Stylized sculptural anatomy: head tilted upward, torso, arched posture, open arms
  const bodyParts = useMemo(() => {
    return {
      // Pelvis / Hips
      pelvis: new THREE.CylinderGeometry(0.28, 0.22, 0.45, 24),
      // Torso / Chest leaning back slightly
      torso: new THREE.CylinderGeometry(0.38, 0.26, 0.85, 24),
      // Chest core / Pectoral curvature
      chest: new THREE.SphereGeometry(0.42, 24, 24),
      // Neck
      neck: new THREE.CylinderGeometry(0.14, 0.16, 0.35, 16),
      // Head tilted back toward cosmos
      head: new THREE.SphereGeometry(0.24, 28, 28),
      // Arms reaching outward and upward
      upperArm: new THREE.CylinderGeometry(0.09, 0.11, 0.65, 16),
      forearm: new THREE.CylinderGeometry(0.07, 0.09, 0.65, 16),
      hand: new THREE.SphereGeometry(0.08, 16, 16),
      // Legs extending downward
      thigh: new THREE.CylinderGeometry(0.16, 0.12, 1.0, 16),
      calf: new THREE.CylinderGeometry(0.12, 0.08, 1.1, 16),
    };
  }, []);

  // Ray geometry for volumetric god-rays
  const rayGeometry = useMemo(() => {
    return new THREE.ConeGeometry(0.8, 4.5, 32, 1, true);
  }, []);

  useFrame((state) => {
    if (!motionEnabled || !groupRef.current) return;

    // Gentle breathing & celestial levitation
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.08 - 0.2;

    // React to pointer with silky smooth lerp
    const targetRotY = state.pointer.x * 0.35;
    const targetRotX = -state.pointer.y * 0.15;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.04);

    // Pulse the core mind & heart glow
    if (coreRef.current) {
      const scale = 1 + Math.sin(t * 2.2) * 0.08;
      coreRef.current.scale.set(scale, scale, scale);
    }
    if (headGlowRef.current) {
      const hScale = 1 + Math.sin(t * 1.7 + 1.0) * 0.06;
      headGlowRef.current.scale.set(hScale, hScale, hScale);
    }

    // Slowly swirl god-rays
    if (godRaysRef.current) {
      godRaysRef.current.rotation.y = t * 0.12;
      godRaysRef.current.rotation.z = Math.sin(t * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* ================= VOLUMETRIC GOD-RAYS RADIATING FROM MIND & CHEST ================= */}
      <group ref={godRaysRef} position={[0, 1.2, -0.1]}>
        {/* Ray 1: Cyan/Magenta upwards */}
        <mesh geometry={rayGeometry} rotation={[Math.PI, 0, 0]}>
          <meshBasicMaterial
            color="#4FD8E8"
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        {/* Ray 2: Magenta angled ray */}
        <mesh geometry={rayGeometry} rotation={[Math.PI * 0.95, 0.4, 0.25]}>
          <meshBasicMaterial
            color="#C13DD6"
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        {/* Ray 3: Gold ray */}
        <mesh geometry={rayGeometry} rotation={[Math.PI * 1.05, -0.5, -0.2]}>
          <meshBasicMaterial
            color="#F2B84B"
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* ================= INNER GLOWING FRESNEL / PRISMATIC CORES ================= */}
      {/* Heart Core */}
      <mesh ref={coreRef} position={[0, 0.85, 0.05]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial
          color="#4FD8E8"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Mind Awakening Core in Head */}
      <mesh ref={headGlowRef} position={[0, 1.48, 0.12]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshBasicMaterial
          color="#C13DD6"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner iridescent spinal ray */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.4, 16]} />
        <meshBasicMaterial
          color="#F2B84B"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ================= SCULPTURAL REFRACTIVE GLASS/CHROME ANATOMY ================= */}
      <group>
        {/* Torso & Chest leaning back */}
        <mesh geometry={bodyParts.torso} position={[0, 0.65, 0]} rotation={[-0.1, 0, 0]}>
          <MeshTransmissionMaterial
            backside
            samples={4}
            resolution={512}
            transmission={0.94}
            roughness={0.15}
            thickness={0.75}
            ior={1.48}
            chromaticAberration={0.09}
            anisotropy={0.3}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#D8C5F5"
            attenuationColor="#4FD8E8"
            attenuationDistance={0.8}
          />
        </mesh>

        <mesh geometry={bodyParts.chest} position={[0, 0.9, 0.06]} scale={[1.05, 0.9, 0.85]}>
          <MeshTransmissionMaterial
            backside
            samples={4}
            resolution={512}
            transmission={0.92}
            roughness={0.18}
            thickness={0.8}
            ior={1.5}
            chromaticAberration={0.12}
            color="#F2E9DB"
            attenuationColor="#C13DD6"
            attenuationDistance={0.7}
          />
        </mesh>

        {/* Neck */}
        <mesh geometry={bodyParts.neck} position={[0, 1.25, 0.04]} rotation={[-0.15, 0, 0]}>
          <meshStandardMaterial
            color="#D8C5F5"
            metalness={0.85}
            roughness={0.2}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Head tilted upward towards the cosmos */}
        <mesh geometry={bodyParts.head} position={[0, 1.48, 0.12]} rotation={[-0.35, 0, 0]}>
          <MeshTransmissionMaterial
            backside
            samples={4}
            resolution={512}
            transmission={0.96}
            roughness={0.12}
            thickness={0.9}
            ior={1.52}
            chromaticAberration={0.14}
            color="#ECE2FA"
            attenuationColor="#4FD8E8"
            attenuationDistance={0.6}
          />
        </mesh>

        {/* Pelvis / Hips */}
        <mesh geometry={bodyParts.pelvis} position={[0, 0.1, -0.02]} rotation={[0.05, 0, 0]}>
          <meshStandardMaterial
            color="#2B2A6B"
            metalness={0.8}
            roughness={0.25}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* LEFT ARM (reaching upward and outward in ecstasy) */}
        <group position={[-0.45, 0.95, 0]}>
          {/* Upper arm */}
          <mesh
            geometry={bodyParts.upperArm}
            position={[-0.25, 0.2, 0.05]}
            rotation={[0.2, 0.1, 0.8]}
          >
            <meshStandardMaterial color="#D8C5F5" metalness={0.7} roughness={0.3} transparent opacity={0.75} />
          </mesh>
          {/* Forearm angled up */}
          <mesh
            geometry={bodyParts.forearm}
            position={[-0.55, 0.55, 0.12]}
            rotation={[0.3, 0.1, 1.1]}
          >
            <meshStandardMaterial color="#D8C5F5" metalness={0.8} roughness={0.25} transparent opacity={0.75} />
          </mesh>
          {/* Hand open */}
          <mesh geometry={bodyParts.hand} position={[-0.8, 0.8, 0.18]}>
            <meshBasicMaterial color="#4FD8E8" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>

        {/* RIGHT ARM (reaching upward and outward in ecstasy) */}
        <group position={[0.45, 0.95, 0]}>
          {/* Upper arm */}
          <mesh
            geometry={bodyParts.upperArm}
            position={[0.25, 0.2, 0.05]}
            rotation={[0.2, -0.1, -0.8]}
          >
            <meshStandardMaterial color="#D8C5F5" metalness={0.7} roughness={0.3} transparent opacity={0.75} />
          </mesh>
          {/* Forearm angled up */}
          <mesh
            geometry={bodyParts.forearm}
            position={[0.55, 0.55, 0.12]}
            rotation={[0.3, -0.1, -1.1]}
          >
            <meshStandardMaterial color="#D8C5F5" metalness={0.8} roughness={0.25} transparent opacity={0.75} />
          </mesh>
          {/* Hand open */}
          <mesh geometry={bodyParts.hand} position={[0.8, 0.8, 0.18]}>
            <meshBasicMaterial color="#C13DD6" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>

        {/* LEFT LEG (tapering downwards) */}
        <group position={[-0.18, 0.0, 0]}>
          <mesh geometry={bodyParts.thigh} position={[-0.05, -0.5, 0.02]} rotation={[0.05, 0, 0.05]}>
            <meshStandardMaterial color="#1B1724" metalness={0.85} roughness={0.2} transparent opacity={0.8} />
          </mesh>
          <mesh geometry={bodyParts.calf} position={[-0.08, -1.45, 0.05]} rotation={[0.08, 0, 0.03]}>
            <meshStandardMaterial color="#17141F" metalness={0.9} roughness={0.15} transparent opacity={0.85} />
          </mesh>
        </group>

        {/* RIGHT LEG */}
        <group position={[0.18, 0.0, 0]}>
          <mesh geometry={bodyParts.thigh} position={[0.05, -0.5, 0.02]} rotation={[0.05, 0, -0.05]}>
            <meshStandardMaterial color="#1B1724" metalness={0.85} roughness={0.2} transparent opacity={0.8} />
          </mesh>
          <mesh geometry={bodyParts.calf} position={[0.08, -1.45, 0.05]} rotation={[0.08, 0, -0.03]}>
            <meshStandardMaterial color="#17141F" metalness={0.9} roughness={0.15} transparent opacity={0.85} />
          </mesh>
        </group>
      </group>

      {/* Floating thought light orbs orbiting around figure */}
      <ThoughtOrbs motionEnabled={motionEnabled} />
    </group>
  );
};

// Subtle orbiting thought points around the figure
const ThoughtOrbs: React.FC<{ motionEnabled: boolean }> = ({ motionEnabled }) => {
  const orbsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!motionEnabled || !orbsRef.current) return;
    const t = state.clock.getElapsedTime();
    orbsRef.current.rotation.y = t * 0.35;
    orbsRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
  });

  return (
    <group ref={orbsRef} position={[0, 0.8, 0]}>
      <mesh position={[1.1, 0.4, 0.3]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#4FD8E8" blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[-1.0, 0.7, -0.4]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#F2B84B" blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[0.2, 1.2, 0.9]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#C13DD6" blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[-0.8, -0.2, 0.8]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#D8C5F5" blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};
