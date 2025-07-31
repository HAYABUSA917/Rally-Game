
let scene, camera, renderer, car, forestTexture;
let speed = 0.1;
let direction = 0;

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 5);

  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gameCanvas") });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 10, 10);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  // 背景
  const loader = new THREE.TextureLoader();
  loader.load("forest.jpg", (texture) => {
    scene.background = texture;
  });

  // 地面
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: 0x228822 })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // 車（簡易ボックス）
  const geometry = new THREE.BoxGeometry(1, 0.5, 2);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  car = new THREE.Mesh(geometry, material);
  car.position.y = 0.25;
  scene.add(car);

  // 操作
  document.getElementById("leftBtn").addEventListener("click", () => direction = -1);
  document.getElementById("rightBtn").addEventListener("click", () => direction = 1);
  document.getElementById("goBtn").addEventListener("click", () => speed += 0.02);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function animate() {
  requestAnimationFrame(animate);
  car.position.z -= speed;
  car.position.x += direction * 0.05;
  direction = 0;
  renderer.render(scene, camera);
}
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// キャンバスを画面サイズに合わせる
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 背景を緑で塗る（森のイメージ）
function drawBackground() {
  ctx.fillStyle = '#228B22'; // 濃い緑（森っぽい色）
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

drawBackground();
