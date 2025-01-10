
import "./style.css";
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js';

// Create the scene
const scene = new THREE.Scene();

// Create the sphere geometry
const earth = new THREE.SphereGeometry(3, 64, 64);
const earthtexture = new THREE.TextureLoader().load('./src/venus.jpg');
const earthnormal = new THREE.TextureLoader().load('./src/normal.TIF');
const earthDisplacement = new THREE.TextureLoader().load('./src/normal.TIF'); // Load displacement map

const material = new THREE.MeshStandardMaterial({
    map: earthtexture,
    normalMap: earthnormal,
    displacementMap: earthDisplacement, // Add displacement map
    displacementScale: 2, // Adjust the scale to control the depth effects
});

const mesh = new THREE.Mesh(earth, material);
scene.add(mesh);

// Add ambient light to the earth texture
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const light = new THREE.PointLight(0xffffff, 0, 100);
light.position.set(0, 10, 10);
scene.add(light);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Create the camera and set its position
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 0;
camera.position.x = 11;
camera.position.y = 1;
scene.add(camera);

// generate the renderer
const canvas = document.querySelector('.webgl');
if (!canvas) {
    console.error('Canvas element not found');
}
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Adjust for different screen resolutions

// Initialize OrbitControls
const controls = new OrbitControls(camera, canvas);

// consistently polls to resize the window
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Adjust for different screen resolutions
});

// Animation loop to render the scene
const animate = () => {
    controls.update(); // Update controls
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

// Start the animation loop
animate();