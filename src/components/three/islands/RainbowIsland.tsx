// ============================================================
// INNER WORLDS – Rainbow Island 3D Scene
// Emotion: Identität (Identity)
// ============================================================
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RainbowArc() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const shader = useMemo(() => ({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;
      void main() {
        float t = vUv.x + uTime * 0.05;
        vec3 rainbow;
        float band = mod(t * 7.0, 7.0);
        if (band < 1.0) rainbow = vec3(1.0, 0.0, 0.0);
        else if (band < 2.0) rainbow = vec3(1.0, 0.5, 0.0);
        else if (band < 3.0) rainbow = vec3(1.0, 1.0, 0.0);
        else if (band < 4.0) rainbow = vec3(0.0, 0.8, 0.0);
        else if (band < 5.0) rainbow = vec3(0.0, 0.5, 1.0);
        else if (band < 6.0) rainbow = vec3(0.3, 0.0, 0.8);
        else rainbow = vec3(0.5, 0.0, 0.5);
        float fade = smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
        gl_FragColor = vec4(rainbow, fade * 0.6);
      }
    `,
  }), []);

  return (
    <mesh ref={meshRef} position={[0, 5, -8]} rotation={[0, 0, 0]}>
      <torusGeometry args={[8, 0.8, 8, 64, Math.PI]} />
      <shaderMaterial {...shader} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

function ColorChangingTerrain() {
  const ref = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (ref.current) ref.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
      <planeGeometry args={[30, 30, 32, 32]} />
      <shaderMaterial
        ref={ref}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          vec3 hsv2rgb(vec3 c) {
            vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
            vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
            return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
          }
          void main() {
            float hue = fract(length(vUv - 0.5) * 2.0 + uTime * 0.05);
            vec3 color = hsv2rgb(vec3(hue, 0.3, 0.4));
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}

function FloatingMasks() {
  const count = 8;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const masks = useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: 5 + Math.random() * 2,
      height: 2 + Math.random() * 3,
      speed: 0.2 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
    })),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const m = masks[i];
      const angle = m.angle + time * m.speed;
      dummy.position.set(
        Math.cos(angle) * m.radius,
        m.height + Math.sin(time + m.phase) * 0.5,
        Math.sin(angle) * m.radius
      );
      dummy.rotation.y = angle + Math.PI;
      dummy.scale.set(0.5, 0.6, 0.1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1.2, 0.2]} />
      <meshStandardMaterial
        color="white"
        transparent
        opacity={0.5}
      />
    </instancedMesh>
  );
}

function CrystalFormations() {
  const colors = ['#E91E63', '#9C27B0', '#2196F3', '#4CAF50', '#FF9800', '#00BCD4'];

  return (
    <group>
      {colors.map((color, i) => {
        const angle = (i / colors.length) * Math.PI * 2;
        const pos: [number, number, number] = [Math.cos(angle) * 3, 0, Math.sin(angle) * 3];
        return (
          <group key={i} position={pos}>
            <mesh position={[0, 0.6, 0]} rotation={[0, angle, 0.1]}>
              <octahedronGeometry args={[0.4, 0]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.3}
                transparent
                opacity={0.8}
              />
            </mesh>
            <pointLight position={[0, 0.6, 0]} intensity={0.3} color={color} distance={3} />
          </group>
        );
      })}
    </group>
  );
}

export default function RainbowScene() {
  return (
    <group>
      <ColorChangingTerrain />
      <RainbowArc />
      <FloatingMasks />
      <CrystalFormations />

      {/* Wind chime particles */}
      <pointLight position={[0, 8, 0]} intensity={0.5} color="#FFF9C4" />
      <pointLight position={[-3, 3, 3]} intensity={0.3} color="#E91E63" />
      <pointLight position={[3, 3, -3]} intensity={0.3} color="#2196F3" />
    </group>
  );
}
