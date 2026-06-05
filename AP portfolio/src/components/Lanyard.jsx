/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

import cardGLB from '../assets/lanyard/card.glb';
import lanyardTexture from '../assets/lanyard/lanyard.png';
import heroImg from '../assets/hero.png';

import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

function buildCardTexture(heroSrc) {
  return new Promise(resolve => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    const bg = ctx.createLinearGradient(0, 0, 0, 1024);
    bg.addColorStop(0, '#18011F');
    bg.addColorStop(0.5, '#7621B0');
    bg.addColorStop(1, '#3a0a4e');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1024, 1024);

    const accent = ctx.createLinearGradient(0, 0, 1024, 0);
    accent.addColorStop(0, 'rgba(182,0,168,0.45)');
    accent.addColorStop(1, 'rgba(190,76,0,0.35)');
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, 1024, 170);

    const finish = () => {
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 88px sans-serif';
      ctx.fillText('ANRUNYA', 512, 840);
      ctx.font = '500 54px sans-serif';
      ctx.fillStyle = 'rgba(215,226,234,0.85)';
      ctx.fillText('PATOLE', 512, 910);
      ctx.font = '30px sans-serif';
      ctx.fillStyle = 'rgba(215,226,234,0.4)';
      ctx.fillText('Data Analytics · Virginia Tech', 512, 968);
      // Flip the texture horizontally to correct the card mesh's mirrored UV mapping
      const tex = new THREE.CanvasTexture(canvas);
      tex.repeat.set(-1, 1);
      tex.offset.set(1, 0);
      resolve(tex);
    };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const r = 230, cx = 512, cy = 470;
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip();
      const scale = Math.max((r * 2) / img.width, (r * 2) / img.height);
      ctx.drawImage(img, cx - (img.width * scale) / 2, cy - (img.height * scale) / 2, img.width * scale, img.height * scale);
      ctx.restore();

      const glow = ctx.createRadialGradient(cx, cy, r - 2, cx, cy, r + 22);
      glow.addColorStop(0, 'rgba(182,0,168,0.65)');
      glow.addColorStop(1, 'rgba(182,0,168,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, r + 22, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
      finish();
    };
    img.onerror = finish;
    img.src = heroSrc;
  });
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
}) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );
  const [cardTexture, setCardTexture] = useState(null);
  const [rapierReady, setRapierReady] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Pre-initialize Rapier WASM before Physics mounts — avoids suspend-react
  // compatibility issues with R3F v8 in React 18.
  useEffect(() => {
    import('@dimforge/rapier3d-compat')
      .then(R => R.init())
      .then(() => setRapierReady(true))
      .catch(err => console.error('[Lanyard] rapier init:', err));
  }, []);

  useEffect(() => {
    buildCardTexture(heroImg).then(setCardTexture).catch(() => {});
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={Math.PI} />

        {/* Only mount Physics after WASM is ready — prevents suspend conflicts */}
        {rapierReady && (
          <Suspense fallback={null}>
            <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
              <Band isMobile={isMobile} cardTexture={cardTexture} />
            </Physics>
            <Environment blur={0.75}>
              <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
              <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
              <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
              <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
            </Environment>
          </Suspense>
        )}
      </Canvas>
    </div>
  );
}

const WALL_X = -1.8; // left physics wall in world-space units

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, cardTexture = null }) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef(),
    wallMesh = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyardTexture);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });

      // Wall glow: brighten when card is near the left boundary
      if (wallMesh.current) {
        const dist = card.current.translation().x - WALL_X;
        const t = Math.max(0, 1 - dist / 1.5);
        wallMesh.current.material.opacity = 0.05 + t * 0.75;
        wallMesh.current.material.emissiveIntensity = 0.2 + t * 7;
      }
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      {/* Left physics wall — card bounces off the boundary facing the timeline */}
      <RigidBody type="fixed" position={[WALL_X, 0, 0]} colliders={false}>
        <CuboidCollider args={[0.05, 10, 4]} />
      </RigidBody>
      {/* Glow line for the wall — opacity/intensity driven by card proximity in useFrame */}
      <mesh ref={wallMesh} position={[WALL_X + 0.04, 0, -0.05]}>
        <planeGeometry args={[0.04, 16]} />
        <meshStandardMaterial
          color="#B600A8"
          emissive="#B600A8"
          emissiveIntensity={0.2}
          transparent
          opacity={0.05}
          depthWrite={false}
          side={2}
        />
      </mesh>

      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        {/* Joints arranged vertically so card hangs centered under the anchor */}
        <RigidBody position={[0, -0.5, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -1.0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -1.5, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[0, -2.5, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(
                new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))
              )
            )}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardTexture || materials.base.map}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
