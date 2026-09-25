import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParticleBackgroundProps {
  isAccelerating?: boolean;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ isAccelerating = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(1);

  useEffect(() => {
    speedRef.current = isAccelerating ? 6 : 1;
  }, [isAccelerating]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 400;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x050505, 0);
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // 1. Particle Constellation
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const crimson = new THREE.Color(0xff2a54);
    const violet = new THREE.Color(0x7928ca);
    const silver = new THREE.Color(0xd1d5db);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 1600;
      positions[i3 + 1] = (Math.random() - 0.5) * 1000;
      positions[i3 + 2] = (Math.random() - 0.5) * 800;

      // Color distribution: mostly silver dust, some crimson, some violet
      const r = Math.random();
      const c = r < 0.6 ? silver : r < 0.85 ? crimson : violet;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle sprite texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.3, 'rgba(255,255,255,0.7)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 3.5,
      map: texture,
      transparent: true,
      vertexColors: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 2. Floating 3D holographic movie planes / cards
    const planesGroup = new THREE.Group();
    const planeGeo = new THREE.PlaneGeometry(36, 52);
    const planeMaterials: THREE.MeshBasicMaterial[] = [];

    const posterHues = [0xff2a54, 0x7928ca, 0x38bdf8, 0xe50914, 0x9333ea];

    for (let i = 0; i < 9; i++) {
      const color = posterHues[i % posterHues.length];
      const mat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
        wireframe: i % 2 === 0
      });
      planeMaterials.push(mat);

      const mesh = new THREE.Mesh(planeGeo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 800,
        (Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 400 - 100
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.userData = {
        rotX: (Math.random() - 0.5) * 0.005,
        rotY: (Math.random() - 0.5) * 0.005,
        speedY: (Math.random() - 0.5) * 0.2
      };
      planesGroup.add(mesh);
    }
    scene.add(planesGroup);

    // 3. Ambient soft orbs
    const sphereGeo = new THREE.SphereGeometry(60, 24, 24);
    const orbMat1 = new THREE.MeshBasicMaterial({
      color: 0xff2a54,
      transparent: true,
      opacity: 0.04,
      wireframe: true
    });
    const orb1 = new THREE.Mesh(sphereGeo, orbMat1);
    orb1.position.set(-260, 140, -150);
    scene.add(orb1);

    const orbMat2 = new THREE.MeshBasicMaterial({
      color: 0x7928ca,
      transparent: true,
      opacity: 0.04,
      wireframe: true
    });
    const orb2 = new THREE.Mesh(sphereGeo, orbMat2);
    orb2.position.set(280, -120, -180);
    scene.add(orb2);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseX = (e.clientX - halfW) / halfW;
      mouseY = (e.clientY - halfH) / halfH;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    let currentSpeed = 1;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth transition for acceleration
      currentSpeed += (speedRef.current - currentSpeed) * 0.08;

      targetX += (mouseX * 40 - targetX) * 0.04;
      targetY += (-mouseY * 30 - targetY) * 0.04;

      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Rotate particle cloud
      particles.rotation.y += 0.0006 * currentSpeed;
      particles.rotation.x += 0.0003 * currentSpeed;

      // Floating planes
      planesGroup.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        mesh.rotation.x += mesh.userData.rotX * currentSpeed;
        mesh.rotation.y += mesh.userData.rotY * currentSpeed;
        mesh.position.y += Math.sin(Date.now() * 0.001 + mesh.position.x) * 0.15;
      });

      orb1.rotation.y += 0.002 * currentSpeed;
      orb2.rotation.x += 0.002 * currentSpeed;

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      planeGeo.dispose();
      planeMaterials.forEach(m => m.dispose());
      sphereGeo.dispose();
      orbMat1.dispose();
      orbMat2.dispose();
      texture.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    />
  );
};
