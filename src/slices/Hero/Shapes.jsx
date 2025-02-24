"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { gsap } from "gsap";

export function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
}
function Geometries() {
  const geometries = [
      {
        geometry: new THREE.TorusKnotGeometry(2, .7, 26, 8), //Gem
      position: [0, 0, 0],
      r: .3,
    },
    {
        geometry: new THREE.CapsuleGeometry(0.4, .9, 2, 16), // Pill
        position: [1, -1, 4],
        r: 0.5,
      },
      {
        geometry: new THREE.ConeGeometry( 1, 3, 32 ), // a cone
        position: [-1.4, 3, -4],
        r: 0.4,
      },
      {
          geometry: new THREE.TorusGeometry(.5, 0.25, 25, 132), // Donut
        position: [-0.8, -0.75, 5],
        r: 0.45,
      },
      {
          geometry: new THREE.OctahedronGeometry(1.5), // Diamond
        position: [1.6, 1.6, -4],
        r: 0.55,
      },
    ];

  const materials = [
    new THREE.MeshNormalMaterial( {metalness: 0.5} ),
    new THREE.MeshStandardMaterial({ color: 0xe67e22, roughness: 0.1, metalness: .5 }),
    new THREE.MeshStandardMaterial({ color: 0x2980b9, roughness: 0.4, metalness: .9 }),
    new THREE.MeshStandardMaterial({ color: 0x9b59b6, roughness: 0.1, metalness: .5 }),
    new THREE.MeshStandardMaterial({ color: 0x34495e, roughness: 0.1, metalness: .5 }),
    new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0.1, metalness: .5 }),
    ];

  return geometries.map(({ position, r, geometry }) => (
    <Geometry
      key={JSON.stringify(position)}
      position={position.map((p) => p * 2)}
      geometry={geometry}
      materials={materials}
      r={r}
    />
  ));
}

function Geometry({ r, position, geometry, materials }) {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);

  const strartingMaterial = getRandomMaterial();

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }

  function handleClick(e) {
    const mesh = e.object;

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: 1.3,
      ease: "elastic.out(1,0.3)",
      yoyo: true,
    });
    mesh.material = getRandomMaterial();
  }

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };
  const handlePointerOut = () => {
    document.body.style.cursor = "defualt";
  };

  useEffect(() => {
   let ctx = gsap.context(() => {
        setVisible(true)
        gsap.from(meshRef.current.scale,
            {
                x: 0,
                y: 0,
                z: 0,
                duration: gsap.utils.random(0.8, 1.2),
                ease: "elastic.out(1,0.3)",
                delay: gsap.utils.random(0.05),
            });
    });
    return () => ctx.revert()  //cleanup
  }, [])

  return (
    <group position={position} ref={meshRef}>
      <Float speed={10 * r} roatationIntensity={6 * r} floatIntensity={15 * r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
          material={strartingMaterial}
        />
      </Float>
    </group>
  );
}

export default Shapes;
