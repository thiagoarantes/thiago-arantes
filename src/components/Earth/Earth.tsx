import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import styles from "./Earth.module.scss";

const Earth: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current || mountRef.current.children.length > 0) return; // Prevent double mounting

    const currentMount = mountRef.current; // Store ref for cleanup

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.offsetWidth / mountRef.current.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = 1.8; // Even closer for more zoom

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const updateSize = () => {
      if (!mountRef.current) return;

      // Fixed canvas size for Earth window
      const canvasSize = 650;
      renderer.setSize(canvasSize, canvasSize);
      camera.aspect = 1; // Always square
      camera.updateProjectionMatrix();
    };
    updateSize();
    renderer.setClearColor(0xeeeeee); // Same as window background
    rendererRef.current = renderer;
    currentMount.appendChild(renderer.domElement);

    // Create Earth geometry and material
    const geometry = new THREE.SphereGeometry(1, 32, 32);

    // Create monochromatic wireframe material
    const material = new THREE.MeshBasicMaterial({
      color: 0x333333, // Lighter gray wireframe
      wireframe: true,
    });
    const earth = new THREE.Mesh(geometry, material);
    earthRef.current = earth;
    scene.add(earth);

    // No lighting needed for wireframe

    // Add background stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000; // More stars
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      // Create stars in a larger sphere around the planet
      const radius = 20 + Math.random() * 30; // Distance from center
      const theta = Math.random() * Math.PI * 2; // Horizontal angle
      const phi = Math.random() * Math.PI; // Vertical angle

      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta); // x
      starPositions[i + 1] = radius * Math.cos(phi); // y
      starPositions[i + 2] = radius * Math.sin(phi) * Math.sin(theta); // z
    }

    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3)
    );

    const starMaterial = new THREE.PointsMaterial({
      color: 0x666666, // Darker gray stars for better visibility
      size: 1.5, // Slightly larger for better visibility
      sizeAttenuation: false, // Keep star size constant
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Mouse interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging || !earthRef.current) return;

      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y,
      };

      earthRef.current.rotation.y += deltaMove.x * 0.01;
      earthRef.current.rotation.x += deltaMove.y * 0.01;

      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const scale = event.deltaY > 0 ? 0.9 : 1.1;
      camera.position.z *= scale;
      camera.position.z = Math.max(1.5, Math.min(10, camera.position.z));
    };

    renderer.domElement.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("wheel", handleWheel);

    // Animation loop
    const animate = () => {
      if (!earthRef.current || !rendererRef.current || !sceneRef.current) {
        return;
      }

      // No automatic rotation - only manual interaction

      rendererRef.current.render(sceneRef.current, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      updateSize();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      renderer.domElement.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);

      if (currentMount && renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }

      renderer.dispose();
      geometry.dispose();
      material.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
    };
  }, []);

  return (
    <div className={styles.earthContainer}>
      <div className={styles.earthInfo}>
        Drag to rotate • Scroll to zoom • Explore planet Earth
      </div>
      <div ref={mountRef} className={styles.earthCanvas} />
    </div>
  );
};

export default Earth;
