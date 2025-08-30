import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Define types
interface SubjectData {
  title: string;
  description: string;
  color: string;
  icon: string;
  darkColor: string;
  modelConfig: {
    type: string;
    properties?: any;
  };
}

interface SubjectCardProps {
  subject: SubjectData;
  isSelected: boolean;
  onClick: () => void;
  isDarkMode: boolean;
}

interface SceneProps {
  subject: SubjectData | null;
  isDarkMode: boolean;
}

interface SciencePageProps {
  isDarkMode: boolean;
}

// Subject data with 3D model configurations
const subjects: SubjectData[] = [
  {
    title: "Physics",
    description: "Explore the laws of motion, energy, and forces that govern our universe.",
    color: "bg-blue-500",
    darkColor: "bg-blue-700",
    icon: "⚛️",
    modelConfig: {
      type: "solarSystem",
      properties: {
        showOrbits: true,
        planetCount: 6
      }
    }
  },
  {
    title: "Chemistry",
    description: "Discover elements, compounds, and reactions that form the basis of matter.",
    color: "bg-red-500",
    darkColor: "bg-red-700",
    icon: "🧪",
    modelConfig: {
      type: "molecule",
      properties: {
        atoms: ["C", "H", "H", "H", "H"], // Methane CH4
        bonds: [
          [0, 1], [0, 2], [0, 3], [0, 4]
        ]
      }
    }
  },
  {
    title: "Mathematics",
    description: "Dive into numbers, equations, and patterns that describe our world.",
    color: "bg-green-500",
    darkColor: "bg-green-700",
    icon: "∫",
    modelConfig: {
      type: "geometricShapes",
      properties: {
        shapes: ["sphere", "cube", "cone", "torus"]
      }
    }
  },
  {
    title: "Biology",
    description: "Study living organisms, their structure, function, and evolution.",
    color: "bg-purple-500",
    darkColor: "bg-purple-700",
    icon: "🧬",
    modelConfig: {
      type: "dna",
      properties: {
        helixCount: 2,
        basePairs: 10
      }
    }
  },
  {
    title: "Zoology",
    description: "Learn about animal life, classification, behavior, and habitats.",
    color: "bg-yellow-500",
    darkColor: "bg-yellow-700",
    icon: "🐾",
    modelConfig: {
      type: "animalCell",
      properties: {
        showOrganelles: true
      }
    }
  }
];

