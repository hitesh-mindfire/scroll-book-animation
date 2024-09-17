import { useTexture } from "@react-three/drei";
import React, { forwardRef } from "react";

const BookPage = forwardRef(({ position, rotation }, ref) => {
  const texture = useTexture("/textures/page.webp");
  return (
    <mesh position={position} rotation={rotation} ref={ref}>
      <planeGeometry args={[4, 5]} />
      <meshStandardMaterial map={texture} roughness={0.5} />
    </mesh>
  );
});

export default BookPage;
