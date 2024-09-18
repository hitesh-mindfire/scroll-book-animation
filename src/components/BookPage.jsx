import { useTexture } from "@react-three/drei";
import React, { forwardRef } from "react";

const BookPage = forwardRef(({ position, rotation }, ref) => {
  const texture = useTexture("/textures/page.webp");

  return (
    <group position={position} rotation={rotation} ref={ref}>
      <mesh position={[2, 0, 0]}>
        <planeGeometry args={[4, 5]} />
        <meshStandardMaterial map={texture} roughness={2} />
      </mesh>
    </group>
  );
});

export default BookPage;
