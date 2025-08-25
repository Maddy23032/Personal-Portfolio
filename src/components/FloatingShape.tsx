import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

interface FloatingShapeProps {
  position: [number, number, number];
  geometry: "box" | "sphere" | "torus";
  color: string;
  scale?: number;
}

const FloatingShape = ({ position, geometry, color, scale = 1 }: FloatingShapeProps) => {
  const meshRef = useRef<Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.5;
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.3;
  });

  const renderGeometry = () => {
    switch (geometry) {
      case "box":
        return <boxGeometry args={[1 * scale, 1 * scale, 1 * scale]} />;
      case "sphere":
        return <sphereGeometry args={[0.7 * scale, 32, 32]} />;
      case "torus":
        return <torusGeometry args={[0.7 * scale, 0.3 * scale, 16, 100]} />;
      default:
        return <boxGeometry args={[1 * scale, 1 * scale, 1 * scale]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      {renderGeometry()}
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

export default FloatingShape;