// Subject Card Component
const SubjectCard: React.FC<SubjectCardProps> = ({ subject, isSelected, onClick, isDarkMode }) => {
  return (
    <div 
      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 transform ${
        isSelected 
          ? `scale-105 shadow-2xl ${isDarkMode ? subject.darkColor : subject.color}`
          : `shadow-lg hover:shadow-xl ${isDarkMode ? 'bg-gray-800' : subject.color}`
      } text-white`}
      onClick={onClick}
    >
      <div className="text-3xl mb-2">{subject.icon}</div>
      <h3 className="text-xl font-bold">{subject.title}</h3>
    </div>
  );
};

// 3D Scene Component
const Scene: React.FC<SceneProps> = ({ subject, isDarkMode }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationRef = useRef<number | null>(null);

  // Helper function to create cylinders between two points
  const createCylinderBetweenPoints = (
    scene: THREE.Scene, 
    point1: THREE.Vector3, 
    point2: THREE.Vector3, 
    radius: number, 
    color: number
  ) => {
    const direction = new THREE.Vector3().subVectors(point2, point1);
    const length = direction.length();
    
    const geometry = new THREE.CylinderGeometry(radius, radius, length, 8);
    const material = new THREE.MeshPhongMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    
    // Position the cylinder
    const midpoint = new THREE.Vector3().addVectors(point1, point2).multiplyScalar(0.5);
    mesh.position.copy(midpoint);
    
    // Orient the cylinder
    mesh.lookAt(point2);
    mesh.rotateX(Math.PI / 2); // Cylinder is oriented along Y-axis by default
    
    scene.add(mesh);
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize Three.js
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    
    mountRef.current.appendChild(renderer.domElement);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Clean up
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current || !subject) return;

    // Clear previous objects
    while (sceneRef.current.children.length > 2) { // Keep lights
      sceneRef.current.remove(sceneRef.current.children[2]);
    }

    // Create 3D model based on subject
    switch (subject.modelConfig.type) {
      case "solarSystem":
        createSolarSystem(sceneRef.current);
        break;
      case "molecule":
        createMolecule(sceneRef.current, subject.modelConfig.properties);
        break;
      case "geometricShapes":
        createGeometricShapes(sceneRef.current);
        break;
      case "dna":
        createDNA(sceneRef.current);
        break;
      case "animalCell":
        createAnimalCell(sceneRef.current);
        break;
      default:
        createDefaultModel(sceneRef.current);
    }
  }, [subject]);

  const createSolarSystem = (scene: THREE.Scene) => {
    // Sun
    const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Planets
    const planets = [
      { size: 0.2, color: 0x888888, distance: 2, speed: 0.01 },
      { size: 0.4, color: 0xffa500, distance: 3, speed: 0.008 },
      { size: 0.4, color: 0x0000ff, distance: 4, speed: 0.006 },
      { size: 0.3, color: 0xff0000, distance: 5, speed: 0.004 },
      { size: 1, color: 0xffd700, distance: 6, speed: 0.002 },
      { size: 0.8, color: 0x00ffff, distance: 7, speed: 0.001 }
    ];

    planets.forEach((planet, i) => {
      const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
      const material = new THREE.MeshPhongMaterial({ color: planet.color });
      const mesh = new THREE.Mesh(geometry, material);
      
      // Position in orbit
      mesh.position.x = planet.distance;
      
      // Add to scene
      scene.add(mesh);
      
      // Add orbit line
      const orbitGeometry = new THREE.RingGeometry(planet.distance - 0.01, planet.distance + 0.01, 64);
      const orbitMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3
      });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2;
      scene.add(orbit);
      
      // Animation
      const animatePlanet = () => {
        if (animationRef.current) {
          requestAnimationFrame(animatePlanet);
          mesh.position.x = Math.cos(Date.now() * planet.speed * 0.001) * planet.distance;
          mesh.position.z = Math.sin(Date.now() * planet.speed * 0.001) * planet.distance;
        }
      };
      animatePlanet();
    });
  };

  const createMolecule = (scene: THREE.Scene, properties: any) => {
    const { atoms, bonds } = properties;
    
    // Atom colors (CPK coloring)
    const atomColors: Record<string, number> = {
      'H': 0xFFFFFF, // White
      'C': 0x333333, // Dark gray
      'O': 0xFF0000, // Red
      'N': 0x3050F8, // Blue
      'S': 0xFFFF30, // Yellow
      'default': 0xFF00FF // Pink (for unknown atoms)
    };
    
    // Create atoms
    const atomMeshes: THREE.Mesh[] = [];
    const positions = [
      [0, 0, 0],           // Central atom
      [1.5, 0, 0],         // Right
      [-1.5, 0, 0],        // Left
      [0, 1.5, 0],         // Top
      [0, 0, 1.5],         // Front
      [0, 0, -1.5]         // Back
    ];
    
    atoms.forEach((atom: string, i: number) => {
      if (i >= positions.length) return;
      
      const geometry = new THREE.SphereGeometry(0.4, 32, 32);
      const color = atomColors[atom] || atomColors['default'];
      const material = new THREE.MeshPhongMaterial({ color });
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.set(
        positions[i][0],
        positions[i][1],
        positions[i][2]
      );
      
      scene.add(mesh);
      atomMeshes.push(mesh);
      
      // Add atom label
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = 128;
        canvas.height = 128;
        context.fillStyle = '#000000';
        context.font = 'bold 80px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(atom, 64, 64);
        
        const texture = new THREE.CanvasTexture(canvas);
        const labelMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(labelMaterial);
        sprite.position.set(
          positions[i][0],
          positions[i][1] + 0.7,
          positions[i][2]
        );
        sprite.scale.set(1, 1, 1);
        scene.add(sprite);
      }
    });
    
    // Create bonds
    bonds.forEach((bond: number[]) => {
      const [startIdx, endIdx] = bond;
      if (startIdx >= atomMeshes.length || endIdx >= atomMeshes.length) return;
      
      const start = new THREE.Vector3().copy(atomMeshes[startIdx].position);
      const end = new THREE.Vector3().copy(atomMeshes[endIdx].position);
      
      // Create cylinder for bond using our helper function
      createCylinderBetweenPoints(scene, start, end, 0.1, 0xCCCCCC);
    });
  };

  const createGeometricShapes = (scene: THREE.Scene) => {
    const shapes = [
      { type: 'sphere', position: [-2, 0, 0], color: 0xff0000 },
      { type: 'cube', position: [0, 0, 0], color: 0x00ff00 },
      { type: 'cone', position: [2, 0, 0], color: 0x0000ff },
      { type: 'torus', position: [0, -2, 0], color: 0xffff00 }
    ];
    
    shapes.forEach(shape => {
      let geometry;
      
      switch (shape.type) {
        case 'sphere':
          geometry = new THREE.SphereGeometry(0.7, 32, 32);
          break;
        case 'cube':
          geometry = new THREE.BoxGeometry(1, 1, 1);
          break;
        case 'cone':
          geometry = new THREE.ConeGeometry(0.7, 1.5, 32);
          break;
        case 'torus':
          geometry = new THREE.TorusGeometry(0.7, 0.3, 16, 100);
          break;
        default:
          geometry = new THREE.SphereGeometry(0.7, 32, 32);
      }
      
      const material = new THREE.MeshPhongMaterial({ 
        color: shape.color,
        transparent: true,
        opacity: 0.8
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(shape.position[0], shape.position[1], shape.position[2]);
      
      scene.add(mesh);
      
      // Add rotation animation
      const animateShape = () => {
        if (animationRef.current) {
          requestAnimationFrame(animateShape);
          mesh.rotation.x += 0.01;
          mesh.rotation.y += 0.01;
        }
      };
      animateShape();
    });
  };

  const createDNA = (scene: THREE.Scene) => {
    const helixRadius = 1;
    const basePairs = 12;
    const heightStep = 0.3;
    
    // Create backbones
    for (let i = 0; i < basePairs; i++) {
      const angle = i * Math.PI / 4;
      const yPos = i * heightStep - (basePairs * heightStep) / 2;
      
      // First backbone
      const backbone1Geometry = new THREE.SphereGeometry(0.1, 16, 16);
      const backbone1Material = new THREE.MeshPhongMaterial({ color: 0x3366cc });
      const backbone1 = new THREE.Mesh(backbone1Geometry, backbone1Material);
      backbone1.position.set(
        helixRadius * Math.cos(angle),
        yPos,
        helixRadius * Math.sin(angle)
      );
      scene.add(backbone1);
      
      // Second backbone
      const backbone2Geometry = new THREE.SphereGeometry(0.1, 16, 16);
      const backbone2Material = new THREE.MeshPhongMaterial({ color: 0x3366cc });
      const backbone2 = new THREE.Mesh(backbone2Geometry, backbone2Material);
      backbone2.position.set(
        helixRadius * Math.cos(angle + Math.PI),
        yPos,
        helixRadius * Math.sin(angle + Math.PI)
      );
      scene.add(backbone2);
      if (i > 0) {
        const prevAngle = (i - 1) * Math.PI / 4;
        const prevYPos = (i - 1) * heightStep - (basePairs * heightStep) / 2;
        
        const prevBackbone1Pos = new THREE.Vector3(
          helixRadius * Math.cos(prevAngle),
          prevYPos,
          helixRadius * Math.sin(prevAngle)
        );
        
        const prevBackbone2Pos = new THREE.Vector3(
          helixRadius * Math.cos(prevAngle + Math.PI),
          prevYPos,
          helixRadius * Math.sin(prevAngle + Math.PI)
        );
        
        createCylinderBetweenPoints(scene, backbone1.position, prevBackbone1Pos, 0.05, 0x3366cc);
        createCylinderBetweenPoints(scene, backbone2.position, prevBackbone2Pos, 0.05, 0x3366cc);
      }
      const basePairGeometry = new THREE.CylinderGeometry(0.05, 0.05, helixRadius * 2, 8);
      const basePairMaterial = new THREE.MeshPhongMaterial({ color: 0xcc3366 });
      const basePair = new THREE.Mesh(basePairGeometry, basePairMaterial);
      basePair.position.set(0, yPos, 0);
      basePair.rotation.z = Math.PI / 2;
      scene.add(basePair);
    }
  };

  const createAnimalCell = (scene: THREE.Scene) => {
    // Cell membrane
    const cellGeometry = new THREE.SphereGeometry(2, 32, 32);
    const cellMaterial = new THREE.MeshPhongMaterial({
      color: 0x88cc88,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const cell = new THREE.Mesh(cellGeometry, cellMaterial);
    scene.add(cell);
    const nucleusGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const nucleusMaterial = new THREE.MeshPhongMaterial({
      color: 0xcc8888,
      transparent: true,
      opacity: 0.7
    });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    nucleus.position.set(0.5, 0.5, 0.5);
    scene.add(nucleus);
    const mitochondriaGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const mitochondriaMaterial = new THREE.MeshPhongMaterial({ color: 0xccaa44 });
    const mitochondria = new THREE.Mesh(mitochondriaGeometry, mitochondriaMaterial);
    mitochondria.position.set(-1, -0.5, 0.8);
    scene.add(mitochondria);
    
    // Vacuole
    const vacuoleGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const vacuoleMaterial = new THREE.MeshPhongMaterial({
      color: 0x44aacc,
      transparent: true,
      opacity: 0.5
    });
    const vacuole = new THREE.Mesh(vacuoleGeometry, vacuoleMaterial);
    vacuole.position.set(0.8, -1, -0.5);
    scene.add(vacuole);
    
    // Add rotation animation to entire cell
    const animateCell = () => {
      if (animationRef.current) {
        requestAnimationFrame(animateCell);
        cell.rotation.y += 0.003;
        nucleus.rotation.y += 0.005;
        mitochondria.rotation.y += 0.007;
        vacuole.rotation.y += 0.004;
      }
    };
    animateCell();
  };

  const createDefaultModel = (scene: THREE.Scene) => {
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Add rotation animation
    const animate = () => {
      if (animationRef.current) {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
      }
    };
    animate();
  };

  return (
    <div 
      ref={mountRef} 
      className="w-full h-96 rounded-xl overflow-hidden"
      style={{ background: isDarkMode ? '#1a202c' : '#edf2f7' }}
    />
  );
};

// Main Component
const SciencePage: React.FC<SciencePageProps> = ({ isDarkMode }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectData | null>(subjects[0]);

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-br from-indigo-50 to-purple-100 text-gray-800'
    }`}>
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Interactive Science Lab
          </h1>
          <p className={`text-base md:text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Explore scientific concepts through interactive 3D models. Select a subject to begin your journey.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8 md:mb-12">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.title}
              subject={subject}
              isSelected={selectedSubject?.title === subject.title}
              onClick={() => setSelectedSubject(subject)}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

        <div className={`rounded-2xl shadow-xl p-4 md:p-6 mb-8 md:mb-12 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">
            {selectedSubject?.title} Explorer
          </h2>
          <Scene subject={selectedSubject} isDarkMode={isDarkMode} />
          <div className={`mt-4 md:mt-6 p-3 md:p-4 rounded-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              About {selectedSubject?.title}
            </h3>
            <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {selectedSubject?.description} Drag to rotate, scroll to zoom, and explore the 3D model.
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <h3 className="text-xl font-bold mb-4">How to Interact with Models</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <div className="text-2xl mb-2">🖱️</div>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                <strong>Drag</strong> to rotate the model
              </p>
            </div>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <div className="text-2xl mb-2">🔍</div>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                <strong>Scroll</strong> to zoom in and out
              </p>
            </div>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <div className="text-2xl mb-2">🔄</div>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Models <strong>animate automatically</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SciencePage;