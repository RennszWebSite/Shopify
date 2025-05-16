import { useCallback } from "react";
import * as THREE from "three";

type RotationDirection = "left" | "right";

export const useThree = () => {
  let scene: THREE.Scene | null = null;
  let camera: THREE.PerspectiveCamera | null = null;
  let renderer: THREE.WebGLRenderer | null = null;
  let model: THREE.Group | null = null;
  let isInitialized = false;

  const initThree = useCallback((container: HTMLElement) => {
    if (isInitialized || !window.THREE) return;
    
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);
    
    // Create a placeholder cube for demonstration
    // In a real implementation, you would load a 3D model of the product
    const geometry = new THREE.BoxGeometry(2, 3, 0.2);
    
    // Create glass material with refraction
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.9, // Add transparency
      thickness: 0.5, // Add refraction
      envMapIntensity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    
    const cube = new THREE.Mesh(geometry, material);
    model = new THREE.Group();
    model.add(cube);
    scene.add(model);
    
    // Animation loop
    const animate = () => {
      if (!scene || !camera || !renderer || !model) return;
      
      requestAnimationFrame(animate);
      
      // Slight automatic rotation for ambient movement
      model.rotation.y += 0.001;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    isInitialized = true;
    
    // Clean up function
    return () => {
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      
      scene = null;
      camera = null;
      renderer = null;
      model = null;
      isInitialized = false;
    };
  }, []);
  
  const rotateModel = useCallback((direction: RotationDirection) => {
    if (!model) return;
    
    const targetRotation = direction === "left" 
      ? model.rotation.y - Math.PI / 2
      : model.rotation.y + Math.PI / 2;
    
    // Create a tween-like animation for smooth rotation
    const startRotation = model.rotation.y;
    const duration = 1000; // ms
    const startTime = Date.now();
    
    const animateRotation = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      model!.rotation.y = startRotation + (targetRotation - startRotation) * easedProgress;
      
      if (progress < 1) {
        requestAnimationFrame(animateRotation);
      }
    };
    
    animateRotation();
  }, []);
  
  return { initThree, rotateModel };
};
