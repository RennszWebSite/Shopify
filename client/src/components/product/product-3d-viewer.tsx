import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
// Import OrbitControls properly
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Product3DViewerProps {
  modelPath: string;
  className?: string;
  height?: number;
  autoRotate?: boolean;
}

const Product3DViewer = ({
  modelPath,
  className = "",
  height = 500,
  autoRotate = true
}: Product3DViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRotating, setIsRotating] = useState(autoRotate);
  const [error, setError] = useState<string | null>(null);
  
  // Scene state references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const frameIdRef = useRef<number | null>(null);

  // Setup the 3D scene
  useEffect(() => {
    if (!containerRef.current) return;
    
    try {
      const container = containerRef.current;
      
      // Create scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      scene.background = new THREE.Color(0x000000);
      
      // Add ambient lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      // Add directional lighting for shadows
      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight1.position.set(0, 1, 0.5);
      scene.add(directionalLight1);
      
      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight2.position.set(0, 0, -1);
      scene.add(directionalLight2);

      // Add accent lights for dramatic effect
      const pointLight1 = new THREE.PointLight(0x00ffff, 0.8, 15); // Cyan
      pointLight1.position.set(5, 5, 5);
      scene.add(pointLight1);
      
      const pointLight2 = new THREE.PointLight(0xff00ff, 0.8, 15); // Magenta
      pointLight2.position.set(-5, -5, 5);
      scene.add(pointLight2);
      
      // Setup camera
      const aspect = container.clientWidth / container.clientHeight;
      const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
      cameraRef.current = camera;
      camera.position.set(0, 0, 5);
      
      // Setup renderer
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
      });
      rendererRef.current = renderer;
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);
      
      // Create grid for reference
      const gridHelper = new THREE.GridHelper(10, 10, 0x404040, 0x404040);
      gridHelper.position.y = -1;
      scene.add(gridHelper);
      
      // Setup orbit controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controlsRef.current = controls;
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = isRotating;
      controls.autoRotateSpeed = 3;
      
      // Load model
      // For this example, we'll create a placeholder cube
      // In a real implementation, you would use a GLTFLoader to load the model
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        wireframe: false,
        specular: 0x111111,
        shininess: 50
      });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      modelRef.current = cube;
      
      // Animation loop
      const animate = () => {
        frameIdRef.current = requestAnimationFrame(animate);
        
        if (controlsRef.current) {
          controlsRef.current.update();
        }
        
        if (rendererRef.current && cameraRef.current && sceneRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      };
      
      animate();
      setIsLoading(false);
      
      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
        
        const container = containerRef.current;
        const camera = cameraRef.current;
        const renderer = rendererRef.current;
        
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        
        if (frameIdRef.current) {
          cancelAnimationFrame(frameIdRef.current);
        }
        
        if (rendererRef.current && rendererRef.current.domElement) {
          if (container.contains(rendererRef.current.domElement)) {
            container.removeChild(rendererRef.current.domElement);
          }
          
          rendererRef.current.dispose();
        }
      };
    } catch (err) {
      console.error('Error setting up 3D viewer:', err);
      setError('Failed to initialize 3D viewer. Please try again.');
      setIsLoading(false);
    }
  }, [modelPath]);

  // Update auto-rotation when isRotating changes
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isRotating;
    }
  }, [isRotating]);

  const handleToggleRotation = () => {
    setIsRotating(prev => !prev);
  };
  
  // Controls to rotate model manually
  const handleRotateLeft = () => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.2;
    }
  };
  
  const handleRotateRight = () => {
    if (modelRef.current) {
      modelRef.current.rotation.y -= 0.2;
    }
  };
  
  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-white font-bebas tracking-wider">LOADING 3D MODEL</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
          <div className="text-center max-w-xs mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-white font-archivo">{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-white text-black font-bebas text-sm tracking-wider hover:bg-opacity-90 transition-all"
              onClick={() => window.location.reload()}
            >
              RETRY
            </button>
          </div>
        </div>
      )}
      
      <div 
        ref={containerRef} 
        className="w-full bg-black overflow-hidden rounded-sm relative" 
        style={{ height }}
      ></div>
      
      {/* Controls overlay */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 pointer-events-none">
        <motion.button
          className="bg-black bg-opacity-50 backdrop-blur-sm text-white px-4 py-2 rounded-sm font-bebas tracking-wider pointer-events-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRotateLeft}
          data-hover="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.button>
        
        <motion.button
          className="bg-black bg-opacity-50 backdrop-blur-sm text-white px-4 py-2 rounded-sm font-bebas tracking-wider pointer-events-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleRotation}
          data-hover="true"
        >
          {isRotating ? 'PAUSE' : 'AUTO-ROTATE'}
        </motion.button>
        
        <motion.button
          className="bg-black bg-opacity-50 backdrop-blur-sm text-white px-4 py-2 rounded-sm font-bebas tracking-wider pointer-events-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRotateRight}
          data-hover="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default Product3DViewer;