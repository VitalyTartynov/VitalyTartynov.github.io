let scene, camera, renderer, cube1, cube2;

function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 400;

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var geometry = new THREE.BoxGeometry(200, 200, 200);
  var material = new THREE.MeshBasicMaterial({
    color: 0xF0F000
  });
  cube1 = new THREE.Mesh(geometry, material);
  cube1.position.x = -150;
  scene.add(cube1);

  const texture = new THREE.TextureLoader().load('texture/crate.gif');
  var material2 = new THREE.MeshBasicMaterial({
    map: texture
  });
  cube2 = new THREE.Mesh(geometry, material2);
  cube2.position.x = 150;
  scene.add(cube2);
};

function animate() {

  cube1.rotation.x += 0.005;
  cube1.rotation.y -= 0.003;

  cube2.rotation.z += 0.01;
  cube2.rotation.x -= 0.005;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener('resize', onWindowResize, false);

init();
animate();
