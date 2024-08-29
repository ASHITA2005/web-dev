import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.0/build/three.module.js';

// Setup scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('globe-container').appendChild(renderer.domElement);

// Create the globe
const geometry = new THREE.SphereGeometry(5, 32, 32);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('C:/Users/saumy/Desktop/index/ear0xuu2.jpg'); // Correct path
const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
});
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Add pins
const pins = [
    { position: { lat: 40.7128, lon: -74.0060 }, url: 'interns-newyork.html' }, // Example data
    // Add more pins here
];

const pinMeshes = [];

pins.forEach(pin => {
    const pinGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    const pinMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const pinMesh = new THREE.Mesh(pinGeometry, pinMaterial);

    // Convert lat/lon to 3D position
    const lat = THREE.MathUtils.degToRad(pin.position.lat);
    const lon = THREE.MathUtils.degToRad(pin.position.lon);
    pinMesh.position.set(
        5 * Math.cos(lat) * Math.cos(lon),
        5 * Math.sin(lat),
        5 * Math.cos(lat) * Math.sin(lon)
    );

    // Add pin to the globe
    scene.add(pinMesh);
    pinMeshes.push({ mesh: pinMesh, url: pin.url });
});

// Raycaster for detecting clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    // Normalize mouse coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.updateMatrixWorld();

    // Calculate objects intersecting the ray
    const intersects = raycaster.intersectObjects(pinMeshes.map(pin => pin.mesh));

    if (intersects.length > 0) {
        const url = pinMeshes.find(pin => pin.mesh === intersects[0].object).url;
        window.location.href = url;
    }
});

camera.position.z = 10;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
