import * as THREE from 'three'
import "./style.css"


// Create the scene
const scene = new THREE.Scene();

// Create the sphere geometry
const earth = new THREE.SphereGeometry(3, 64, 64);
const earthtexture = new THREE.TextureLoader().load('./src/earthmap.jpg');
// Create the material for the sphere
const material = new THREE.MeshStandardMaterial({
    
    map:earthtexture,
});

// Create the mesh and add it to the scene
const mesh = new THREE.Mesh(earth, material);
scene.add(mesh);

// Add lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

// Initialize sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Create the camera and set its position
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 10;
camera.position.x = 4;
camera.position.y = 0.5;
scene.add(camera);

// Create the renderer
const canvas = document.querySelector('.webgl');
if (!canvas) {
    console.error('Canvas element not found');
}
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

// Handle window resize event
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
});

// Animation loop to render the scene
const animate = () => {
  
    mesh.rotation.y += 0.01
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

// Start the animation loop

animate();