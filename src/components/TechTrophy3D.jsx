/* ============================================================
   TechTrophy3D.jsx — Nirmaan 2026 Interactive 3D Trophy Showcase
   ============================================================ */

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function TechTrophy3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 340;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.25, 5.8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Environment Lighting Map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color('#FFF5EA');
    const envRt = pmremGenerator.fromScene(envScene);
    scene.environment = envRt.texture;

    // Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffd23f,
      metalness: 0.85,
      roughness: 0.18,
    });

    const accentGoldMat = new THREE.MeshStandardMaterial({
      color: 0xffb703,
      metalness: 0.92,
      roughness: 0.12,
    });

    const darkBaseMat = new THREE.MeshStandardMaterial({
      color: 0x111115,
      metalness: 0.3,
      roughness: 0.4,
    });

    // Main Trophy Group
    const trophyGroup = new THREE.Group();

    // 1. Octagonal Pedestal Base
    const baseGeo = new THREE.CylinderGeometry(0.75, 0.9, 0.45, 8);
    const baseMesh = new THREE.Mesh(baseGeo, darkBaseMat);
    baseMesh.position.y = -1.2;
    trophyGroup.add(baseMesh);

    // 2. Stem Rings & Beads
    const ring1 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.12, 24), goldMat);
    ring1.position.y = -0.88;
    trophyGroup.add(ring1);

    const stemPoints = [
      new THREE.Vector2(0.2, -0.82),
      new THREE.Vector2(0.35, -0.62),
      new THREE.Vector2(0.22, -0.42),
      new THREE.Vector2(0.38, -0.22),
      new THREE.Vector2(0.25, -0.05),
    ];
    const stemGeo = new THREE.LatheGeometry(stemPoints, 32);
    const stemMesh = new THREE.Mesh(stemGeo, goldMat);
    trophyGroup.add(stemMesh);

    // 3. Main Fluted Trophy Bowl (Goblet Shape)
    const cupPoints = [
      new THREE.Vector2(0.25, -0.05),
      new THREE.Vector2(0.48, 0.25),
      new THREE.Vector2(0.72, 0.7),
      new THREE.Vector2(0.8, 0.95),
      new THREE.Vector2(0.78, 0.97),
      new THREE.Vector2(0.68, 0.7),
      new THREE.Vector2(0.44, 0.25),
      new THREE.Vector2(0.22, -0.05),
    ];
    const cupGeo = new THREE.LatheGeometry(cupPoints, 36);
    const cupMesh = new THREE.Mesh(cupGeo, goldMat);
    trophyGroup.add(cupMesh);

    // Waist Torus Rings
    const waistRing = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.032, 12, 32), accentGoldMat);
    waistRing.position.y = 0.35;
    waistRing.rotation.x = Math.PI / 2;
    trophyGroup.add(waistRing);

    // Star Medallion Emblem
    const starShape = new THREE.Shape();
    const ePoints = 5;
    for (let i = 0; i < ePoints * 2; i++) {
      const r = i % 2 === 0 ? 0.15 : 0.065;
      const a = (i / (ePoints * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) starShape.moveTo(x, y);
      else starShape.lineTo(x, y);
    }
    starShape.closePath();

    const starGeo = new THREE.ExtrudeGeometry(starShape, {
      depth: 0.035,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.012,
      bevelThickness: 0.012,
    });
    starGeo.center();

    const frontStar = new THREE.Mesh(starGeo, accentGoldMat);
    frontStar.position.set(0, 0.55, 0.71);
    trophyGroup.add(frontStar);

    // 4. Domed Conical Lid & Crown Finial
    const lidPoints = [
      new THREE.Vector2(0.78, 0.95),
      new THREE.Vector2(0.6, 1.15),
      new THREE.Vector2(0.3, 1.4),
      new THREE.Vector2(0.12, 1.6),
      new THREE.Vector2(0.0, 1.65),
    ];
    const lidGeo = new THREE.LatheGeometry(lidPoints, 32);
    const lidMesh = new THREE.Mesh(lidGeo, goldMat);
    trophyGroup.add(lidMesh);

    const finialCrownGeo = new THREE.ConeGeometry(0.18, 0.45, 12);
    const finialCrownMesh = new THREE.Mesh(finialCrownGeo, accentGoldMat);
    finialCrownMesh.position.y = 1.85;
    trophyGroup.add(finialCrownMesh);

    // 5. Symmetric Curved Handles
    const createHandle = (isRight) => {
      const sign = isRight ? 1 : -1;
      const handleGroup = new THREE.Group();
      const path = new THREE.CatmullRomCurve3([
        new THREE.Vector3(sign * 0.70, 0.88, 0),
        new THREE.Vector3(sign * 1.10, 0.60, 0),
        new THREE.Vector3(sign * 0.92, 0.20, 0),
        new THREE.Vector3(sign * 0.22, -0.05, 0),
      ]);
      const tubeGeo = new THREE.TubeGeometry(path, 32, 0.048, 16, false);
      const mesh = new THREE.Mesh(tubeGeo, goldMat);
      handleGroup.add(mesh);
      return handleGroup;
    };

    trophyGroup.add(createHandle(true));
    trophyGroup.add(createHandle(false));

    scene.add(trophyGroup);

    // Natural Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffae6, 1.8);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffaa00, 1.1);
    fillLight.position.set(-5, 4, 4);
    scene.add(fillLight);

    // Animation Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      trophyGroup.rotation.y += 0.006;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW > 0 && newH > 0) {
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      pmremGenerator.dispose();
      envRt.texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="trophy-3d-wrapper">
      <div ref={mountRef} className="trophy-canvas-mount" />
      
      <div className="trophy-badge-overlay">
        <span className="trophy-badge-title">3D CREATIVE INSTRUMENT</span>
        <span className="trophy-badge-sub">INTERACTIVE ARTIFACT</span>
      </div>

      <style>{`
        .trophy-3d-wrapper {
          position: relative;
          width: 100%;
          height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: rgba(244, 233, 225, 0.4);
          border-radius: 20px;
          border: 2px solid rgba(0, 0, 0, 0.1);
        }

        .trophy-canvas-mount {
          width: 100%;
          height: 100%;
        }

        .trophy-badge-overlay {
          position: absolute;
          bottom: 12px;
          left: 14px;
          background: rgba(17, 17, 15, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          padding: 6px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .trophy-badge-title {
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 900;
          color: var(--color-yellow);
          letter-spacing: 0.08em;
        }

        .trophy-badge-sub {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          color: rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </div>
  );
}
