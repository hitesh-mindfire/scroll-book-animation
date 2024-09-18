import { forwardRef } from "react";
import { Text, useTexture } from "@react-three/drei";

const BookCover = forwardRef(
  ({ position, rotation, text, isBackCover }, ref) => {
    const texture = useTexture("/textures/bookTexture.jpg");

    return (
      <group ref={ref} position={position} rotation={rotation}>
        <mesh position={[2, 0, 0]}>
          <boxGeometry args={[4, 5, 0.2]} />
          <meshStandardMaterial map={texture} roughness={0.5} />
        </mesh>
        {isBackCover ? (
          <Text
            position={[2, 0, -0.2]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            rotation={[0, Math.PI, 0]}
          >
            {text}
          </Text>
        ) : (
          <Text
            position={[2, 0, 0.11]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {text}
          </Text>
        )}
      </group>
    );
  }
);

export default BookCover;
